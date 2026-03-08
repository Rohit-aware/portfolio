import React, { memo } from 'react'
import { HERO_STATS } from '@/features/hero/constants/hero'
import { cn } from '@/shared/utils/cn'

const HeroStats: React.FC = memo(() => (
  <div
    className={cn(
      'inline-flex items-stretch rounded-2xl border border-border',
      'bg-card overflow-hidden self-start animate-fade-in-up',
    )}
    style={{ animationDelay: '460ms', animationFillMode: 'both' }}
    role="list"
    aria-label="Key statistics"
  >
    {HERO_STATS.map((stat, i) => (
      <React.Fragment key={stat.label}>
        {i > 0 && <div aria-hidden="true" className="w-px bg-border" />}
        <div
          className="flex flex-col items-center justify-center px-5 sm:px-7 py-4"
          role="listitem"
        >
          <span className="text-xl sm:text-2xl font-extrabold text-gradient leading-none mb-0.5">
            {stat.value}
          </span>
          <span className="text-xs text-muted-foreground whitespace-nowrap font-medium">
            {stat.label}
          </span>
        </div>
      </React.Fragment>
    ))}
  </div>
))

HeroStats.displayName = 'HeroStats'
export default HeroStats
