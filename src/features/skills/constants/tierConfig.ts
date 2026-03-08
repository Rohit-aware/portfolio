import type { SkillTier } from '@/types'

export interface TierCfg {
  readonly dot: string
  readonly pill: string
  readonly label: string
}

export interface TierStyle {
  readonly nodeFill: string
  readonly nodeStroke: string
  readonly glowColor: string
  readonly ringStroke: string
  readonly swatchBg: string
  readonly label: string
  readonly textFill: string
}

export const TIER_ORDER: readonly SkillTier[] = ['expert', 'proficient', 'familiar'] as const

export const TIER_CFG: Record<SkillTier, TierCfg> = {
  expert: { dot: 'bg-primary', pill: 'bg-primary/15 border-primary/30 text-primary font-semibold', label: 'Expert' },
  proficient: { dot: 'bg-muted-foreground', pill: 'bg-surface border-border text-foreground', label: 'Proficient' },
  familiar: { dot: 'bg-muted-foreground opacity-40', pill: 'bg-transparent border-border/50 text-muted-foreground', label: 'Familiar' },
}

export const TIER_STYLE: Record<SkillTier, TierStyle> = {
  expert: {
    nodeFill: 'hsl(var(--primary))',
    nodeStroke: 'hsl(var(--primary) / 0.35)',
    glowColor: 'hsl(var(--primary) / 0.55)',
    ringStroke: 'hsl(var(--primary) / 0.22)',
    swatchBg: 'hsl(var(--primary))',
    label: 'Expert',
    textFill: 'hsl(var(--primary))',
  },
  proficient: {
    nodeFill: 'hsl(210 85% 55%)',
    nodeStroke: 'hsl(210 85% 55% / 0.35)',
    glowColor: 'hsl(210 85% 55% / 0.45)',
    ringStroke: 'hsl(210 85% 55% / 0.18)',
    swatchBg: 'hsl(210 85% 55%)',
    label: 'Proficient',
    textFill: 'hsl(210 85% 55%)',
  },
  familiar: {
    nodeFill: 'hsl(var(--muted-foreground) / 0.55)',
    nodeStroke: 'hsl(var(--muted-foreground) / 0.2)',
    glowColor: 'hsl(var(--muted-foreground) / 0.3)',
    ringStroke: 'hsl(var(--muted-foreground) / 0.12)',
    swatchBg: 'hsl(var(--muted-foreground))',
    label: 'Familiar',
    textFill: 'hsl(var(--muted-foreground))',
  },
}

export const NODE_RADIUS: Record<SkillTier, number> = {
  expert: 7,
  proficient: 5.5,
  familiar: 4.5,
}

export const RING_RADII = [88, 146, 192] as const
export const RING_SPEED = [1, -0.65, 0.45] as const
export const BASE_SPEED = 0.0015
export const HIT_RADIUS = 20
export const SVG_SIZE = 420
