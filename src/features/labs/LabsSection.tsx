import React, { memo } from 'react'
import { LABS_DATA } from '@/features/labs/data'
import RevealWrapper from '@/shared/components/RevealWrapper'
import LabCard from '@/features/labs/components/LabCard'

const LabsSection: React.FC = memo(() => (
  <section
    id="engineering-labs"
    aria-labelledby="labs-heading"
    className="section-padding"
  >
    <div className="section-container">
      <RevealWrapper className="mb-8">
        <div className="text-center mb-8">
          <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">
            Labs
          </p>
          <h2 id="labs-heading" className="heading-lg text-foreground">
            Open Source, AI & Engineering Labs
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto leading-relaxed">
            Beyond client work, I build reusable React Native libraries,
            experiment with AI-powered mobile experiences, and explore scalable
            engineering patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {LABS_DATA.map((project, i) => (
            <LabCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </RevealWrapper>
    </div>
  </section>
))

LabsSection.displayName = 'LabsSection'
export default LabsSection
