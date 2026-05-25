import { create } from 'zustand'
import { AnalyticsErrorDocument } from '../types/errorAnalytics.types'
import { THROTTLE_INTERVAL_MS } from '../constants/errorAnalytics'

export interface ErrorAnalyticsState {
  batchedErrors: AnalyticsErrorDocument[]
  throttledFingerprints: Record<string, number>
  addErrorToBatch: (errorDoc: AnalyticsErrorDocument) => void
  clearBatch: () => void
  isThrottled: (fingerprint: string) => boolean
  registerFingerprint: (fingerprint: string) => void
}

export const useErrorAnalyticsStore = create<ErrorAnalyticsState>()((set, get) => ({
  batchedErrors: [],
  throttledFingerprints: {},

  addErrorToBatch: (errorDoc: AnalyticsErrorDocument) => {
    set((state) => ({
      batchedErrors: [...state.batchedErrors, errorDoc],
    }))
  },

  clearBatch: () => {
    set({ batchedErrors: [] })
  },

  isThrottled: (fingerprint: string) => {
    const lastSeen = get().throttledFingerprints[fingerprint]
    if (!lastSeen) return false
    return Date.now() - lastSeen < THROTTLE_INTERVAL_MS
  },

  registerFingerprint: (fingerprint: string) => {
    set((state) => ({
      throttledFingerprints: {
        ...state.throttledFingerprints,
        [fingerprint]: Date.now(),
      },
    }))
  },
}))
