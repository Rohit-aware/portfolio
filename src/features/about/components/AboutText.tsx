import React, { memo } from 'react'
import { ABOUT_PARAGRAPHS } from '../constants/about'

const AboutText: React.FC = memo(() => (
  <div>
    <p className="text-xs font-mono text-primary uppercase tracking-widest mb-3">
      About
    </p>

    <h2 id="about-heading" className="heading-lg text-foreground mb-5">
      Building for the{' '}
      <span className="text-gradient">palm of your hand</span>
    </h2>

    {ABOUT_PARAGRAPHS.map((paragraph, index) => (
      <p
        key={index}
        className={`text-sm text-muted-foreground leading-relaxed ${index !== ABOUT_PARAGRAPHS.length - 1 ? 'mb-4' : ''
          }`}
      >
        {paragraph}
      </p>
    ))}
  </div>
))

AboutText.displayName = 'AboutText'
export default AboutText