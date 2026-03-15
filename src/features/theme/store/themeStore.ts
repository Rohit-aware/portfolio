import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mmkvStorage } from '@/shared/store/mmkv'
import type { ThemeMode } from '@/types'

export interface ThemeState {
  theme: ThemeMode
  setThemeState: (t: ThemeMode) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light', // default, actual initial state driven by persist
      setThemeState: (t: ThemeMode) => set({ theme: t }),
    }),
    {
      name: 'theme',
      storage: mmkvStorage,
    }
  )
)
