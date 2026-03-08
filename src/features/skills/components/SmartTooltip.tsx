import React, { memo } from 'react'
import { TIER_STYLE, NODE_RADIUS, SVG_SIZE } from '@/features/skills/constants/tierConfig'
import type { SkillTier } from '@/types'

export interface SkillNode {
  readonly name: string
  readonly tier: SkillTier
  readonly category: string
  readonly angle: number
  readonly ring: number
}

export interface FloatTooltip {
  readonly node: SkillNode
  readonly svgX: number
  readonly svgY: number
}

const TT_W = 130
const TT_H = 56
const TT_GAP = 14

interface SmartTooltipProps {
  readonly ft: FloatTooltip
}

const SmartTooltip: React.FC<SmartTooltipProps> = memo(({ ft }) => {
  const { node, svgX, svgY } = ft
  const style = TIER_STYLE[node.tier]
  const nr = NODE_RADIUS[node.tier]
  const inRightHalf = svgX > SVG_SIZE / 2
  const nearBottom = svgY > SVG_SIZE - TT_H - TT_GAP * 2
  const nearTop = svgY < TT_H + TT_GAP * 2

  let tx: number
  let ty: number

  if (nearBottom) {
    tx = svgX - TT_W / 2
    ty = svgY - nr - TT_GAP - TT_H
  } else if (nearTop) {
    tx = svgX - TT_W / 2
    ty = svgY + nr + TT_GAP
  } else if (inRightHalf) {
    tx = svgX - nr - TT_GAP - TT_W
    ty = svgY - TT_H / 2
  } else {
    tx = svgX + nr + TT_GAP
    ty = svgY - TT_H / 2
  }

  tx = Math.max(4, Math.min(SVG_SIZE - TT_W - 4, tx))
  ty = Math.max(4, Math.min(SVG_SIZE - TT_H - 4, ty))

  return (
    <g style={{ pointerEvents: 'none' }}>
      <line
        x1={svgX} y1={svgY}
        x2={inRightHalf ? tx + TT_W : tx}
        y2={ty + TT_H / 2}
        stroke={style.glowColor}
        strokeWidth="0.75"
        strokeDasharray="3 3"
        opacity="0.5"
      />
      <rect x={tx} y={ty} width={TT_W} height={TT_H} rx="8"
        fill="hsl(var(--card) / 0.97)"
        stroke={style.nodeStroke}
        strokeWidth="1"
      />
      <rect x={tx + 1} y={ty + 8} width="3" height={TT_H - 16} rx="2"
        fill={style.nodeFill} opacity="0.9"
      />
      <text x={tx + 13} y={ty + 20}
        fill="hsl(var(--foreground))" fontSize="11" fontWeight="700" fontFamily="monospace">
        {node.name}
      </text>
      <text x={tx + 13} y={ty + 35}
        fill={style.textFill} fontSize="9" fontWeight="600" fontFamily="monospace" opacity="0.85">
        {style.label}
      </text>
      <text x={tx + TT_W - 8} y={ty + 35}
        fill="hsl(var(--muted-foreground))" fontSize="9" fontFamily="monospace" textAnchor="end" opacity="0.6">
        {node.category}
      </text>
    </g>
  )
})

SmartTooltip.displayName = 'SmartTooltip'
export default SmartTooltip
