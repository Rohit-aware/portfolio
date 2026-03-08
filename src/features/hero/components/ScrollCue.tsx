import React, { memo, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import { scrollToSection } from '@/shared/utils/scroll'
import { cn } from '@/shared/utils/cn'

const ScrollCue: React.FC = memo(() => {
  const toAbout = useCallback(() => scrollToSection('about'), [])

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20">
      <button
        onClick={toAbout}
        aria-label="Scroll to About section"
        className={cn(
          'flex flex-col items-center gap-1',
          'text-muted-foreground hover:text-primary transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded',
        )}
      >
        <span className="text-xs font-mono tracking-widest opacity-50">scroll</span>
        <span className="animate-scroll-bounce block" aria-hidden="true">
          <ChevronDown size={14} />
        </span>
      </button>
    </div>
  )
})

ScrollCue.displayName = 'ScrollCue'
export default ScrollCue
