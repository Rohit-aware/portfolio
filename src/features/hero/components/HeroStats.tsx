import React, { memo } from 'react'
import { HERO_STATS } from '@/features/hero/constants/hero'
import { cn } from '@/shared/utils/cn'

const HeroStats: React.FC = memo(() => (
  <div
    className={cn(
      // w-full so it stretches to column width; equal flex-1 cells never overflow
      'flex items-stretch w-full rounded-2xl border border-border',
      'bg-card overflow-hidden animate-fade-in-up',
    )}
    style={{ animationDelay: '460ms', animationFillMode: 'both' }}
    role="list"
    aria-label="Key statistics"
  >
    {HERO_STATS.map((stat, i) => (
      <React.Fragment key={stat.label}>
        {i > 0 && <div aria-hidden="true" className="w-px bg-border shrink-0" />}
        <div
          className="flex flex-col items-center justify-center flex-1 min-w-0 px-2 py-4"
          role="listitem"
        >
          <span className="text-xl sm:text-2xl font-extrabold text-gradient leading-none mb-0.5">
            {stat.value}
          </span>
          {/* text-center + leading-tight so two-word labels wrap inside the cell */}
          <span className="text-[10px] xs:text-xs text-muted-foreground text-center font-medium leading-tight px-1">
            {stat.label}
          </span>
        </div>
      </React.Fragment>
    ))}
  </div>
))

HeroStats.displayName = 'HeroStats'
export default HeroStats
