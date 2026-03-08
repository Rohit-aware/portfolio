import React, { memo } from 'react'
import { PROJECT_FILTERS } from '../constants/filters'
import type { FilterOption } from '../constants/filters'
import { cv } from '@/shared/utils/cn'

const filterPillVariants = cv(
  'px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200',
  {
    state: {
      active:   'bg-primary/15 text-primary border-primary/30',
      inactive: 'text-muted-foreground border-border hover:text-foreground hover:border-primary/20',
    },
  }
)

interface ProjectFilterBarProps {
  readonly activeFilter: FilterOption
  readonly onFilter:     (f: FilterOption) => void
}

const ProjectFilterBar: React.FC<ProjectFilterBarProps> = memo(({ activeFilter, onFilter }) => (
  <div
    className="flex flex-wrap gap-1.5 sm:gap-2 justify-center mb-6 sm:mb-8"
    role="group"
    aria-label="Filter by category"
  >
    {PROJECT_FILTERS.map(f => (
      <button
        key={f}
        onClick={() => onFilter(f)}
        aria-pressed={activeFilter === f}
        className={filterPillVariants({ state: activeFilter === f ? 'active' : 'inactive' })}
      >
        {f}
      </button>
    ))}
  </div>
))

ProjectFilterBar.displayName = 'ProjectFilterBar'
export default ProjectFilterBar
