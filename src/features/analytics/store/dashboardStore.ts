import { create } from 'zustand'
import { DashboardAnalyticsData } from '../types/analytics.types'

interface DashboardState {
  isOpen: boolean
  filterRange: '7d' | '30d' | '90d'
  data: DashboardAnalyticsData | null
  isLoading: boolean
  error: string | null
  setOpen: (open: boolean) => void
  setFilterRange: (range: '7d' | '30d' | '90d') => void
  setData: (data: DashboardAnalyticsData | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useDashboardStore = create<DashboardState>()((set) => ({
  isOpen: false,
  filterRange: '7d',
  data: null,
  isLoading: false,
  error: null,
  setOpen: (open) => set({ isOpen: open }),
  setFilterRange: (range) => set({ filterRange: range }),
  setData: (data) => set({ data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}))
