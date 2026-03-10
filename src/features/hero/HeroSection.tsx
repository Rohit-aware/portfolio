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
    /*
      Layout strategy (mobile-first):
      - flex-col so we can place ScrollCue as a natural flex child at the bottom
      - flex-1 on the content area fills remaining space and centers the grid within it
      - This removes the centering dead-zone on tall phones (S20 Ultra 915px etc.)
      - On lg: grid shows right column (globe/phone) so centering stays nice
    */
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col pt-14 overflow-x-clip"
    >
      {/* Background grid */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Glow orbs — right-0/left-0 so they never push a horizontal scrollbar */}
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
        flex-1 + flex items-center  →  this div fills all space between navbar and
        the ScrollCue row, and centers the content grid vertically within itself.
        On very tall phones the grid still has breathing room but no excessive gaps.
      */}
      <div className="section-container relative z-10 w-full flex-1 flex items-center py-8 sm:py-10 lg:py-16">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* ── Left: Text column ── */}
          <div className="flex flex-col min-w-0">
            <HeroBadge />

            {/* Name */}
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

            {/* Role */}
            <h2
              className="text-base sm:text-xl text-muted-foreground font-medium mb-4 animate-fade-in-up"
              style={{ animationDelay: '160ms', animationFillMode: 'both' }}
            >
              {SITE_META.role}
            </h2>

            {/* Bio */}
            <p
              className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-lg animate-fade-in-up"
              style={{ animationDelay: '220ms', animationFillMode: 'both' }}
            >
              {SITE_META.description}
            </p>

            <HeroHighlights />

            {/* CTAs — two buttons on one line, socials on next line */}
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
        ScrollCue sits as a natural flex child after the content area.
        No more absolute positioning dead-zone on tall phones.
        pb-4 gives a small bottom margin.
      */}
      <div className="relative z-20 flex justify-center pb-4 sm:pb-6">
        {FLAGS.SECTION_ABOUT && <HeroScrollCue />}
      </div>
    </section>
  )
})

HeroSection.displayName = 'HeroSection'
export default HeroSection
