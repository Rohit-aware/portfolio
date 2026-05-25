export const DeviceType = {
  MOBILE: 'Mobile',
  TABLET: 'Tablet',
  DESKTOP: 'Desktop',
} as const

export type DeviceTypeType = (typeof DeviceType)[keyof typeof DeviceType]
