import { FirebaseService } from './firebase'
import { logError } from '@/features/analytics-logger/facade/logError'
import { ErrorSeverity } from '@/shared/domain/errorSeverity'
import { AnalyticsEventType } from '@/shared/domain/analyticsEvent'

export class AnalyticsService {
  private static instance: AnalyticsService | null = null

  private constructor() {}

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService()
    }
    return AnalyticsService.instance
  }

  public async logEvent(eventName: AnalyticsEventType | string, params?: Record<string, any>): Promise<void> {
    const service = FirebaseService.getInstance()
    await service.initialize()

    if (service.isMockMode || !service.analytics) {
      return
    }

    try {
      const { logEvent } = await import('firebase/analytics')
      logEvent(service.analytics, eventName, params)
    } catch (error) {
      logError(error, ErrorSeverity.MEDIUM, true)
    }
  }
}

export async function logAnalyticsEvent(
  eventName: AnalyticsEventType | string,
  params?: Record<string, any>,
): Promise<void> {
  await AnalyticsService.getInstance().logEvent(eventName, params)
}
