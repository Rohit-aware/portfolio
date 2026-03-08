import type { NavItem, SiteConfig } from '@/types'

// export const SITE_META: SiteConfig = {
//   name: 'Rohit Aware',
//   email: 'awarerohit01@gmail.com',
//   location: 'Pune, Maharashtra, India',
//   workLocation: 'Mumbai, Maharashtra, India',
//   linkedIn: 'https://www.linkedin.com/in/rohitaware',
//   github: 'https://github.com/rohitaware',
//   resumeUrl: '/resume-rohit-aware.pdf',
//   role: 'React Native Developer | Mobile App Engineer',
//   description: `
//     React Native Developer with 3+ years of experience building scalable and high-performance mobile applications for Android and iOS.
//     Skilled in modern React Native architecture, performance optimization, and implementing complex UI interactions.
//     Passionate about delivering clean, maintainable code and creating seamless mobile experiences.
//     `
// } as const

export const SITE_META: SiteConfig = {
  name: 'Rohit Aware',
  role: 'React Native Developer | Mobile App Engineer',
  email: 'awarerohit01@gmail.com',
  location: 'Pune, Maharashtra, India',
  workLocation: 'Mumbai, Maharashtra, India',
  linkedIn: 'https://www.linkedin.com/in/rohitaware',
  github: 'https://github.com/Rohit-aware',
  resumeUrl: '../../public/Rohit_Aware_Resume.pdf',
  description: `
  React Native Developer with 3+ years of experience building scalable and high-performance mobile applications for Android and iOS.
  Skilled in modern React Native architecture, performance optimization, and implementing complex UI interactions.
  Passionate about writing clean, maintainable code and delivering seamless mobile experiences.
  `
} as const

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const

export const SECTION_IDS: readonly string[] = NAV_ITEMS.map(n => n.id)
