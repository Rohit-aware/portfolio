import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { logError } from '@/features/analytics-logger/facade/logError'
import { mmkvStorage } from '@/shared/store/mmkv'
import { generateSessionId, getOrCreateVisitorId } from '../utils/session'
import { getOS, getBrowser, getDeviceType } from '../utils/platform'
import { getReferrerSource } from '../utils/referrer'
import {
  createSession,
  updateSession,
  registerSessionAndIncrementCounters,
  listenToGlobalCounters,
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

export interface AnalyticsState {
  visitCount: number
  isNewVisit: boolean
  isLoading: boolean
  hasRecorded: boolean
  sessionId: string
  visitorId: string
  startedAt: number
  lastVisitAt: number
  pagesVisited: string[]
  interactions: string[]
  resumeDownloaded: boolean
  contactSubmitted: boolean
  isHydrated: boolean
  analyticsInitialized: boolean
  setHydrated: (val: boolean) => void
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
      visitorId: '',
      startedAt: 0,
      lastVisitAt: 0,
      pagesVisited: [],
      interactions: [],
      resumeDownloaded: false,
      contactSubmitted: false,
      isHydrated: false,
      analyticsInitialized: false,

      setHydrated: (val: boolean) => set({ isHydrated: val }),

      recordVisit: async () => {
        set({ isLoading: false })
      },

      initializeTrackingSession: async () => {
        if (get().analyticsInitialized) return
        set({ analyticsInitialized: true })

        listenToGlobalCounters((count) => {
          set({ visitCount: count })
        })

        let vid = get().visitorId
        let isNewVisitor = false
        if (!vid) {
          const storedVid = localStorage.getItem('analytics:v1:visitorId')
          isNewVisitor = !storedVid
          vid = getOrCreateVisitorId()
          set({ visitorId: vid })
        }

        let resolvedSessionId = ''
        let resolvedStartedAt = 0
        let isNewSession = false

        if (typeof BroadcastChannel !== 'undefined') {
          const channel = new BroadcastChannel('portfolio_analytics_channel')

          channel.onmessage = (event) => {
            if (event.data?.type === 'REQUEST_SESSION') {
              const current = get()
              if (current.sessionId) {
                channel.postMessage({
                  type: 'SESSION_RESPONSE',
                  sessionId: current.sessionId,
                  visitorId: current.visitorId,
                  startedAt: current.startedAt,
                })
              }
            }
          }

          const sessionPromise = new Promise<{ sessionId: string; startedAt: number } | null>((resolve) => {
            const timer = setTimeout(() => resolve(null), 150)

            const tempListener = (event: MessageEvent) => {
              if (event.data?.type === 'SESSION_RESPONSE') {
                clearTimeout(timer)
                channel.removeEventListener('message', tempListener)
                resolve({
                  sessionId: event.data.sessionId,
                  startedAt: event.data.startedAt,
                })
              }
            }
            channel.addEventListener('message', tempListener)
            channel.postMessage({ type: 'REQUEST_SESSION' })
          })

          const existingSession = await sessionPromise
          if (existingSession) {
            resolvedSessionId = existingSession.sessionId
            resolvedStartedAt = existingSession.startedAt
          }
        }

        const now = Date.now()
        const lastVisit = get().lastVisitAt || 0
        const sessionTimeout = 30 * 60 * 1000
        const isExpired = now - lastVisit > sessionTimeout

        if (!resolvedSessionId) {
          const sessionStorageId = sessionStorage.getItem(SESSION_ID_KEY)
          const sessionStorageStart = sessionStorage.getItem(SESSION_START_KEY)

          if (sessionStorageId && sessionStorageStart && !isExpired) {
            resolvedSessionId = sessionStorageId
            resolvedStartedAt = parseInt(sessionStorageStart, 10)
          } else {
            resolvedSessionId = generateSessionId()
            resolvedStartedAt = now
            sessionStorage.setItem(SESSION_ID_KEY, resolvedSessionId)
            sessionStorage.setItem(SESSION_START_KEY, String(now))
            isNewSession = true
          }
        }

        set({
          sessionId: resolvedSessionId,
          startedAt: resolvedStartedAt,
          lastVisitAt: now,
          isNewVisit: isNewSession,
          isLoading: false,
          hasRecorded: true,
        })

        let localPages: string[] = []
        try {
          localPages = JSON.parse(sessionStorage.getItem(SESSION_PAGES_KEY) || '[]')
        } catch (e) { }

        let localInteractions: string[] = []
        try {
          localInteractions = JSON.parse(
            sessionStorage.getItem(SESSION_INTERACTIONS_KEY) || '[]',
          )
        } catch (e) { }

        const resumeDownloaded = sessionStorage.getItem(SESSION_RESUME_KEY) === 'true'
        const contactSubmitted = sessionStorage.getItem(SESSION_CONTACT_KEY) === 'true'

        set({
          pagesVisited: localPages,
          interactions: localInteractions,
          resumeDownloaded,
          contactSubmitted,
        })

        if (isNewSession || isNewVisitor) {
          try {
            await logAnalyticsEvent(AnalyticsEvent.SESSION_START, { sessionId: resolvedSessionId })

            const initialPages =
              localPages.length > 0 ? localPages : [window.location.pathname || '/']
            if (localPages.length === 0) {
              sessionStorage.setItem(SESSION_PAGES_KEY, JSON.stringify(initialPages))
              set({ pagesVisited: initialPages })
            }

            const sessionDoc: SessionDocument = {
              sessionId: resolvedSessionId,
              visitorId: vid,
              startedAt: resolvedStartedAt,
              endedAt: now,
              lastHeartbeatAt: now,
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

            const finalVisits = await registerSessionAndIncrementCounters(
              vid,
              isNewVisitor,
              isNewSession,
              getDeviceType(),
              getBrowser(),
              getOS()
            )

            if (finalVisits > 0) {
              set({ visitCount: finalVisits })
            }

            await createSession(sessionDoc)
          } catch (error) {
            logError(error, ErrorSeverity.MEDIUM, true)
          }
        }

        const heartbeatInterval = setInterval(async () => {
          try {
            const current = get()
            if (!current.sessionId) return

            const currentNow = Date.now()
            const duration = currentNow - current.startedAt

            const updates: Partial<SessionDocument> = {
              endedAt: currentNow,
              lastHeartbeatAt: currentNow,
              durationMs: duration,
              pagesVisited: current.pagesVisited,
              interactions: current.interactions,
              resumeDownloaded: current.resumeDownloaded,
              contactSubmitted: current.contactSubmitted,
            }

            await updateSession(current.sessionId, updates)
          } catch (error) {
            logError(error, ErrorSeverity.LOW, true)
          }
        }, 20000)

        const cleanup = () => {
          clearInterval(heartbeatInterval)
        }

        if (typeof window !== 'undefined') {
          (window as any)._analyticsCleanup = cleanup
        }
      },

      trackInteraction: async (event: string) => {
        try {
          const { sessionId, interactions } = get()
          if (!sessionId) return

          const updated = [...interactions, event]
          set({ interactions: updated, lastVisitAt: Date.now() })
          sessionStorage.setItem(SESSION_INTERACTIONS_KEY, JSON.stringify(updated))

          await logAnalyticsEvent(event, { sessionId })
        } catch (error) {
          logError(error, ErrorSeverity.LOW, true)
        }
      },

      trackPageVisit: async (page: string) => {
        try {
          const { sessionId, pagesVisited } = get()
          if (!sessionId) return

          if (pagesVisited.includes(page)) return

          const updated = [...pagesVisited, page]
          set({ pagesVisited: updated, lastVisitAt: Date.now() })
          sessionStorage.setItem(SESSION_PAGES_KEY, JSON.stringify(updated))

          await logAnalyticsEvent(AnalyticsEvent.PAGE_VIEW, { sessionId, page })
        } catch (error) {
          logError(error, ErrorSeverity.LOW, true)
        }
      },

      setResumeDownloaded: async () => {
        try {
          const { sessionId } = get()
          if (!sessionId) return

          set({ resumeDownloaded: true, lastVisitAt: Date.now() })
          sessionStorage.setItem(SESSION_RESUME_KEY, 'true')
          await logAnalyticsEvent(AnalyticsEvent.RESUME_DOWNLOADED, { sessionId })
        } catch (error) {
          logError(error, ErrorSeverity.LOW, true)
        }
      },

      setContactSubmitted: async () => {
        try {
          const { sessionId } = get()
          if (!sessionId) return

          set({ contactSubmitted: true, lastVisitAt: Date.now() })
          sessionStorage.setItem(SESSION_CONTACT_KEY, 'true')
          await logAnalyticsEvent(AnalyticsEvent.CONTACT_SUBMITTED, { sessionId })
        } catch (error) {
          logError(error, ErrorSeverity.LOW, true)
        }
      },

      flushSession: async () => {
        try {
          const {
            sessionId,
            startedAt,
            pagesVisited,
            interactions,
            resumeDownloaded,
            contactSubmitted,
          } = get()
          if (!sessionId || !startedAt) return

          const duration = Date.now() - startedAt
          const updates: Partial<SessionDocument> = {
            endedAt: Date.now(),
            durationMs: duration,
            pagesVisited,
            interactions,
            resumeDownloaded,
            contactSubmitted,
          }

          await updateSession(sessionId, updates)
        } catch (error) {
          logError(error, ErrorSeverity.LOW, true)
        }
      },
    }),
    {
      name: 'ra-visit-count',
      storage: mmkvStorage,
      partialize: (state) => ({
        visitCount: state.visitCount,
        visitorId: state.visitorId,
        lastVisitAt: state.lastVisitAt,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true)
        }
      },
    },
  ),
)
