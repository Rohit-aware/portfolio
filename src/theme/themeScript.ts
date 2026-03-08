/**
 * Inline script injected into <head> BEFORE first paint.
 * Prevents theme flash by setting the class immediately.
 * Must be a pure string — no imports.
 */
export const THEME_SCRIPT = `
  (function () {
    try {
      var stored = localStorage.getItem('theme')
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      var isDark = stored === 'dark' || (!stored && prefersDark) || stored === null
      if (isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } catch (_) {}
  })()
`
