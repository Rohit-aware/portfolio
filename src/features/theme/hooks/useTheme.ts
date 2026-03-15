import { useEffect, useCallback } from 'react'
import { useThemeStore } from '../store/themeStore'
import type { ThemeMode } from '@/types'

const resolveIsDark = (theme: ThemeMode): boolean => {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return theme === 'dark'
}

const applyTheme = (isDark: boolean): void => {
  if (typeof document !== 'undefined') {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}

export interface UseThemeReturn {
  readonly theme: ThemeMode
  readonly isDark: boolean
  readonly toggleTheme: () => void
  readonly setTheme: (t: ThemeMode) => void
}

export const useTheme = (): UseThemeReturn => {
  const theme = useThemeStore((s) => s.theme)
  const setThemeState = useThemeStore((s) => s.setThemeState)
  
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
    // mmkvStorage takes care of localStorage persistence via Zustand persist
  }, [setThemeState])

  const toggleTheme = useCallback((): void => {
    setThemeState(isDark ? 'light' : 'dark')
  }, [isDark, setThemeState])

  return { theme, isDark, toggleTheme, setTheme }
}
