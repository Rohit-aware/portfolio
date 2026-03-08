import React, { memo } from 'react'
import { ABOUT_FACTS } from '../constants/facts'
import AboutFactCard from './AboutFactCard'

const AboutFactsGrid: React.FC = memo(() => (
  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3">
    {ABOUT_FACTS.map(fact => (
      <AboutFactCard key={fact.label} fact={fact} />
    ))}
  </div>
))

AboutFactsGrid.displayName = 'AboutFactsGrid'
export default AboutFactsGrid
