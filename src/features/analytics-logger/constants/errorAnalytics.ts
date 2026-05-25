export const ERROR_COLLECTION = 'error_logs'
export const THROTTLE_INTERVAL_MS = 10000
export const BATCH_FLUSH_INTERVAL_MS = 30000
export const MAX_BATCH_SIZE = 10

export const IGNORED_ERROR_PATTERNS = [
  'extensions::',
  'chrome-extension://',
  'moz-extension://',
  'webkit-masked-url',
  'safari-web-extension://',
  'translate.google.com',
  'gtag',
  'adblock',
] as const
