import { BrowserTypeType } from '@/shared/domain/browserType'
import { OperatingSystemType } from '@/shared/domain/operatingSystem'
import { DeviceTypeType } from '@/shared/domain/deviceType'
import { ReferrerSourceType } from '@/shared/domain/referrerSource'

export type SessionDocument = {
  sessionId: string
  startedAt: number
  endedAt: number
  durationMs: number
  landingPage: string
  pagesVisited: string[]
  browser: BrowserTypeType
  os: OperatingSystemType
  deviceType: DeviceTypeType
  referrer: ReferrerSourceType
  viewport: {
    width: number
    height: number
  }
  interactions: string[]
  resumeDownloaded: boolean
  contactSubmitted: boolean
}
