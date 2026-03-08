/**
 * portfolioChatEngine — rule-based intent classifier + response generator.
 * Pure module — no side-effects, zero external deps, fully testable.
 *
 * Uses Rohit's real data to produce rich, accurate responses.
 * Pattern: classify intent → pick response template → render.
 */

import { SITE_META } from '@/constants/navigation'
import { SKILLS_DATA } from '@/features/skills/constants/skills'
import { PROJECTS_DATA } from '@/features/projects/constants/projects'
import { EXPERIENCE_DATA } from '@/features/experience/constants/experience'

export type BotIntent =
  | 'intro' | 'skills' | 'projects' | 'experience'
  | 'contact' | 'hire' | 'migration' | 'location' | 'fallback'

export interface BotMessage {
  readonly id:        string
  readonly role:      'user' | 'bot'
  readonly text:      string
  readonly intent?:   BotIntent
  readonly timestamp: number
}

export interface QuickChip {
  readonly label: string
  readonly query: string
}

/* ── Quick-access chips shown at start and on fallback ── */
export const QUICK_CHIPS: readonly QuickChip[] = [
  { label: '👋 Who are you?',        query: 'Who are you?' },
  { label: '⚡ Skills & stack',       query: 'What are your skills?' },
  { label: '📱 Apps you built',       query: 'Show me your projects' },
  { label: '💼 Experience',           query: 'Tell me about your experience' },
  { label: '🚀 RN migrations',        query: 'What React Native migrations have you done?' },
  { label: '📍 Location',             query: 'Where are you based?' },
  { label: '✉️  Hire you',            query: 'Are you available to hire?' },
] as const

/* ── Intent patterns ── */
interface IntentRule {
  readonly intent:   BotIntent
  readonly patterns: readonly RegExp[]
}

const RULES: readonly IntentRule[] = [
  {
    intent: 'intro',
    patterns: [/\b(who|about|yourself|introduce|hello|hi|hey|yo|namaste)\b/i, /^(hi|hello|hey)[\s!?]*$/i],
  },
  {
    intent: 'skills',
    patterns: [/\b(skill|tech|stack|know|language|framework|expertise|react|native|typescript|redux|tailwind)\b/i],
  },
  {
    intent: 'migration',
    patterns: [/\b(migrat|0\.64|0\.79|upgrade|new arch|turbo|fabric|version)\b/i],
  },
  {
    intent: 'projects',
    patterns: [/\b(project|app|built|work|portfolio|clms|maak|trolley|fantasy|sunlife)\b/i],
  },
  {
    intent: 'experience',
    patterns: [/\b(experience|job|career|mypcot|company|role|history|year|work)\b/i],
  },
  {
    intent: 'hire',
    patterns: [/\b(hire|available|opportunity|role|position|join|work with|recruit|open)\b/i],
  },
  {
    intent: 'contact',
    patterns: [/\b(contact|reach|email|linkedin|github|connect|message)\b/i],
  },
  {
    intent: 'location',
    patterns: [/\b(where|location|based|city|pune|mumbai|india|remote)\b/i],
  },
] as const

export const classifyIntent = (input: string): BotIntent => {
  const trimmed = input.trim()
  if (!trimmed) return 'fallback'
  for (const rule of RULES) {
    if (rule.patterns.some(p => p.test(trimmed))) return rule.intent
  }
  return 'fallback'
}

/* ── Response templates ── */
const expertSkills = SKILLS_DATA
  .flatMap(g => g.skills.filter(s => s.tier === 'expert'))
  .map(s => s.name)
  .slice(0, 6)
  .join(', ')

const projectTitles = PROJECTS_DATA
  .map(p => p.title.split('—')[0]?.trim() ?? p.title)
  .join(', ')

const exp = EXPERIENCE_DATA[0]!

