import React, { memo } from 'react'
import { FLAGS } from '@/config/featureFlags'
import HeroSection from '@/features/hero/HeroSection'
import TerminalHero from '@/features/hero/TerminalHero'

const Hero: React.FC = memo(() =>
  FLAGS.HERO_TERMINAL ? <TerminalHero /> : <HeroSection />,
)

Hero.displayName = 'Hero'
export default Hero
