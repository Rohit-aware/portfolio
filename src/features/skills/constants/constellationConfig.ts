import type { SkillTier } from '@/types'

export const RING_RADII  = [88, 146, 192] as const
export const BASE_SPEED  = 0.0015
export const RING_SPEED  = [1, -0.65, 0.45] as const
export const HIT_RADIUS  = 20
export const SVG_SIZE    = 420
export const CX          = SVG_SIZE / 2
export const CY          = SVG_SIZE / 2
export const TT_W        = 130
export const TT_H        = 56
export const TT_GAP      = 14

export interface TierStyle {
  readonly nodeFill:   string
  readonly nodeStroke: string
  readonly glowColor:  string
  readonly ringStroke: string
  readonly swatchBg:   string
  readonly label:      string
  readonly textFill:   string
}

export const TIER_STYLE: Record<SkillTier, TierStyle> = {
  expert: {
    nodeFill:   'hsl(var(--primary))',
    nodeStroke: 'hsl(var(--primary) / 0.35)',
    glowColor:  'hsl(var(--primary) / 0.55)',
    ringStroke: 'hsl(var(--primary) / 0.22)',
    swatchBg:   'hsl(var(--primary))',
    label:      'Expert',
    textFill:   'hsl(var(--primary))',
  },
  proficient: {
    nodeFill:   'hsl(210 85% 55%)',
    nodeStroke: 'hsl(210 85% 55% / 0.35)',
    glowColor:  'hsl(210 85% 55% / 0.45)',
    ringStroke: 'hsl(210 85% 55% / 0.18)',
    swatchBg:   'hsl(210 85% 55%)',
    label:      'Proficient',
    textFill:   'hsl(210 85% 55%)',
  },
  familiar: {
    nodeFill:   'hsl(var(--muted-foreground) / 0.55)',
    nodeStroke: 'hsl(var(--muted-foreground) / 0.2)',
    glowColor:  'hsl(var(--muted-foreground) / 0.3)',
    ringStroke: 'hsl(var(--muted-foreground) / 0.12)',
    swatchBg:   'hsl(var(--muted-foreground))',
    label:      'Familiar',
    textFill:   'hsl(var(--muted-foreground))',
  },
} as const

export const NODE_RADIUS: Record<SkillTier, number> = {
  expert: 7, proficient: 5.5, familiar: 4.5,
} as const