export const generateResponse = (intent: BotIntent): string => {
  switch (intent) {
    case 'intro':
      return `Hi! I'm ${SITE_META.name} — a ${SITE_META.role} at ${exp.company} with ${exp.duration} of experience.\n\nI build production-grade iOS & Android apps using React Native. I've shipped 5 apps across banking, e-commerce, fitness, fantasy sports, and loan management.\n\nWhat would you like to know?`

    case 'skills':
      return `My core stack:\n\n★ Expert: ${expertSkills}\n\n◆ Proficient: iOS Dev, Android Dev, New Architecture (Fabric/Turbo), Angular, Zustand, WordPress\n\n○ Familiar: GraphQL, Adobe XD, CodeIgniter\n\nI specialize in React Native architecture — from app scaffolding to Play Store / App Store release.`

    case 'migration':
      return `I've executed 3 React Native migrations from v0.64 → v0.79.2:\n\n→ CLMS (Loan Management)\n→ Trolley (E-Commerce)\n→ MAAK (Banking App)\n\nEach migration included: React Navigation v5→v6, Redux Toolkit upgrade, native module relinks, New Architecture evaluation, and zero-downtime Play Store releases. The MAAK migration also involved CBOS security re-certification.`

    case 'projects':
      return `5 production apps shipped:\n\n📱 MAAK — African banking app with multi-bank card routing & VAPT security\n🛒 Trolley — E-commerce with WooCommerce + full cart/checkout\n💼 CLMS — B2B loan lifecycle management for 1000+ clients\n🏏 Fantasy 11 — Real-time cricket fantasy with WebSocket scores\n🧘 Studio Sunlife — Fitness & wellness with live streaming\n\nAll on Google Play + App Store.`

    case 'experience':
      return `${exp.role} @ ${exp.company}\n${exp.startDate} – ${exp.endDate} · ${exp.duration} · ${exp.location}\n\nKey highlights:\n→ Lead dev on 5 production apps\n→ Sole architect on CLMS & Fantasy 11\n→ 3 React Native v0.64 → v0.79.2 migrations\n→ VAPT & CBOS security certification (MAAK)\n→ Shipped to Play Store & App Store zero-downtime\n→ Mentored junior developers`

    case 'hire':
      return `Yes — I'm open to new opportunities!\n\nBest fit for:\n→ Senior / Lead React Native roles\n→ Mobile architecture consulting\n→ Cross-platform iOS + Android teams\n\nI'm based in ${SITE_META.location} and available for remote or hybrid roles.\n\nBest way to reach me: ${SITE_META.email}\nOr connect on LinkedIn.`

    case 'contact':
      return `Best ways to reach me:\n\n📧 Email: ${SITE_META.email}\n💼 LinkedIn: linkedin.com/in/rohitaware\n🐙 GitHub: github.com/rohitaware\n\nI typically respond within 24 hours. Feel free to email directly — I'll reply fast!`

    case 'location':
      return `I'm based in ${SITE_META.location} and currently working in ${SITE_META.workLocation}.\n\nOpen to remote, hybrid, or relocation for the right opportunity. IST timezone (UTC+5:30).`

    case 'fallback':
    default:
      return `I didn't catch that — but I can answer questions about:\n\n→ My skills & tech stack\n→ Projects I've shipped\n→ Work experience\n→ React Native migrations\n→ Hiring / availability\n→ Contact info\n\nTry one of the quick options above! 👆`
  }
}

let _msgId = 0
export const makeMsg = (
  role: 'user' | 'bot',
  text: string,
  intent?: BotIntent,
): BotMessage => ({
  id:        `msg-${++_msgId}-${Date.now()}`,
  role,
  text,
  intent,
  timestamp: Date.now(),
})

/** Simulated typing delay — longer for more complex responses */
export const typingDelay = (intent: BotIntent): number => {
  const delays: Record<BotIntent, number> = {
    intro:      900,
    skills:     1100,
    projects:   1200,
    experience: 1000,
    hire:       800,
    contact:    600,
    migration:  1100,
    location:   500,
    fallback:   500,
  }
  return delays[intent]
}
