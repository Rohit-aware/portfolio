import React, { memo } from 'react'
import { SKILLS_DATA } from '@/features/skills/constants/skills'
import { TIER_TOKENS } from '@/features/skills/constants/terminal'
import type { SkillCategory } from '@/types'

interface MinimapProps {
  readonly category: SkillCategory
}

const Minimap: React.FC<MinimapProps> = memo(({ category }) => {
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
              width:      `${50 + (i % 3) * 20}%`,
              background: TIER_TOKENS[s.tier].comment,
              opacity:    s.tier === 'expert' ? 1 : s.tier === 'proficient' ? 0.7 : 0.4,
            }}
          />
        ))}
      </div>
    </div>
  )
})

Minimap.displayName = 'Minimap'
export default Minimap
