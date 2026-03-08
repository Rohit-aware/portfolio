import type { SkillTier } from '@/types'

export interface SkillNode {
  readonly name:     string
  readonly tier:     SkillTier
  readonly category: string
  readonly angle:    number
  readonly ring:     number
}
