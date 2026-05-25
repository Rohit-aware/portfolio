import { DashboardAnalyticsData } from '../types/analytics.types'

export class MockAnalyticsService {
  private static instance: MockAnalyticsService | null = null

  private constructor() {}

  public static getInstance(): MockAnalyticsService {
    if (!MockAnalyticsService.instance) {
      MockAnalyticsService.instance = new MockAnalyticsService()
    }
    return MockAnalyticsService.instance
  }

  public generateDashboardData(days: number): DashboardAnalyticsData {
    const kpis = {
      totalVisitors: 842,
      totalVisits: 1856,
      returningVisitors: 312,
      visitsToday: 48,
    }

    const chartData = []
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      const seed = Math.sin(i * 0.5) * 15 + 30
      chartData.push({
        date: dateStr,
        visits: Math.round(seed * 1.5 + Math.random() * 10),
        visitors: Math.round(seed + Math.random() * 5),
      })
    }

    const platforms = [
      { name: 'Desktop', value: 924 },
      { name: 'Mobile', value: 712 },
      { name: 'Tablet', value: 220 },
    ]

    const browsers = [
      { name: 'Chrome', count: 1104 },
      { name: 'Safari', count: 512 },
      { name: 'Firefox', count: 148 },
      { name: 'Edge', count: 68 },
      { name: 'Other', count: 24 },
    ]

    const oss = [
      { name: 'macOS', count: 812 },
      { name: 'Windows', count: 520 },
      { name: 'iOS', count: 318 },
      { name: 'Android', count: 184 },
      { name: 'Linux', count: 22 },
    ]

    const recentVisitors = [
      {
        id: 'mock_visitor_1',
        browser: 'Chrome',
        os: 'macOS',
        deviceType: 'Desktop',
        sessionCount: 14,
        lastSeen: Date.now() - 3 * 60 * 1000,
      },
      {
        id: 'mock_visitor_2',
        browser: 'Safari',
        os: 'iOS',
        deviceType: 'Mobile',
        sessionCount: 1,
        lastSeen: Date.now() - 12 * 60 * 1000,
      },
      {
        id: 'mock_visitor_3',
        browser: 'Firefox',
        os: 'Windows',
        deviceType: 'Desktop',
        sessionCount: 4,
        lastSeen: Date.now() - 75 * 60 * 1000,
      },
      {
        id: 'mock_visitor_4',
        browser: 'Chrome',
        os: 'Android',
        deviceType: 'Mobile',
        sessionCount: 2,
        lastSeen: Date.now() - 4 * 3600 * 1000,
      },
      {
        id: 'mock_visitor_5',
        browser: 'Safari',
        os: 'macOS',
        deviceType: 'Laptop',
        sessionCount: 9,
        lastSeen: Date.now() - 18 * 3600 * 1000,
      },
    ]

    return {
      kpis,
      chartData,
      platforms,
      browsers,
      oss,
      recentVisitors,
      lastUpdated: Date.now(),
    }
  }
}
export async function generateMockDashboardData(days: number): Promise<DashboardAnalyticsData> {
  return MockAnalyticsService.getInstance().generateDashboardData(days)
}
