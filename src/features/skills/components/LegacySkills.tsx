import React, { memo, useState, useCallback } from 'react'
import { SKILLS_DATA } from '../constants/skills'
import RevealWrapper from '@/shared/components/RevealWrapper'
import { cn, cv } from '@/shared/utils/cn'
import { TIER_ORDER, TIER_CFG } from '@/features/skills/constants/tierConfig'
import type { SkillCategory } from '@/types'

const categoryTabV = cv(
  'px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200',
  { state: {
    active:   'bg-primary/15 text-primary border-primary/30',
    inactive: 'text-muted-foreground border-border hover:text-foreground hover:border-primary/20',
  }},
)

const skillPillV = cv(
  'px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-xs border transition-colors duration-200',
  { tier: {
    expert:     'bg-primary/15 border-primary/30 text-primary font-semibold',
    proficient: 'bg-surface border-border text-foreground',
    familiar:   'bg-transparent border-border/50 text-muted-foreground',
  }},
)

const LegacySkills: React.FC = memo(() => {
  const [cat, setCat] = useState<SkillCategory>('Mobile')
  const handleCat = useCallback((c: SkillCategory) => setCat(c), [])
  const group = SKILLS_DATA.find(g => g.category === cat)

  return (
    <section id="skills" aria-labelledby="skills-heading" className="section-padding bg-surface/30">
      <div className="section-container">
        <RevealWrapper>
          <div className="text-center mb-10">
            <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">Skills</p>
            <h2 id="skills-heading" className="heading-lg text-foreground">Technical Expertise</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist">
            {SKILLS_DATA.map(g => (
              <button
                key={g.category}
                role="tab"
                aria-selected={cat === g.category}
                onClick={() => handleCat(g.category)}
                className={categoryTabV({ state: cat === g.category ? 'active' : 'inactive' })}
              >
                {g.category}
                <span className="ml-1.5 text-xs opacity-50">{g.skills.length}</span>
              </button>
            ))}
          </div>

          {group && (
            <div role="tabpanel" className="card-glass p-6">
              {TIER_ORDER.map(tier => {
                const skills = group.skills.filter(s => s.tier === tier)
                if (!skills.length) return null
                return (
                  <div key={tier} className="mb-5 last:mb-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={cn('w-2 h-2 rounded-full', TIER_CFG[tier].dot)} aria-hidden="true" />
                      <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                        {TIER_CFG[tier].label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map(s => (
                        <span key={s.id} className={skillPillV({ tier })}>{s.name}</span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className="flex justify-center gap-6 mt-5">
            {TIER_ORDER.map(tier => (
              <div key={tier} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className={cn('w-1.5 h-1.5 rounded-full', TIER_CFG[tier].dot)} aria-hidden="true" />
                {TIER_CFG[tier].label}
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
})

LegacySkills.displayName = 'LegacySkills'
export default LegacySkills
