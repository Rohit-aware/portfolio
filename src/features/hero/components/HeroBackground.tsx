import React, { memo } from 'react'

const HeroBackground: React.FC = memo(() => (
  <>
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"
    />
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
  </>
))

HeroBackground.displayName = 'HeroBackground'
export default HeroBackground
