import React, { memo, useCallback } from 'react'
import { SITE_META } from '@/constants/navigation'
import { scrollToSection } from '@/shared/utils/scroll'
import ScrambleName from '@/features/hero/components/ScrambleName'
import HeroBadge from '@/features/hero/components/HeroBadge'
import HeroHighlights from '@/features/hero/components/HeroHighlights'
import HeroSocials from '@/features/hero/components/HeroSocials'
import HeroStats from '@/features/hero/components/HeroStats'
import HeroVisual from '@/features/hero/components/HeroVisual'
import HeroScrollCue from '@/features/hero/components/HeroScrollCue'

const HeroSection: React.FC = memo(() => {
  const toProjects = useCallback(() => scrollToSection('projects'), [])
  const toContact = useCallback(() => scrollToSection('contact'), [])

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex flex-col pt-14 overflow-x-clip lg:min-h-0"
    >
      {/* Background grid */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Glow orbs */}
      <div
        aria-hidden="true"
        className="hero-glow w-64 h-64 sm:w-96 sm:h-96 -top-16 right-0 opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="hero-glow w-40 h-40 sm:w-64 sm:h-64 bottom-40 left-0 opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(var(--gradient-mid)) 0%, transparent 70%)' }}
      />

      {/*
        NO flex-1 here — content div is exactly as tall as its children.
        Padding drives the top spacing only. No vertical stretch.
      */}
      <div className="section-container relative z-10 w-full pt-6 sm:pt-10 lg:pt-16 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-center">

          {/* Left: Text */}
          <div className="flex flex-col min-w-0">
            <HeroBadge />

            <div
              className="mb-4 animate-fade-in-up"
              style={{ animationDelay: '80ms', animationFillMode: 'both' }}
            >
              <p className="text-xs font-mono text-muted-foreground mb-1.5 tracking-[0.18em] uppercase">
                Hello, I'm
              </p>
              <h1 className="heading-xl text-foreground leading-none">
                <ScrambleName name={SITE_META.name} />
              </h1>
            </div>

            <h2
              className="text-base sm:text-xl text-muted-foreground font-medium mb-4 animate-fade-in-up"
              style={{ animationDelay: '160ms', animationFillMode: 'both' }}
            >
              {SITE_META.role}
            </h2>

            <p
              className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-lg animate-fade-in-up"
              style={{ animationDelay: '220ms', animationFillMode: 'both' }}
            >
              {SITE_META.description}
            </p>

            <HeroHighlights />

            <div
              className="animate-fade-in-up mb-8"
              style={{ animationDelay: '380ms', animationFillMode: 'both' }}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <button onClick={toProjects} className="btn-primary">View Projects</button>
                <button onClick={toContact} className="btn-outline">Get in Touch</button>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <HeroSocials />
              </div>
            </div>

            <HeroStats />
          </div>

          {/* Right: Visual (desktop only) */}
          <HeroVisual />
        </div>
      </div>

      {/*
        flex-1 spacer: absorbs all leftover height of min-h-[100svh] on mobile.
        This pushes the scroll cue to the bottom WITHOUT stretching the content div.
        On desktop (lg:min-h-0) this spacer collapses to zero — no effect.
      */}
      <div className="flex-1 lg:hidden" aria-hidden="true" />

      {/* Scroll cue — pinned to bottom on mobile, hidden on desktop */}
      <div className="relative z-20 flex justify-center py-4 lg:hidden">
        <HeroScrollCue />
      </div>
    </section>
  )
})

HeroSection.displayName = 'HeroSection'
export default HeroSection