import { useEffect } from 'react'
import { logError } from '../facade/logError'
import { ErrorSeverity } from '@/shared/domain/errorSeverity'

export function useGlobalErrorTracking(): void {
  useEffect(() => {
    const handleError = (event: ErrorEvent): void => {
      const error = event.error || {
        name: 'UncaughtError',
        message: event.message,
        stack: `${event.filename}:${event.lineno}:${event.colno}`,
      }
      logError(error, ErrorSeverity.HIGH, false)
    }

    const handleRejection = (event: PromiseRejectionEvent): void => {
      const reason = event.reason || 'Unhandled Promise Rejection'
      logError(reason, ErrorSeverity.HIGH, false)
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleRejection)
    }
  }, [])
}
