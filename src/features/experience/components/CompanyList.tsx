import React, { memo } from 'react'
import { EXPERIENCE_DATA } from '@/features/experience/constants/experience'
import { cv } from '@/shared/utils/cn'

const companyBtnV = cv(
  'w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200',
  { state: {
    active:   'bg-primary/10 border-primary/25',
    inactive: 'border-transparent hover:bg-surface hover:border-border',
  }},
)
const companyNameV = cv('text-sm font-semibold', {
  state: { active: 'text-foreground', inactive: 'text-muted-foreground' },
})

interface CompanyListProps {
  readonly activeIdx:    number
  readonly onSelect:     (i: number) => void
}

const CompanyList: React.FC<CompanyListProps> = memo(({ activeIdx, onSelect }) => (
  <div className="flex flex-col gap-1 lg:sticky lg:top-24">
    {EXPERIENCE_DATA.map((e, i) => {
      const state = i === activeIdx ? 'active' : 'inactive'
      return (
        <button
          key={e.id}
          onClick={() => onSelect(i)}
          aria-current={i === activeIdx ? 'true' : undefined}
          className={companyBtnV({ state })}
        >
          <p className={companyNameV({ state })}>{e.company}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{e.role}</p>
          <p className="text-xs font-mono text-muted-foreground/50 mt-1">
            {e.startDate} – {e.endDate}
          </p>
        </button>
      )
    })}
  </div>
))

CompanyList.displayName = 'CompanyList'
export default CompanyList
