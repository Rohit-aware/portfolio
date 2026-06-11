import type { LabProject } from '@/types'
import { AI_PROJECTS } from './aiProjects'
import { PACKAGES } from './packages'

/**
 * Combined lab projects — AI projects first for recruiter impact,
 * followed by published npm packages.
 */
export const LABS_DATA: readonly LabProject[] = [
  ...AI_PROJECTS,
  ...PACKAGES,
] as const

export { AI_PROJECTS, PACKAGES }
