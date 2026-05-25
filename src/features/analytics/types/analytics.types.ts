import { BrowserTypeType } from '@/shared/domain/browserType'
import { OperatingSystemType } from '@/shared/domain/operatingSystem'
import { DeviceTypeType } from '@/shared/domain/deviceType'
import { ReferrerSourceType } from '@/shared/domain/referrerSource'

export type SessionDocument = {
  sessionId: string
  visitorId: string
  startedAt: any
  endedAt: any
  lastHeartbeatAt: any
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

export type Kpis = {
  totalVisitors: number
  totalVisits: number
  returningVisitors: number
  visitsToday: number
}

export type ChartItem = {
  date: string
  visits: number
  visitors: number
}

export type PlatformItem = {
  name: string
  value: number
}

export type BrowserItem = {
  name: string
  count: number
}

export type OsItem = {
  name: string
  count: number
}

export type RecentVisitor = {
  id: string
  browser: string
  os: string
  deviceType: string
  sessionCount: number
  lastSeen: number
}

export type DashboardAnalyticsData = {
  kpis: Kpis
  chartData: ChartItem[]
  platforms: PlatformItem[]
  browsers: BrowserItem[]
  oss: OsItem[]
  recentVisitors: RecentVisitor[]
  lastUpdated: number
}
