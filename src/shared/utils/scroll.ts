/**
 * Smooth-scrolls to a section by ID.
 * Accounts for the fixed navbar height.
 */
export const scrollToSection = (id: string, offset = 72): void => {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}
