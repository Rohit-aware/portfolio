import React, { useRef, useEffect, memo } from 'react'
import { cn } from '@/shared/utils/cn'

interface RevealWrapperProps {
  readonly children:   React.ReactNode
  readonly className?: string
  readonly delay?:     number
}

const RevealWrapper: React.FC<RevealWrapperProps> = memo(
  ({ children, className = '', delay = 0 }) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const el = ref.current
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            el.style.transitionDelay = `${delay}ms`
            el.classList.add('visible')
            observer.unobserve(el)
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(el)
      return () => observer.disconnect()
    }, [delay])

    return (
      <div ref={ref} className={cn('reveal', className)}>
        {children}
      </div>
    )
  }
)

RevealWrapper.displayName = 'RevealWrapper'
export default RevealWrapper
