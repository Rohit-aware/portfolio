import { SeverityType, AnalyticsErrorDocument } from '../types/errorAnalytics.types'
import { generateSessionId } from '../../analytics/utils/session'
import { getOS, getBrowser, getDeviceType } from '../../analytics/utils/platform'
import { sanitizeStacktrace } from './stacktrace'
import { generateFingerprint } from './fingerprint'
import { SESSION_ID_KEY } from '../../analytics/constants/analytics'
import { ErrorSeverity } from '@/shared/domain/errorSeverity'

export function normalizeError(
  error: any,
  severity: SeverityType = ErrorSeverity.LOW,
  handled = true,
): AnalyticsErrorDocument {
  let message = 'Unknown error'
  let type = 'Error'
  let stack = ''

  if (error instanceof Error) {
    message = error.message
    type = error.name
    stack = error.stack || ''
  } else if (typeof error === 'string') {
    message = error
  } else if (error && typeof error === 'object') {
    message = error.message || error.statusText || JSON.stringify(error)
    type = error.name || error.status || 'ObjectError'
    stack = error.stack || ''
  }

  const route = window.location.pathname || '/'
  const sanitizedStack = sanitizeStacktrace(stack)
  const fingerprint = generateFingerprint(message, sanitizedStack, route)
  const sessionId = sessionStorage.getItem(SESSION_ID_KEY) || 'anonymous_session'

  return {
    id: generateSessionId(),
    sessionId,
    message,
    type,
    severity,
    stack: sanitizedStack || undefined,
    fingerprint,
    route,
    browser: getBrowser(),
    os: getOS(),
    deviceType: getDeviceType(),
    timestamp: Date.now(),
    handled,
  }
}
