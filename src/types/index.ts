/* ─────────────────────────────────────────────────────────────
   GLOBAL TYPE DEFINITIONS
   Single source of truth · strict · no any
   ───────────────────────────────────────────────────────────── */

export type ThemeMode = 'dark' | 'light' | 'system'

export type SkillTier = 'expert' | 'proficient' | 'familiar'

export type SkillCategory =
  | 'Mobile'
  | 'Frontend'
  | 'State Management'
  | 'Backend, Baas, Cloude & APIs'
  | 'DevOps & Tools'

export type ProjectCategory =
  | 'Client Management'
  | 'Fantasy Sports'
  | 'E-Commerce'
  | 'Fitness & Wellness'
  | 'Banking & Finance'

export interface NavItem {
  readonly id: string
  readonly label: string
}

export interface SiteConfig {
  readonly name: string
  readonly description: string
  readonly role: string
  readonly email: string
  readonly location: string
  readonly workLocation: string
  readonly linkedIn: string
  readonly github: string
  readonly resumeUrl: string
}

export interface Skill {
  readonly id: string
  readonly name: string
  readonly tier: SkillTier
  readonly category: SkillCategory
}

export interface SkillGroup {
  readonly category: SkillCategory
  readonly skills: readonly Skill[]
}

export interface Project {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly category: ProjectCategory
  readonly techStack: readonly string[]
  readonly responsibilities: readonly string[]
  readonly hasMigration: boolean
  readonly isOngoing?: boolean
  readonly migrationDetails?: string
  readonly androidUrl?: string
  readonly iosUrl?: string
  readonly webUrl?: string
  readonly githubUrl?: string
  readonly portfolioUrl: string
}

export interface Experience {
  readonly id: string
  readonly company: string
  readonly role: string
  readonly startDate: string
  readonly endDate: string
  readonly duration: string
  readonly location: string
  readonly responsibilities: readonly string[]
  readonly techStack: readonly string[]
}

export interface ContactFormData {
  readonly name: string
  readonly email: string
  readonly message: string
}

export type ContactFormStatus = 'idle' | 'sending' | 'success' | 'error'

