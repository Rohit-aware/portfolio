import React, { memo, useState, useCallback } from 'react'
import { SKILLS_DATA } from '@/features/skills/constants/skills'
import { EDITOR_FILES, EDITOR_SIDEBAR_ICONS, SKILL_TIER_ORDER, TIER_TOKENS, type EditorFile } from '@/features/skills/constants/terminal'
import RevealWrapper from '@/shared/components/RevealWrapper'
import { cn } from '@/shared/utils/cn'
import { useLineReveal } from '@/features/skills/hooks/useLineReveal'
import SkillCode from '@/features/skills/components/SkillCode'
import Minimap from '@/features/skills/components/Minimap'
import TierLegend from '@/features/skills/components/TierLegend'

const SkillsTerminal: React.FC = memo(() => {
  const [activeFile, setActiveFile] = useState<EditorFile>(EDITOR_FILES[0]!)
  const handleTab = useCallback((f: EditorFile) => setActiveFile(f), [])

  const group = SKILLS_DATA.find(g => g.category === activeFile.category)
  const lineCount = group ? group.skills.length + 6 : 6
  const revealed = useLineReveal(activeFile.name, lineCount)

  return (
    <section id="skills" aria-labelledby="skills-heading-term" className="section-padding">
      <div className="section-container">
        <RevealWrapper>
          <div className="text-center mb-10">
            <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">Skills</p>
            <h2 id="skills-heading-term" className="heading-lg text-foreground">Technical Stack</h2>
          </div>

          {/*
            Shadow strategy:
            - Dark mode: large dramatic shadow (rgba 0.5) looks great on dark bg
            - Light mode: same large shadow bleeds visually into the white page and
              overlaps the tier pills below — so we use the CSS dark: variant trick
              by applying shadow via Tailwind class (dark: only).
            - We use a smaller "always-on" shadow and a bigger dark-mode shadow.
          */}
          <div
            className={cn(
              'rounded-2xl overflow-hidden border border-[#2a2a3a]',
              // Light mode: subtle shadow that doesn't bleed past the box
              'shadow-[0_4px_24px_rgba(0,0,0,0.10)]',
              // Dark mode: restore the dramatic effect
              'dark:shadow-[0_24px_80px_rgba(0,0,0,0.50)]',
            )}
            style={{ background: '#0d1117' }}
            role="region"
            aria-label="Interactive code editor showing skills"
          >
            {/* ── Title bar ── */}
            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 border-b border-[#2a2a3a] bg-[#0d0d14] min-w-0">
              <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 text-center min-w-0 overflow-hidden">
                <span className="text-xs font-mono text-[#6a6a7a]">
                  {/* Mobile: just the filename to avoid overflow */}
                  <span className="sm:hidden text-[#9cdcfe]">{activeFile.name}</span>
                  {/* sm+: full path */}
                  <span className="hidden sm:inline">
                    rohit-aware / skills /&nbsp;
                    <span className="text-[#9cdcfe]">{activeFile.name}</span>
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#3178c6]/15 border border-[#3178c6]/25 shrink-0">
                <span className="text-[10px] font-mono font-bold text-[#3178c6]">TS</span>
              </div>
            </div>

            {/* ── Tab bar ── */}
            <div
              className="flex items-end border-b border-[#2a2a3a] bg-[#0d0d14] overflow-x-auto no-scrollbar"
              role="tablist"
              aria-label="Skill category files"
            >
              {EDITOR_FILES.map(f => (
                <button
                  key={f.name}
                  role="tab"
                  aria-selected={activeFile.name === f.name}
                  onClick={() => handleTab(f)}
                  className={cn(
                    'flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 text-xs font-mono shrink-0',
                    'border-r border-[#2a2a3a] transition-all duration-200 focus-visible:outline-none',
                    activeFile.name === f.name
                      ? 'bg-[#0d1117] text-[#d4d4d4] border-t border-t-[#569cd6]'
                      : 'bg-[#0d0d14] text-[#6a6a7a] hover:text-[#9cdcfe] hover:bg-[#0d1117]/60',
                  )}
                >
                  <span aria-hidden="true">{f.icon}</span>
                  <span className="truncate max-w-[70px] xs:max-w-none">{f.name}</span>
                  {activeFile.name === f.name && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary ml-1 shrink-0" aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>

            {/* ── Editor body ── */}
            <div className="flex" style={{ minHeight: 260 }}>
              <div className="w-8 sm:w-10 shrink-0 bg-[#0d0d14] border-r border-[#2a2a3a] hidden sm:flex flex-col items-center pt-3 gap-4">
                {EDITOR_SIDEBAR_ICONS.map((ic, i) => (
                  <span key={i} className="text-[10px] text-[#4a4a5a] opacity-50" aria-hidden="true">{ic}</span>
                ))}
              </div>
              <div
                className="flex-1 overflow-x-hidden overflow-y-auto p-3 sm:p-4 min-w-0"
                role="tabpanel"
                aria-label={`${activeFile.category} skills`}
              >
                <SkillCode category={activeFile.category} revealed={revealed} />
              </div>
              <Minimap category={activeFile.category} />
            </div>

            {/* ── Status bar ── */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 bg-[#0d0d14] border-t border-[#2a2a3a]">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-[10px] font-mono text-[#4a4a5a]">Ln {Math.min(revealed, lineCount)}, Col 1</span>
                <span className="text-[10px] font-mono text-[#4a4a5a] hidden xs:inline">UTF-8</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-[10px] font-mono text-[#3178c6]">TypeScript</span>
                <span className="text-[10px] font-mono text-[#4a4a5a] hidden xs:inline">{group?.skills.length ?? 0} exports</span>
              </div>
            </div>

            <TierLegend />
          </div>

          {/*
            Tier summary pills.
            mt-10 sm:mt-8 so they clear the terminal's shadow in light mode.
            Previously mt-6 put them inside the shadow bleed zone.
          */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-10 sm:mt-8">
            {SKILL_TIER_ORDER.map(tier => {
              const count = SKILLS_DATA.flatMap(g => g.skills).filter(s => s.tier === tier).length
              const tok = TIER_TOKENS[tier]
              return (
                <div key={tier} className={cn('flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono', tok.labelBg, tok.labelText)}>
                  <span>{tok.badge}</span>
                  <span className="opacity-60">·</span>
                  <span>{count} skills</span>
                </div>
              )
            })}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
})

SkillsTerminal.displayName = 'SkillsTerminal'
export default SkillsTerminal
