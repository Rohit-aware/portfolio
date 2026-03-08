import React, { memo } from 'react'
import RevealWrapper from '@/shared/components/RevealWrapper'
import ContactForm   from '@/features/contact/components/ContactForm'
import ContactInfo   from '@/features/contact/components/ContactInfo'

const ContactSection: React.FC = memo(() => (
  <section id="contact" aria-labelledby="contact-heading" className="section-padding bg-surface/30">
    <div className="section-container">
      <RevealWrapper>
        <div className="text-center mb-10">
          <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">Contact</p>
          <h2 id="contact-heading" className="heading-lg text-foreground">Let's work together</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            Open to React Native roles, mobile architecture consulting, and cross-platform projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8">
          <ContactForm />
          <ContactInfo />
        </div>
      </RevealWrapper>
    </div>
  </section>
))

ContactSection.displayName = 'ContactSection'
export default ContactSection
