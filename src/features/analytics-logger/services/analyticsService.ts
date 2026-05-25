import { FirebaseService } from '@/features/analytics/services/firebase'

export class ErrorAnalyticsService {
  private static instance: ErrorAnalyticsService | null = null

  private constructor() {}

  public static getInstance(): ErrorAnalyticsService {
    if (!ErrorAnalyticsService.instance) {
      ErrorAnalyticsService.instance = new ErrorAnalyticsService()
    }
    return ErrorAnalyticsService.instance
  }

  public async logEvent(eventName: string, params?: Record<string, any>): Promise<void> {
    const service = FirebaseService.getInstance()
    await service.initialize()

    if (service.isMockMode || !service.analytics) {
      return
    }

    try {
      const { logEvent } = await import('firebase/analytics')
      logEvent(service.analytics, eventName, params)
    } catch (error) {}
  }
}

export async function logErrorEvent(
  eventName: string,
  params?: Record<string, any>,
): Promise<void> {
  await ErrorAnalyticsService.getInstance().logEvent(eventName, params)
}
