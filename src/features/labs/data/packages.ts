import type { LabProject } from '@/types'

export const PACKAGES: readonly LabProject[] = [
  {
    id: 'rn-lab-bottom-sheet',
    title: '@rn-lab/bottom-sheet',
    description:
      'A premium, highly-optimized bottom sheet component for React Native built on Reanimated v3 and Gesture Handler v2. Features zero-jank 60+ FPS animations running entirely on the UI thread, snap points, imperative API, and an integrated theme engine.',
    type: 'npm-package',
    techStack: [
      'React Native',
      'Reanimated v3',
      'Gesture Handler v2',
      'TypeScript',
      'React Native Builder Bob',
    ],
    highlights: [
      'Published npm package (MIT)',
      'Zero-jank / 60+ FPS — animations run entirely on UI thread',
      'Imperative API with snap point engine',
      'Keyboard-aware with dynamic height adjustment',
      'Integrated theme engine (Dark/Light mode)',
      'Tree-shakeable with sideEffects: false',
    ],
    npmUrl: 'https://www.npmjs.com/package/@rn-lab/bottom-sheet',
    githubUrl: 'https://github.com/Rohit-aware/bottom_sheet',
    version: '1.0.4',
    installCommand: 'npm install @rn-lab/bottom-sheet',
    language: 'TypeScript',
  },
  {
    id: 'rn-lab-design-system',
    title: '@rn-lab/design-system',
    description:
      'A production-grade, fully type-safe React Native design system SDK. Provides consistent typography, colors, and layouts with dynamic theming, responsive breakpoints, and memoized style creators for jank-free rendering.',
    type: 'npm-package',
    techStack: [
      'React Native',
      'TypeScript',
      'Design Tokens',
      'Responsive Breakpoints',
    ],
    highlights: [
      'Published npm package (MIT)',
      'Type-safe theming with createProjectTheme / createThemeKit',
      'Typography engine with static & dynamic font generation',
      'Responsive layout system (xs / md / lg breakpoints)',
      'Dark/Light mode with zero-overhead memoization',
      'Design token architecture for scalable consistency',
    ],
    npmUrl: 'https://www.npmjs.com/package/@rn-lab/design-system',
    githubUrl: 'https://github.com/Rohit-aware/design-system',
    version: '1.0.6',
    installCommand: 'npm install @rn-lab/design-system',
    language: 'TypeScript',
  },
] as const
