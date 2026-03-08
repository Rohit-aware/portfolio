/**
 * SkillsSection — entry point for the skills feature.
 * Priority: SKILLS_TERMINAL → SKILLS_RADIAL → LegacySkills
 */
import React, { memo } from 'react'
import { FLAGS } from '@/config/featureFlags'
import SkillsTerminal     from '@/features/skills/SkillsTerminal'
import ConstellationSkills from '@/features/skills/components/ConstellationSkills'
import LegacySkills        from '@/features/skills/components/LegacySkills'

const SkillsSection: React.FC = memo(() => {
  if (FLAGS.SKILLS_TERMINAL) return <SkillsTerminal />
  if (FLAGS.SKILLS_RADIAL)   return <ConstellationSkills />
  return <LegacySkills />
})

SkillsSection.displayName = 'SkillsSection'
export default SkillsSection
