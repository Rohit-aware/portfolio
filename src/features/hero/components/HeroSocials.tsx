import React, { memo } from 'react'
import { SOCIAL_LINKS } from '@/features/hero/constants/hero'
import { cn } from '@/shared/utils/cn'

const HeroSocials: React.FC = memo(() => (
  <div className="flex items-center gap-2">
    {SOCIAL_LINKS.map(({ href, icon: Icon, label, external }) => (
      <a
        key={label}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={label}
        className={cn(
          'w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl',
          'border border-border text-muted-foreground',
          'hover:text-primary hover:border-primary/40 transition-colors',
        )}
      >
        <Icon size={14} aria-hidden="true" />
      </a>
    ))}
  </div>
))

HeroSocials.displayName = 'HeroSocials'
export default HeroSocials
