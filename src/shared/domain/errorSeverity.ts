export const ErrorSeverity = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const

export type ErrorSeverityType = (typeof ErrorSeverity)[keyof typeof ErrorSeverity]
