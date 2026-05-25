import { ErrorSeverityType } from '@/shared/domain/errorSeverity'
import { BrowserTypeType } from '@/shared/domain/browserType'
import { OperatingSystemType } from '@/shared/domain/operatingSystem'
import { DeviceTypeType } from '@/shared/domain/deviceType'

export type SeverityType = ErrorSeverityType

export interface AnalyticsErrorDocument {
  id: string
  sessionId: string
  message: string
  type: string
  severity: SeverityType
  stack?: string
  fingerprint: string
  route: string
  browser: BrowserTypeType
  os: OperatingSystemType
  deviceType: DeviceTypeType
  timestamp: number
  handled: boolean
}
