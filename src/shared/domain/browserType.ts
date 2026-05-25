export const BrowserType = {
  CHROME: 'Chrome',
  SAFARI: 'Safari',
  FIREFOX: 'Firefox',
  EDGE: 'Edge',
  OPERA: 'Opera',
  OTHER: 'Other',
} as const

export type BrowserTypeType = (typeof BrowserType)[keyof typeof BrowserType]
