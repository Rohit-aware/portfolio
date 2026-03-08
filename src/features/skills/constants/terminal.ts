/**
 * terminal.ts — static config for SkillsTerminal VS Code editor.
 * Files tabs, tier visual tokens, VS Code colour tokens.
 */
import type { SkillCategory, SkillTier } from '@/types'

export interface EditorFile {
  readonly name: string
  readonly category: SkillCategory
  readonly icon: string
}

export const EDITOR_FILES: readonly EditorFile[] = [
  { name: 'mobile.ts', category: 'Mobile', icon: '📱' },
  { name: 'frontend.ts', category: 'Frontend', icon: '🌐' },
  { name: 'state.ts', category: 'State Management', icon: '🗂️' },
  { name: 'backend.ts', category: 'Backend, Baas, Cloude & APIs', icon: '⚙️' },
  { name: 'devops.ts', category: 'DevOps & Tools', icon: '🛠️' },
] as const

export interface TierToken {
  readonly badge: string
  readonly comment: string   // hex colour for JSDoc comment
  readonly labelBg: string   // Tailwind class
  readonly labelText: string   // Tailwind class
}

export const TIER_TOKENS: Record<SkillTier, TierToken> = {
  expert: {
    badge: '★ EXPERT',
    comment: '#4ade80',
    labelBg: 'bg-emerald-400/10 border-emerald-400/30',
    labelText: 'text-emerald-400',
  },
  proficient: {
    badge: '◆ PROFICIENT',
    comment: '#38bdf8',
    labelBg: 'bg-sky-400/10 border-sky-400/30',
    labelText: 'text-sky-400',
  },
  familiar: {
    badge: '○ FAMILIAR',
    comment: '#94a3b8',
    labelBg: 'bg-slate-400/10 border-slate-400/30',
    labelText: 'text-slate-400',
  },
} as const

/** VS Code Dark+ syntax token colours */
export const VSCODE_TOKENS = {
  keyword: 'text-[#569cd6]',
  type: 'text-[#4ec9b0]',
  string: 'text-[#ce9178]',
  prop: 'text-[#9cdcfe]',
  punct: 'text-[#808080]',
  comment: 'text-[#6a9955]',
  lineNum: 'text-[#4a4a5a]',
  number: 'text-[#b5cea8]',
} as const



/**
 * Decorative sidebar icons shown in editor
 */
export const EDITOR_SIDEBAR_ICONS = ['⬡', '◎', '⟁'] as const

/**
 * Order of tiers used for summary pills
 */
export const SKILL_TIER_ORDER: readonly SkillTier[] = [
  'expert',
  'proficient',
  'familiar',
] as const