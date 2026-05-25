import { useState, useEffect, useRef } from 'react'

export const useScrollSpy = (sectionIds: readonly string[]): string => {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '')
  const ticking = useRef(false)

  useEffect(() => {
    const TRIGGER_RATIO = 0.25

    const compute = (): void => {
      const trigger = window.innerHeight * TRIGGER_RATIO

      let best: string = sectionIds[0] ?? ''
      let bestDist = Infinity

      sectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return
        const top = el.getBoundingClientRect().top
        const dist = Math.abs(top - trigger)
        if (top <= trigger + el.offsetHeight && dist < bestDist) {
          bestDist = dist
          best = id
        }
      })

      setActiveId((prev) => (prev !== best ? best : prev))
      ticking.current = false
    }

    const onScroll = (): void => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sectionIds])

  return activeId
}
