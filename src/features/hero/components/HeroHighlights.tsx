import React, { memo } from 'react'
import { HERO_HIGHLIGHTS } from '@/features/hero/constants/hero'
import { cn } from '@/shared/utils/cn'

const HeroHighlights: React.FC = memo(() => (
  <div
    className="flex flex-wrap gap-2 mb-6 animate-fade-in-up"
    style={{ animationDelay: '300ms', animationFillMode: 'both' }}
  >
    {HERO_HIGHLIGHTS.map(({ icon: Icon, text, sub, show }) => show && (
      <div
        key={text}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl',
          'bg-surface border border-border text-xs',
          'min-w-0',
        )}
      >
        <Icon size={11} className="text-primary shrink-0" aria-hidden="true" />
        <span className="font-medium text-foreground truncate">{text}</span>
        {/* sub text hidden on mobile — saves ~60px per chip */}
        <span className="text-muted-foreground hidden sm:inline shrink-0">· {sub}</span>
      </div>
    ))}
  </div>
))

HeroHighlights.displayName = 'HeroHighlights'
export default HeroHighlights
