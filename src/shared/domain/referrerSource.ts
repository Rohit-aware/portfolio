export const ReferrerSource = {
  DIRECT: 'Direct',
  LINKEDIN: 'LinkedIn',
  GITHUB: 'GitHub',
  GOOGLE: 'Google',
  OTHER: 'Other',
} as const

export type ReferrerSourceType = (typeof ReferrerSource)[keyof typeof ReferrerSource]
