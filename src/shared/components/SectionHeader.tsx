import React, { memo } from 'react'
import { cn } from '@/shared/utils/cn'

interface SectionHeaderProps {
  readonly label:      string
  readonly title:      React.ReactNode
  readonly subtitle?:  string
  readonly className?: string
}

/**
 * SectionHeader — shared heading pattern used by every feature section.
 * label:    small monospaced overline (e.g. "Skills")
 * title:    large heading — accepts ReactNode so callers can inject gradients
 * subtitle: optional paragraph beneath the title
 */
const SectionHeader: React.FC<SectionHeaderProps> = memo(
  ({ label, title, subtitle, className }) => (
    <div className={cn('text-center mb-10', className)}>
      <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">
        {label}
      </p>
      <h2 className="heading-lg text-foreground">{title}</h2>
      {subtitle && (
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
)

SectionHeader.displayName = 'SectionHeader'
export default SectionHeader
