import React, { memo } from 'react'
import Globe3D  from '@/animations/Globe3D'
import Phone3D  from '@/animations/Phone3D'
import { FLAGS } from '@/config/featureFlags'

/**
 * HeroVisual — feature-flagged right-column visual.
 * HERO_3D_GLOBE=true  → animated particle globe
 * HERO_3D_GLOBE=false → CSS phone mockup
 */
const HeroVisual: React.FC = memo(() => (
  <div
    className="hidden lg:flex items-center justify-center animate-fade-in-up"
    style={{ animationDelay: '200ms', animationFillMode: 'both' }}
  >
    {FLAGS.HERO_3D_GLOBE ? <Globe3D /> : <Phone3D />}
  </div>
))

HeroVisual.displayName = 'HeroVisual'
export default HeroVisual
