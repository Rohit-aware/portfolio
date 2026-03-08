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
      className="relative min-h-screen flex items-center pt-14"
    >
      {/* Background grid */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Glow orbs */}
      <div
        aria-hidden="true"
        className="hero-glow w-72 h-72 sm:w-96 sm:h-96 -top-16 -right-16 opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="hero-glow w-48 h-48 sm:w-64 sm:h-64 bottom-40 -left-12 opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(var(--gradient-mid)) 0%, transparent 70%)' }}
      />

      <div className="section-container relative z-10 w-full py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left: Text column */}
          <div className="flex flex-col">
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
              className="text-lg sm:text-xl text-muted-foreground font-medium mb-4 animate-fade-in-up"
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

            {/* CTAs + socials */}
            <div
              className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8 animate-fade-in-up"
              style={{ animationDelay: '380ms', animationFillMode: 'both' }}
            >
              {FLAGS.SECTION_PROJECTS && <button onClick={toProjects} className="btn-primary">View Projects</button>}
              {FLAGS.SECTION_CONTACT && <button onClick={toContact} className="btn-outline">Get in Touch</button>}
              <div className="flex items-center gap-2 ml-auto sm:ml-1">
                <HeroSocials />
              </div>
            </div>

            <HeroStats />
          </div>

          {/* Right: Visual */}
          <HeroVisual />
        </div>
      </div>

      {FLAGS.SECTION_ABOUT && <HeroScrollCue />}
    </section>
  )
})

HeroSection.displayName = 'HeroSection'
export default HeroSection
