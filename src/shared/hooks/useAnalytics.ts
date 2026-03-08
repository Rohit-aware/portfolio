import { useState, useEffect } from 'react'
import { recordVisit } from '@/services/analyticsService'

export interface AnalyticsState {
  readonly visitCount: number
  readonly isNewVisit: boolean
  readonly isLoading:  boolean
}

/**
 * useAnalytics — fires once on mount.
 * Increments visit counter if new session.
 * Returns current visit total.
 */
export const useAnalytics = (): AnalyticsState => {
  const [state, setState] = useState<AnalyticsState>({
    visitCount: 0,
    isNewVisit: false,
    isLoading:  true,
  })

  useEffect(() => {
    let cancelled = false
    recordVisit().then(({ total, isNewVisit }) => {
      if (!cancelled) {
        setState({ visitCount: total, isNewVisit, isLoading: false })
      }
    })
    return () => { cancelled = true }
  }, [])

  return state
}
