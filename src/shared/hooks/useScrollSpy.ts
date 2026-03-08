import { useState, useEffect, useRef } from 'react'

/**
 * useScrollSpy — reliable active-section tracker.
 *
 * Strategy: on every scroll tick, measure each section's top offset
 * relative to the viewport. The "active" section is whichever one
 * has its top closest to (and above) the trigger line (25% from top).
 * This is more reliable than IntersectionObserver rootMargin for navbars.
 */
export const useScrollSpy = (sectionIds: readonly string[]): string => {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '')
  const ticking  = useRef(false)

  useEffect(() => {
    const TRIGGER_RATIO = 0.25   // 25% from top of viewport

    const compute = (): void => {
      const trigger = window.innerHeight * TRIGGER_RATIO

      let best: string = sectionIds[0] ?? ''
      let bestDist = Infinity

      sectionIds.forEach(id => {
        const el = document.getElementById(id)
        if (!el) return
        const top = el.getBoundingClientRect().top
        // Distance from trigger line — prefer sections whose top is above trigger
        const dist = Math.abs(top - trigger)
        if (top <= trigger + el.offsetHeight && dist < bestDist) {
          bestDist = dist
          best     = id
        }
      })

      setActiveId(prev => (prev !== best ? best : prev))
      ticking.current = false
    }

    const onScroll = (): void => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(compute)
    }

    // Run once immediately to set initial state
    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sectionIds])

  return activeId
}
