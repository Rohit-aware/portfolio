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
