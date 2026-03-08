import React, { memo } from 'react'
import { TIER_STYLE, NODE_RADIUS } from '@/features/skills/constants/tierConfig'
import type { SkillTier } from '@/types'

interface SwatchProps {
  readonly tier: SkillTier
  readonly size?: number
}

const OrbitRingSwatch: React.FC<SwatchProps> = memo(({ tier, size = 34 }) => {
  const r   = size / 2 - 3
  const cx  = size / 2
  const cy  = size / 2
  const sty = TIER_STYLE[tier]
  const dash = tier === 'expert' ? '5 4' : tier === 'proficient' ? '3 5' : '2 7'

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" className="shrink-0">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={sty.ringStroke} strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={sty.swatchBg} strokeWidth="2"
        strokeDasharray={dash} strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`} />
      <circle cx={cx + r * 0.71} cy={cy - r * 0.71} r={NODE_RADIUS[tier] * 0.72}
        fill={sty.nodeFill} opacity="0.9" />
    </svg>
  )
})

OrbitRingSwatch.displayName = 'OrbitRingSwatch'
export default OrbitRingSwatch
