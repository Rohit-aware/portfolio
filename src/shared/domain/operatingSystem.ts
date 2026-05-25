export const OperatingSystem = {
  WINDOWS: 'Windows',
  MACOS: 'macOS',
  LINUX: 'Linux',
  ANDROID: 'Android',
  IOS: 'iOS',
  OTHER: 'Other',
} as const

export type OperatingSystemType = (typeof OperatingSystem)[keyof typeof OperatingSystem]
