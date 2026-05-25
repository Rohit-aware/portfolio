import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { logError } from '@/features/analytics-logger/facade/logError'
import { mmkvStorage } from '@/shared/store/mmkv'
import { generateSessionId } from '../utils/session'
import { getOS, getBrowser, getDeviceType } from '../utils/platform'
import { getReferrerSource } from '../utils/referrer'
import { calculateDurationMs } from '../utils/duration'
import {
  createSession,
  updateSession,
  incrementVisitCount,
} from '../services/firestoreService'
import { logAnalyticsEvent } from '../services/analyticsService'
import { SessionDocument } from '../types/analytics.types'
import {
  SESSION_ID_KEY,
  SESSION_START_KEY,
  SESSION_PAGES_KEY,
  SESSION_INTERACTIONS_KEY,
  SESSION_RESUME_KEY,
  SESSION_CONTACT_KEY,
} from '../constants/analytics'
import { ErrorSeverity } from '@/shared/domain/errorSeverity'
import { AnalyticsEvent } from '@/shared/domain/analyticsEvent'

const SESSION_SK = 'ra-visited'

export interface AnalyticsState {
  visitCount: number
  isNewVisit: boolean
  isLoading: boolean
  hasRecorded: boolean
  sessionId: string
  startedAt: number
  pagesVisited: string[]
  interactions: string[]
  resumeDownloaded: boolean
  contactSubmitted: boolean
  recordVisit: () => Promise<void>
  initializeTrackingSession: () => Promise<void>
  trackInteraction: (event: string) => Promise<void>
  trackPageVisit: (page: string) => Promise<void>
  setResumeDownloaded: () => Promise<void>
  setContactSubmitted: () => Promise<void>
  flushSession: () => Promise<void>
}

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set, get) => ({
      visitCount: 0,
      isNewVisit: false,
      isLoading: true,
      hasRecorded: false,
      sessionId: '',
      startedAt: 0,
      pagesVisited: [],
      interactions: [],
      resumeDownloaded: false,
      contactSubmitted: false,

      recordVisit: async () => {
        if (get().hasRecorded) return

        set({ isLoading: true })
        const isNewVisit = !sessionStorage.getItem(SESSION_SK)
        if (isNewVisit) {
          sessionStorage.setItem(SESSION_SK, '1')
        }

        try {
          const total = await incrementVisitCount(isNewVisit)
          if (total > 0) {
            set({
              visitCount: total,
              isNewVisit,
              isLoading: false,
              hasRecorded: true,
            })
          } else {
            const current = get().visitCount
            set({
              visitCount: isNewVisit ? current + 1 : current,
              isNewVisit,
              isLoading: false,
              hasRecorded: true,
            })
          }
        } catch (error) {
          logError(error, ErrorSeverity.MEDIUM, true)
          const current = get().visitCount
          set({
            visitCount: isNewVisit ? current + 1 : current,
            isNewVisit,
            isLoading: false,
            hasRecorded: true,
          })
        }
      },

      initializeTrackingSession: async () => {
        let sid = sessionStorage.getItem(SESSION_ID_KEY)
        let startTimeStr = sessionStorage.getItem(SESSION_START_KEY)
        let isNew = false

        if (!sid || !startTimeStr) {
          sid = generateSessionId()
          startTimeStr = String(Date.now())
          sessionStorage.setItem(SESSION_ID_KEY, sid)
          sessionStorage.setItem(SESSION_START_KEY, startTimeStr)
          isNew = true
        }

        const startTime = parseInt(startTimeStr, 10)

        let localPages: string[] = []
        try {
          localPages = JSON.parse(sessionStorage.getItem(SESSION_PAGES_KEY) || '[]')
        } catch (e) {}

        let localInteractions: string[] = []
        try {
          localInteractions = JSON.parse(
            sessionStorage.getItem(SESSION_INTERACTIONS_KEY) || '[]',
          )
        } catch (e) {}

        const resumeDownloaded = sessionStorage.getItem(SESSION_RESUME_KEY) === 'true'
        const contactSubmitted = sessionStorage.getItem(SESSION_CONTACT_KEY) === 'true'

        set({
          sessionId: sid,
          startedAt: startTime,
          pagesVisited: localPages,
          interactions: localInteractions,
          resumeDownloaded,
          contactSubmitted,
        })

        if (isNew) {
          const initialPages =
            localPages.length > 0 ? localPages : [window.location.pathname || '/']
          if (localPages.length === 0) {
            sessionStorage.setItem(SESSION_PAGES_KEY, JSON.stringify(initialPages))
            set({ pagesVisited: initialPages })
          }

          const sessionDoc: SessionDocument = {
            sessionId: sid,
            startedAt: startTime,
            endedAt: startTime,
            durationMs: 0,
            landingPage: window.location.pathname || '/',
            pagesVisited: initialPages,
            browser: getBrowser(),
            os: getOS(),
            deviceType: getDeviceType(),
            referrer: getReferrerSource(),
            viewport: {
              width: window.innerWidth,
              height: window.innerHeight,
            },
            interactions: localInteractions,
            resumeDownloaded,
            contactSubmitted,
          }
          await createSession(sessionDoc)
          await logAnalyticsEvent(AnalyticsEvent.SESSION_START, { sessionId: sid })
        }
      },

      trackInteraction: async (event: string) => {
        const { sessionId, interactions } = get()
        if (!sessionId) return

        const updated = [...interactions, event]
        set({ interactions: updated })
        sessionStorage.setItem(SESSION_INTERACTIONS_KEY, JSON.stringify(updated))

        await logAnalyticsEvent(event, { sessionId })
      },

      trackPageVisit: async (page: string) => {
        const { sessionId, pagesVisited } = get()
        if (!sessionId) return

        if (pagesVisited.includes(page)) return

        const updated = [...pagesVisited, page]
        set({ pagesVisited: updated })
        sessionStorage.setItem(SESSION_PAGES_KEY, JSON.stringify(updated))

        await logAnalyticsEvent(AnalyticsEvent.PAGE_VIEW, { sessionId, page })
      },

      setResumeDownloaded: async () => {
        const { sessionId } = get()
        if (!sessionId) return

        set({ resumeDownloaded: true })
        sessionStorage.setItem(SESSION_RESUME_KEY, 'true')
        await logAnalyticsEvent(AnalyticsEvent.RESUME_DOWNLOADED, { sessionId })
      },

      setContactSubmitted: async () => {
        const { sessionId } = get()
        if (!sessionId) return

        set({ contactSubmitted: true })
        sessionStorage.setItem(SESSION_CONTACT_KEY, 'true')
        await logAnalyticsEvent(AnalyticsEvent.CONTACT_SUBMITTED, { sessionId })
      },

      flushSession: async () => {
        const {
          sessionId,
          startedAt,
          pagesVisited,
          interactions,
          resumeDownloaded,
          contactSubmitted,
        } = get()
        if (!sessionId || !startedAt) return

        const duration = calculateDurationMs(startedAt)
        const updates: Partial<SessionDocument> = {
          endedAt: Date.now(),
          durationMs: duration,
          pagesVisited,
          interactions,
          resumeDownloaded,
          contactSubmitted,
        }

        await updateSession(sessionId, updates)
      },
    }),
    {
      name: 'ra-visit-count',
      storage: mmkvStorage,
      partialize: (state) => ({ visitCount: state.visitCount }),
    },
  ),
)
