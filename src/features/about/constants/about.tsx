import React from 'react'
import { Briefcase, MapPin, Code2, Rocket } from 'lucide-react'

export interface AboutFact {
  readonly icon: typeof Briefcase
  readonly label: string
  readonly value: string
}

export const ABOUT_PARAGRAPHS = [
  <React.Fragment key="p1">
    I'm a React Native developer with{' '}
    <span className="text-foreground font-medium" > 3 + years of professional experience </span>{' '}
    building scalable mobile applications for Android and iOS.
  </React.Fragment>,

  <React.Fragment key="p2">
    Currently working at{' '}
    <span className="text-foreground font-medium" > Mypcot Infotech </span>, I've built and
    shipped production apps across multiple domains including fantasy sports,
    e - commerce, banking, and B2B client management.
  </React.Fragment>,

  <React.Fragment key="p3">
    I specialize in {' '}
    <span className="text-foreground font-medium" > React Native architecture </span>,{' '}
    <span className="text-foreground font-medium" > Redux Toolkit </span>, and complex API
    integrations.I've also executed several{' '}
    <span className="text-foreground font-medium" > React Native migrations </span> while
    keeping production apps stable.
  </React.Fragment>,

  <React.Fragment key="p4">
    I focus on clean architecture, maintainable code, and building performant
    mobile experiences that users actually enjoy.
  </React.Fragment>,
] as const

export const ABOUT_FACTS: readonly AboutFact[] = [
  {
    icon: Briefcase,
    label: 'Currently',
    value: 'React Native Developer @ Mypcot Infotech',
  },
  {
    icon: MapPin,
    label: 'Based in',
    value: 'Pune, Maharashtra (working in Mumbai)',
  },
  {
    icon: Code2,
    label: 'Speciality',
    value: 'Cross-platform mobile apps · RN migrations',
  },
  {
    icon: Rocket,
    label: 'Shipped',
    value: '5 production apps on Play Store & App Store',
  },
] as const