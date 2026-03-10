import React, { memo } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn, cv } from '@/shared/utils/cn'
import { CATEGORY_COLOR } from '@/features/projects/constants/categoryColors'

const listItemV = cv(
  // Mobile: compact pill (shrink-0 so it doesn't squash in the row)
  // Desktop: full-width card
  [
    'shrink-0 lg:w-full text-left rounded-xl border transition-all duration-200',
    'px-3 py-2 lg:px-4 lg:py-3.5',
  ].join(' '),
  {
    state: {
      active: 'bg-primary/10 border-primary/25 shadow-sm',
      inactive: 'border-transparent hover:bg-surface hover:border-border',
    },
  }
)

const listTitleV = cv('font-semibold truncate', {
  state: { active: 'text-foreground', inactive: 'text-muted-foreground' },
})

export interface ProjectListItemProps {
  readonly title: string
  readonly category: string
  readonly index: number
  readonly isActive: boolean
  readonly hasMigration: boolean
  readonly isOngoing: boolean
  readonly onClick: () => void
}

const ProjectListItem: React.FC<ProjectListItemProps> = memo(
  ({ title, category, index, isActive, hasMigration, onClick, isOngoing }) => {
    const state = isActive ? 'active' : 'inactive'
    return (
      <button onClick={onClick} aria-current={isActive ? 'true' : undefined} className={listItemV({ state })}>

        {/* Mobile layout: single compact row */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <span className={cn('text-xs font-semibold', listTitleV({ state }), 'max-w-[110px] xs:max-w-[130px]')}>
            {title}
          </span>
          {isActive && (
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
          )}
        </div>

        {/* Desktop layout: index + title + category + arrow */}
        <div className="hidden lg:flex items-start gap-3">
          <span className={cn('text-xs font-mono mt-0.5 w-4 shrink-0 font-semibold',
            isActive ? 'text-primary' : 'text-muted-foreground/40')}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className={cn('text-sm', listTitleV({ state }))}>{title}</p>
              <ArrowRight size={12} aria-hidden="true"
                className={cn('shrink-0 transition-all duration-200',
                  isActive ? 'text-primary translate-x-0.5' : 'text-muted-foreground/30')} />
            </div>
            <div className="flex items-center gap-2">
              <span className={cn('text-xs font-mono', CATEGORY_COLOR[category] ?? 'text-primary')}>{category}</span>
              {hasMigration && (
                <span className="text-xs font-mono text-amber-400/80 bg-amber-500/8 border border-amber-500/20 px-1.5 rounded-full">
                  Migration
                </span>
              )}
              {isOngoing && (
                <span className="text-xs font-mono text-blue-400/80 bg-blue-500/8 border border-blue-500/20 px-1.5 rounded-full">
                  Ongoing
                </span>
              )}
            </div>
          </div>
        </div>

      </button>
    )
  }
)

ProjectListItem.displayName = 'ProjectListItem'
export default ProjectListItem
