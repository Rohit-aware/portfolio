import React, { memo, useCallback } from 'react'
import { scrollToSection } from '@/shared/utils/scroll'

const HeroCTAButtons: React.FC = memo(() => {
  const toProjects = useCallback(() => scrollToSection('projects'), [])
  const toContact  = useCallback(() => scrollToSection('contact'),  [])

  return (
    <>
      <button onClick={toProjects} className="btn-primary">View Projects</button>
      <button onClick={toContact}  className="btn-outline">Get in Touch</button>
    </>
  )
})

HeroCTAButtons.displayName = 'HeroCTAButtons'
export default HeroCTAButtons
