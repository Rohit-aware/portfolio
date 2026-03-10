import React, { memo, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import { scrollToSection } from '@/shared/utils/scroll'
import { useBootSequence } from '@/features/hero/hooks/useBootSequence'
import TerminalWindow from '@/features/hero/components/TerminalWindow'

const TerminalHero: React.FC = memo(() => {
  const { revealedCount, allDone, showCommands } = useBootSequence()
  const toAbout = useCallback(() => scrollToSection('about'), [])

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-screen flex items-center justify-center pt-14 overflow-x-clip"
      style={{ background: '#020408' }}
    >
      {/* CRT scanline grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(0,255,100,0.015) 2px, rgba(0,255,100,0.015) 4px
          )`,
        }}
      />

      {/* Phosphor ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 45%, rgba(0,200,80,0.04) 0%, transparent 70%)' }}
      />

      {/* Vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.7) 100%)' }}
      />

      <TerminalWindow
        revealedCount={revealedCount}
        allDone={allDone}
        showCommands={showCommands}
      />

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={toAbout}
          aria-label="Scroll to About section"
          className="flex flex-col items-center gap-2 group"
        >
          <span
            className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-30 group-hover:opacity-60 transition-opacity"
            style={{ color: '#a3e635' }}
          >
            scroll
          </span>
          <span className="animate-scroll-bounce block opacity-40 group-hover:opacity-70 transition-opacity">
            <ChevronDown size={14} style={{ color: '#a3e635' }} aria-hidden="true" />
          </span>
        </button>
      </div>
    </section>
  )
})

TerminalHero.displayName = 'TerminalHero'
export default TerminalHero
