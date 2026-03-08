import React, { memo } from 'react'
import { SKILLS_DATA } from '../constants/skills'
import { TIER_TOKENS } from '../constants/terminal'
import type { SkillCategory } from '@/types'

interface MinimapProps {
  readonly category: SkillCategory
}

export const Minimap: React.FC<MinimapProps> = memo(({ category }) => {
  const group = SKILLS_DATA.find(g => g.category === category)
  if (!group) return null
  return (
    <div className="w-16 shrink-0 border-l border-[#2a2a3a] bg-[#0d0d14] overflow-hidden relative hidden xl:block">
      <div className="p-2 space-y-0.5 opacity-30 scale-50 origin-top-left w-[200%]">
        {group.skills.map((s, i) => (
          <div
            key={s.id}
            className="h-1.5 rounded-full"
            style={{
              width: `${50 + (i % 3) * 20}%`,
              background: TIER_TOKENS[s.tier].comment,
              opacity: s.tier === 'expert' ? 1 : s.tier === 'proficient' ? 0.7 : 0.4,
            }}
          />
        ))}
      </div>
    </div>
  )
})
Minimap.displayName = 'Minimap'

export const TierLegend: React.FC = memo(() => (
  <div className="flex items-center gap-4 px-4 py-2 border-t border-[#2a2a3a] bg-[#0d0d14]">
    {(['expert', 'proficient', 'familiar'] as const).map(tier => (
      <div key={tier} className="flex items-center gap-1.5">
        <span className="text-xs font-mono" style={{ color: TIER_TOKENS[tier].comment }}>
          {TIER_TOKENS[tier].badge}
        </span>
      </div>
    ))}
    <div className="ml-auto flex items-center gap-1.5 text-xs font-mono text-[#4a4a5a]">
      <span>TypeScript</span>
      <span className="w-1.5 h-1.5 rounded-full bg-[#3178c6]" aria-hidden="true" />
    </div>
  </div>
))
TierLegend.displayName = 'TierLegend'
