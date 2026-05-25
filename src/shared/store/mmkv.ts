import { createJSONStorage, StateStorage } from 'zustand/middleware'
import { logError } from '@/features/analytics-logger/facade/logError'
import { ErrorSeverity } from '@/shared/domain/errorSeverity'

const mmkvWebFallback: StateStorage = {
  getItem: (name: string): string | null => {
    const val = localStorage.getItem(name)
    if (!val) return null

    if (name === 'theme' && !val.startsWith('{')) {
      return JSON.stringify({ state: { theme: val }, version: 0 })
    }

    if (name === 'ra-visit-count' && !val.startsWith('{')) {
      return JSON.stringify({ state: { total: parseInt(val, 10) }, version: 0 })
    }

    return val
  },
  setItem: (name: string, value: string): void => {
    if (name === 'theme') {
      try {
        const parsed = JSON.parse(value)
        localStorage.setItem(name, parsed.state.theme)
        return
      } catch (error) {
        logError(error, ErrorSeverity.MEDIUM, true)
      }
    }

    if (name === 'ra-visit-count') {
      try {
        const parsed = JSON.parse(value)
        localStorage.setItem(name, String(parsed.state.total))
        return
      } catch (error) {
        logError(error, ErrorSeverity.MEDIUM, true)
      }
    }

    localStorage.setItem(name, value)
  },
  removeItem: (name: string): void => {
    localStorage.removeItem(name)
  },
}

export const mmkvStorage = createJSONStorage(() => mmkvWebFallback)
