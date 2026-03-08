import type { Experience } from '@/types'

export const EXPERIENCE_DATA: readonly Experience[] = [
  {
    id: 'mypcot',
    company: 'Mypcot Infotech',
    role: 'React Native Developer',
    startDate: 'July 2023',
    endDate: 'Present',
    duration: '3+ years',
    location: 'Mumbai, Maharashtra, India',
    responsibilities: [
      'Lead React Native developer for 5+ production apps across B2B, e-commerce, fitness, fantasy sports, and banking verticals',
      'Sole architect and developer on  Fantasy 11, BNPL Merchant, Studio Sunlife',
      'Executed React Native migration from v0.64 → v0.79.2 across multiple projects, updating React Navigation, Redux, and all native modules',
      'Shipped apps to both Google Play Store and Apple App Store with zero-downtime releases',
      'Redesigned UI/UX using Figma and Adobe XD for multiple projects, significantly improving visual quality',
      'Collaborated with backend teams on REST API design and integration across all projects',
      'Mentored junior developers on React Native best practices and architecture patterns',
    ],
    techStack: [
      'React Native', 'TypeScript', 'Redux Toolkit', 'React Navigation',
      'REST APIs', 'Figma', 'Adobe XD', 'Azure DevOps', 'GitHub Actions', 'CI/CD',
    ],
  },
] as const
