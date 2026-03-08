import { useEffect, useRef } from 'react'

/**
 * Attaches IntersectionObserver to a container ref.
 * All .reveal children inside animate in on scroll.
 */
export const useReveal = (): React.RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    container.querySelectorAll<HTMLElement>('.reveal').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return ref
}
