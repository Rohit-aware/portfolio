/**
 * ─────────────────────────────────────────────────────────────────
 *  FEATURE FLAGS — single source of truth.
 *
 *  true  = feature enabled
 *  false = feature disabled / reverted
 *  `satisfies Record<string, boolean>` enforces strict typing.
 * ─────────────────────────────────────────────────────────────────
 */
export const FLAGS = {

  /* ── SECTIONS — false removes from DOM entirely ── */
  SECTION_ABOUT: true,
  SECTION_SKILLS: true,
  SECTION_PROJECTS: true,
  SECTION_EXPERIENCE: true,
  SECTION_CONTACT: true,
  /*
  Hover me emoji cloud — low priority, just for fun. Kept separate from core hero flags for easier toggling without affecting critical path.
  */
  HOVER_ME: false,
  /* ── HERO ── */
  /** true → CRT terminal boot animation  false → standard hero */
  HERO_TERMINAL: false,
  /** true → 3D particle globe  false → Phone3D CSS mockup */
  HERO_3D_GLOBE: true,

  /* ── SKILLS VIEW — priority: TERMINAL > RADIAL > LEGACY ── */
  /** true → VS Code TypeScript editor */
  SKILLS_TERMINAL: false,
  /** true → Skill Constellation orbit (only checked when TERMINAL=false) */
  SKILLS_RADIAL: false,

  /* ── GLOBAL UI ── */
  /** true → Floating portfolio chatbot FAB */
  PORTFOLIO_CHAT: true,
  PORTFOLIO_ANYALYTICS: false,
  /** true → Animated cursor spotlight */
  ANIMATED_CURSOR: true,

} as const satisfies Record<string, boolean>

export type FeatureFlag = keyof typeof FLAGS
