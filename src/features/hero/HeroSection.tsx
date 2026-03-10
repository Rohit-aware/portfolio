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
import { FLAGS } from '@/config/featureFlags'

const HeroSection: React.FC = memo(() => {
  const toProjects = useCallback(() => scrollToSection('projects'), [])
  const toContact = useCallback(() => scrollToSection('contact'), [])

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className={[
        'relative flex flex-col pt-14 overflow-x-clip',
        // Mobile: full viewport so hero fills the screen and scroll cue pins to bottom
        // 100svh instead of 100vh — accounts for browser chrome (address bar) on mobile
        'min-h-[100svh]',
        // Desktop: let content height + padding decide the section height.
        // No wasted space — the globe visual fills the right column naturally.
        'lg:min-h-0',
      ].join(' ')}
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
        Mobile:  flex-1 fills space between navbar and scroll cue, centers grid vertically
        Desktop: lg:flex-none + explicit padding drives the height — no stretching
      */}
      <div className="section-container relative z-10 w-full flex-1 lg:flex-none flex items-center py-10 sm:py-12 lg:py-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* ── Left: Text ── */}
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
                {FLAGS.SECTION_PROJECTS && <button onClick={toProjects} className="btn-primary">View Projects</button>}
                {FLAGS.SECTION_CONTACT && <button onClick={toContact} className="btn-outline">Get in Touch</button>}
              </div>
              <div className="flex items-center gap-2 mt-3">
                <HeroSocials />
              </div>
            </div>

            <HeroStats />
          </div>

          {/* ── Right: Visual (desktop only) ── */}
          <HeroVisual />
        </div>
      </div>

      {/*
        Scroll cue:
        Mobile  — natural flex child at bottom of the min-h-[100svh] section → pinned to bottom
        Desktop — hidden (desktop users don't need a scroll hint; page height is content-driven)
      */}
      <div className="relative z-20 flex justify-center pb-4 sm:pb-6">
        {FLAGS.SECTION_ABOUT && <HeroScrollCue />}
      </div>
    </section>
  )
})

HeroSection.displayName = 'HeroSection'
export default HeroSection
