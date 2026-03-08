import React, { memo, useState, useCallback } from 'react'
import { EXPERIENCE_DATA } from '@/features/experience/constants/experience'
import RevealWrapper   from '@/shared/components/RevealWrapper'
import CompanyList     from '@/features/experience/components/CompanyList'
import ExperienceDetail from '@/features/experience/components/ExperienceDetail'

const ExperienceSection: React.FC = memo(() => {
  const [activeIdx, setActiveIdx] = useState(0)
  const handleSelect = useCallback((i: number) => setActiveIdx(i), [])
  const exp = EXPERIENCE_DATA[activeIdx]

  if (!exp) return null

  return (
    <section id="experience" aria-labelledby="exp-heading" className="section-padding">
      <div className="section-container">
        <RevealWrapper>
          <div className="text-center mb-10">
            <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">Experience</p>
            <h2 id="exp-heading" className="heading-lg text-foreground">Work History</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-3 lg:gap-4 lg:items-start">
            <CompanyList activeIdx={activeIdx} onSelect={handleSelect} />
            <ExperienceDetail exp={exp} />
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
})

ExperienceSection.displayName = 'ExperienceSection'
export default ExperienceSection
