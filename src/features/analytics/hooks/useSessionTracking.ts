import { useEffect } from 'react'
import { useAnalyticsStore } from '../store/analyticsStore'
import { HEARTBEAT_INTERVAL_MS } from '../constants/analytics'
import { useScrollSpy } from '@/shared/hooks/useScrollSpy'
import { SECTION_IDS } from '@/constants/navigation'
import { AnalyticsEvent } from '@/shared/domain/analyticsEvent'

export function useSessionTracking(): void {
  const initializeTrackingSession = useAnalyticsStore((s) => s.initializeTrackingSession)
  const flushSession = useAnalyticsStore((s) => s.flushSession)
  const trackPageVisit = useAnalyticsStore((s) => s.trackPageVisit)
  const trackInteraction = useAnalyticsStore((s) => s.trackInteraction)

  const activeSection = useScrollSpy(SECTION_IDS)

  useEffect(() => {
    if (activeSection) {
      trackPageVisit(activeSection)
    }
  }, [activeSection, trackPageVisit])

  useEffect(() => {
    initializeTrackingSession()

    let lastUpdate = 0
    const handleUserActivity = () => {
      const now = Date.now()
      if (now - lastUpdate > 5000) {
        lastUpdate = now
        useAnalyticsStore.setState({ lastVisitAt: now })
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushSession()
      } else if (document.visibilityState === 'visible') {
        handleUserActivity()
      }
    }

    const handleBeforeUnload = () => {
      flushSession()
    }

    const handleGlobalClick = (event: MouseEvent) => {
      handleUserActivity()
      const target = event.target as HTMLElement
      const anchor = target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href') || ''
      if (href.includes('github.com')) {
        trackInteraction(AnalyticsEvent.GITHUB_CLICKED)
      } else if (href.includes('linkedin.com')) {
        trackInteraction(AnalyticsEvent.LINKEDIN_CLICKED)
      } else if (href.includes('mailto:')) {
        trackInteraction(AnalyticsEvent.EMAIL_CLICKED)
      } else if (href.startsWith('#')) {
        const sectionId = href.substring(1)
        trackInteraction(`nav_to_${sectionId}`)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('pagehide', handleBeforeUnload)
    document.addEventListener('click', handleGlobalClick)
    document.addEventListener('mousemove', handleUserActivity)
    document.addEventListener('keydown', handleUserActivity)
    document.addEventListener('scroll', handleUserActivity)

    const intervalId = setInterval(() => {
      if (document.visibilityState === 'visible') {
        flushSession()
      }
    }, HEARTBEAT_INTERVAL_MS)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('pagehide', handleBeforeUnload)
      document.removeEventListener('click', handleGlobalClick)
      document.removeEventListener('mousemove', handleUserActivity)
      document.removeEventListener('keydown', handleUserActivity)
      document.removeEventListener('scroll', handleUserActivity)
      clearInterval(intervalId)
    }
  }, [initializeTrackingSession, flushSession, trackInteraction])
}
