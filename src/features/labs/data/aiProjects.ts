import type { LabProject } from '@/types'

export const AI_PROJECTS: readonly LabProject[] = [
  {
    id: 'rn-claude-ai',
    title: 'RNClaudeAI — AI Chat Mobile App',
    description:
      'A production-grade React Native AI chat application integrated with the Anthropic Claude API. Features real-time streaming responses via Server-Sent Events, persistent conversation history, type-safe Redux state management, and a complete dark/light/system theme engine.',
    type: 'ai-project',
    techStack: [
      'React Native (Bare CLI)',
      'TypeScript (Strict)',
      'Claude API',
      'Redux Toolkit',
      'MMKV',
      'SSE Streaming',
      'Zod',
      'React Navigation',
    ],
    highlights: [
      'Real-time Claude streaming responses via SSE',
      'Persistent conversation history with MMKV (~30× faster than AsyncStorage)',
      'Type-safe environment validation with Zod (crashes early if API key missing)',
      'Retry logic, error normalization, and abort support',
      'Clean enterprise architecture with atomic component hierarchy',
    ],
    keyLearnings: [
      'Claude API integration & prompt engineering workflows',
      'Server-Sent Events (SSE) streaming in React Native',
      'AI conversation state architecture',
      'MMKV-based local persistence patterns',
      'Zod schema validation for runtime safety',
    ],
    githubUrl: 'https://github.com/Rohit-aware/expo-apps/tree/main/ai_app',
    lastUpdated: '2026',
    language: 'TypeScript',
  },
] as const
