import type { SkillGroup } from '@/types'

export const SKILLS_DATA: readonly SkillGroup[] = [
  {
    category: 'Mobile',
    skills: [
      { id: 'rn', name: 'React Native', tier: 'expert', category: 'Mobile' },
      { id: 'expo', name: 'Expo', tier: 'expert', category: 'Mobile' },
      { id: 'ios', name: 'iOS Development', tier: 'proficient', category: 'Mobile' },
      { id: 'kotline/java', name: 'Koline/Java ', tier: 'proficient', category: 'Mobile' },
      { id: 'Swift/Objective-C', name: 'Swift/Objective-C', tier: 'proficient', category: 'Mobile' },
      { id: 'newarch', name: 'New Architecture', tier: 'expert', category: 'Mobile' },
      { id: 'rnav', name: 'React Navigation', tier: 'expert', category: 'Mobile' },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { id: 'react', name: 'React.js', tier: 'proficient', category: 'Frontend' },
      { id: 'ts', name: 'TypeScript', tier: 'expert', category: 'Frontend' },
      { id: 'js', name: 'JavaScript', tier: 'expert', category: 'Frontend' },
      { id: 'tailwind', name: 'Tailwind CSS', tier: 'familiar', category: 'Frontend' },
      { id: 'adobexd', name: 'Adobe XD', tier: 'familiar', category: 'Frontend' },
      { id: 'fgima', name: 'Figma', tier: 'proficient', category: 'Frontend' },
    ],
  },
  {
    category: 'State Management',
    skills: [
      {
        id: 'redux',
        name: 'Redux Toolkit',
        tier: 'expert',
        category: 'State Management',
      },
      {
        id: 'context',
        name: 'React Context',
        tier: 'expert',
        category: 'State Management',
      },
      {
        id: 'zustand',
        name: 'Zustand',
        tier: 'expert',
        category: 'State Management',
      },
      { id: 'recoild', name: 'Recoil', tier: 'familiar', category: 'State Management' },
    ],
  },
  {
    category: 'Backend, Baas, Cloude & APIs',
    skills: [
      {
        id: 'rest',
        name: 'REST APIs',
        tier: 'expert',
        category: 'Backend, Baas, Cloude & APIs',
      },
      {
        id: 'graphql',
        name: 'GraphQL',
        tier: 'familiar',
        category: 'Backend, Baas, Cloude & APIs',
      },
      {
        id: 'laravel',
        name: 'Laravel',
        tier: 'expert',
        category: 'Backend, Baas, Cloude & APIs',
      },
      {
        id: 'node js',
        name: 'Node Js',
        tier: 'expert',
        category: 'Backend, Baas, Cloude & APIs',
      },
      {
        id: 'appwrite',
        name: 'Appwrite',
        tier: 'familiar',
        category: 'Backend, Baas, Cloude & APIs',
      },
      {
        id: 'convex',
        name: 'Convex',
        tier: 'familiar',
        category: 'Backend, Baas, Cloude & APIs',
      },
      {
        id: 'firestore',
        name: 'Firestore',
        tier: 'familiar',
        category: 'Backend, Baas, Cloude & APIs',
      },
    ],
  },
  {
    category: 'DevOps & Tools',
    skills: [
      { id: 'git', name: 'Git & GitHub', tier: 'expert', category: 'DevOps & Tools' },
      { id: 'jira', name: 'Jira', tier: 'expert', category: 'DevOps & Tools' },
      {
        id: 'playstore',
        name: 'Play Store',
        tier: 'familiar',
        category: 'DevOps & Tools',
      },
      { id: 'appstore', name: 'App Store', tier: 'familiar', category: 'DevOps & Tools' },
      {
        id: 'github-actions',
        name: 'GitHub Actions (CI/CD)',
        tier: 'proficient',
        category: 'DevOps & Tools',
      },
    ],
  },
] as const
