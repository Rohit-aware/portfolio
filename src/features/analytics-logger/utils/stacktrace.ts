export function sanitizeStacktrace(stack?: string): string {
  if (!stack) return ''
  return stack
    .split('\n')
    .map((line) => {
      let cleaned = line.replace(/\/Users\/[^\/]+\//g, '~/')
      cleaned = cleaned.replace(/\?t=\d+/g, '')
      cleaned = cleaned.replace(/\?v=[^\s)]+/g, '')
      return cleaned
    })
    .join('\n')
}
