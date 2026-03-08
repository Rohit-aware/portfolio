import React, { memo } from 'react'
import { TIER_TOKENS } from '@/features/skills/constants/terminal'

const TierLegend: React.FC = memo(() => (
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
export default TierLegend
