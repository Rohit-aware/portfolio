let loggerPromise: Promise<typeof import('../services/errorLoggerService')> | null = null

export function getErrorLogger(): Promise<
  typeof import('../services/errorLoggerService')
> {
  if (!loggerPromise) {
    loggerPromise = import('../services/errorLoggerService')
  }
  return loggerPromise
}
