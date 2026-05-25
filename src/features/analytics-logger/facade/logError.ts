import { getErrorLogger } from '../utils/getErrorLogger'
import { ErrorSeverity } from '@/shared/domain/errorSeverity'
import type { SeverityType } from '../types/errorAnalytics.types'

export function logError(
  error: any,
  severity: SeverityType = ErrorSeverity.LOW,
  handled = true,
): void {
  getErrorLogger()
    .then((module) => {
      module.logException(error, severity, handled)
    })
    .catch(() => {})
}

export function logHandledError(error: any): void {
  logError(error, ErrorSeverity.LOW, true)
}

export function logCriticalError(error: any): void {
  logError(error, ErrorSeverity.CRITICAL, false)
}

export function logApiError(
  request: { url: string; method: string },
  response: { status: number; statusText: string },
): void {
  getErrorLogger()
    .then((module) => {
      module.logApiFailure(request, response)
    })
    .catch(() => {})
}
