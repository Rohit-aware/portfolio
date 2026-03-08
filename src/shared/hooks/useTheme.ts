import { useState, useEffect, useCallback } from 'react'
import type { ThemeMode } from '@/types'

interface UseThemeReturn {
  readonly theme:       ThemeMode
  readonly isDark:      boolean
  readonly toggleTheme: () => void
  readonly setTheme:    (t: ThemeMode) => void
}

const STORAGE_KEY = 'theme'

const applyTheme = (isDark: boolean): void => {
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const resolveIsDark = (theme: ThemeMode): boolean => {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return theme === 'dark'
}

export const useTheme = (): UseThemeReturn => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null
      if (stored === 'dark' || stored === 'light' || stored === 'system') {
        return stored
      }
    } catch (_) {}
    return 'dark'
  })

  const isDark = resolveIsDark(theme)

  useEffect(() => {
    applyTheme(isDark)
  }, [isDark])

  // Track system preference changes when theme === 'system'
  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (): void => applyTheme(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [theme])

  const setTheme = useCallback((t: ThemeMode): void => {
    setThemeState(t)
    try { localStorage.setItem(STORAGE_KEY, t) } catch (_) {}
  }, [])

  const toggleTheme = useCallback((): void => {
    setTheme(isDark ? 'light' : 'dark')
  }, [isDark, setTheme])

  return { theme, isDark, toggleTheme, setTheme }
}
