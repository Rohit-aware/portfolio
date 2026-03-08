import React, { memo } from 'react'
import RevealWrapper from '@/shared/components/RevealWrapper'
import AboutText     from '@/features/about/components/AboutText'
import AboutFacts    from '@/features/about/components/AboutFactsGrid'

const AboutSection: React.FC = memo(() => (
  <section id="about" aria-labelledby="about-heading" className="section-padding">
    <div className="section-container">
      <RevealWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <AboutText />
          <AboutFacts />
        </div>
      </RevealWrapper>
    </div>
  </section>
))

AboutSection.displayName = 'AboutSection'
export default AboutSection
