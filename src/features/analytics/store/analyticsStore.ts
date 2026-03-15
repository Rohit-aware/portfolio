import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mmkvStorage } from '@/shared/store/mmkv'

const NAMESPACE  = 'rohit-aware'
const KEY        = 'portfolio-visits'
const SESSION_SK = 'ra-visited'

interface AnalyticsState {
  visitCount: number
  isNewVisit: boolean
  isLoading: boolean
  hasRecorded: boolean
  recordVisit: () => Promise<void>
}

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set, get) => ({
      visitCount: 0,
      isNewVisit: false,
      isLoading: true, // initial state before fetch
      hasRecorded: false,
      
      recordVisit: async () => {
        if (get().hasRecorded) return // prevent double hits within the session UI loop
        
        set({ isLoading: true })
        const isNewVisit = !sessionStorage.getItem(SESSION_SK)
        if (isNewVisit) {
          sessionStorage.setItem(SESSION_SK, '1')
        }
        
        try {
          const endpoint = isNewVisit
            ? `https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`
            : `https://api.countapi.xyz/get/${NAMESPACE}/${KEY}`

          const res  = await fetch(endpoint)
          const data = await res.json() as { value: number }
          const total = data.value ?? 0
          
          set({ visitCount: total, isNewVisit, isLoading: false, hasRecorded: true })
        } catch {
          // network fetch failed, just mark as loaded so the UI falls back to reading the cached persistence value
          set({ isNewVisit, isLoading: false, hasRecorded: true })
        }
      }
    }),
    {
      name: 'ra-visit-count',
      storage: mmkvStorage,
      partialize: (state) => ({ visitCount: state.visitCount }) // only persist the total count
    }
  )
)
