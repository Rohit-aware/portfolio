import { SeverityType } from '../types/errorAnalytics.types'
import {
  IGNORED_ERROR_PATTERNS,
  MAX_BATCH_SIZE,
  BATCH_FLUSH_INTERVAL_MS,
} from '../constants/errorAnalytics'
import { normalizeError } from '../utils/normalizeError'
import { logErrorEvent } from './analyticsService'
import { logErrorToFirestore, logErrorsBatchToFirestore } from './firestoreService'
import { useErrorAnalyticsStore } from '../store/errorAnalyticsStore'
import { ErrorSeverity } from '@/shared/domain/errorSeverity'
import { AnalyticsEvent } from '@/shared/domain/analyticsEvent'

export class ErrorLoggerService {
  private static instance: ErrorLoggerService | null = null
  private flushTimeout: any = null

  private constructor() {}

  public static getInstance(): ErrorLoggerService {
    if (!ErrorLoggerService.instance) {
      ErrorLoggerService.instance = new ErrorLoggerService()
    }
    return ErrorLoggerService.instance
  }

  public logException(error: any, severity: SeverityType = ErrorSeverity.LOW, handled = true): void {
    try {
      const msg =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : error?.message || ''
      const stack = error instanceof Error ? error.stack : error?.stack || ''
      const errorStr = `${msg} ${stack}`.toLowerCase()

      const isIgnored = IGNORED_ERROR_PATTERNS.some((pattern) =>
        errorStr.includes(pattern.toLowerCase()),
      )

      if (isIgnored) {
        return
      }

      const normalized = normalizeError(error, severity, handled)
      const store = useErrorAnalyticsStore.getState()

      if (store.isThrottled(normalized.fingerprint)) {
        return
      }

      store.registerFingerprint(normalized.fingerprint)

      logErrorEvent(AnalyticsEvent.APP_ERROR, {
        error_type: normalized.type,
        error_message: normalized.message,
        severity: normalized.severity,
        route: normalized.route,
        fingerprint: normalized.fingerprint,
      }).catch(() => {})

      if (severity === ErrorSeverity.CRITICAL || severity === ErrorSeverity.HIGH) {
        logErrorToFirestore(normalized).catch(() => {})
      } else {
        store.addErrorToBatch(normalized)
        const updatedErrors = useErrorAnalyticsStore.getState().batchedErrors
        if (updatedErrors.length >= MAX_BATCH_SIZE) {
          this.flushBatch().catch(() => {})
        } else if (!this.flushTimeout) {
          this.flushTimeout = setTimeout(() => {
            this.flushBatch().catch(() => {})
          }, BATCH_FLUSH_INTERVAL_MS)
        }
      }
    } catch (e) {}
  }

  public logApiFailure(
    request: { url: string; method: string },
    response: { status: number; statusText: string },
  ): void {
    try {
      const errorObj = {
        name: 'ApiFailure',
        message: `API ${request.method} ${request.url} failed with status ${response.status} (${response.statusText})`,
        stack: new Error().stack || '',
      }
      this.logException(errorObj, ErrorSeverity.MEDIUM, true)
    } catch (e) {}
  }

  private async flushBatch(): Promise<void> {
    try {
      if (this.flushTimeout) {
        clearTimeout(this.flushTimeout)
        this.flushTimeout = null
      }
      const store = useErrorAnalyticsStore.getState()
      const errors = [...store.batchedErrors]
      if (errors.length === 0) {
        return
      }
      store.clearBatch()
      await logErrorsBatchToFirestore(errors)
    } catch (e) {}
  }
}

export function logException(
  error: any,
  severity?: SeverityType,
  handled?: boolean,
): void {
  ErrorLoggerService.getInstance().logException(error, severity, handled)
}

export function logApiFailure(
  request: { url: string; method: string },
  response: { status: number; statusText: string },
): void {
  ErrorLoggerService.getInstance().logApiFailure(request, response)
}
