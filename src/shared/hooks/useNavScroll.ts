import { useState, useEffect, useRef } from 'react'

export interface NavScrollState {
  readonly isScrolled: boolean
  readonly isHidden:   boolean
}

/**
 * useNavScroll — drives navbar show/hide and glass effect.
 * Progress bar removed per design.
 */
export const useNavScroll = (): NavScrollState => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden,   setIsHidden]   = useState(false)
  const lastY   = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = (): void => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        setIsScrolled(y > 24)
        if      (y > lastY.current + 10 && y > 120) setIsHidden(true)
        else if (y < lastY.current - 5)              setIsHidden(false)
        lastY.current   = y
        ticking.current = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { isScrolled, isHidden }
}
