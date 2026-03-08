import type { ProjectCategory } from '@/types'

export type FilterOption = 'All' | ProjectCategory

export const PROJECT_FILTERS: readonly FilterOption[] = [
  'All',
  'Client Management',
  'Fantasy Sports',
  'E-Commerce',
  'Fitness & Wellness',
  'Banking & Finance',
] as const
