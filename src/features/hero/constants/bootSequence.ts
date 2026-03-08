import { SITE_META } from '@/constants/navigation'
import { HERO_STATS } from '@/features/hero/constants/hero'

export interface BootLine {
  readonly text:    string
  readonly delay:   number
  readonly colour?: string
  readonly bold?:   boolean
  readonly skip?:   boolean
}

export const BOOT_SEQUENCE: readonly BootLine[] = [
  { text: '$ whoami',                                                    delay: 200 },
  { text: 'rohit_aware',                                                 delay: 400, bold: true, colour: '#7effd4' },
  { text: '',                                                             delay: 100, skip: true },
  { text: '$ cat profile.json',                                          delay: 300 },
  { text: '{',                                                            delay: 300 },
  { text: `  "role":      "${SITE_META.role}",`,                         delay: 200 },
  { text: `  "location":  "${SITE_META.location}",`,                     delay: 200 },
  { text: `  "company":   "Mypcot Infotech",`,                           delay: 200 },
  { text: `  "experience":"${HERO_STATS[2]?.value ?? '3+'} years",`,     delay: 200 },
  { text: `  "apps":       ${HERO_STATS[0]?.value ?? '5+'},`,            delay: 200 },
  { text: `  "migrations": ${HERO_STATS[1]?.value ?? '3'},`,             delay: 200 },
  { text: `  "status":    "open_to_work"`,                               delay: 200, colour: '#4ade80', bold: true },
  { text: '}',                                                            delay: 200 },
  { text: '',                                                             delay: 100, skip: true },
  { text: '$ ls ./commands',                                             delay: 400 },
  { text: 'projects   experience   skills   contact   resume',            delay: 400, colour: '#93c5fd' },
  { text: '',                                                             delay: 100, skip: true },
  { text: '$ _',                                                          delay: 300 },
] as const
