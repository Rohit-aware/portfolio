export function generateFingerprint(
  message: string,
  stack?: string,
  route?: string,
): string {
  const cleanStack = (stack || '').split('\n').slice(0, 3).join('\n')
  const raw = `${message}|${cleanStack}|${route || ''}`
  let hash = 0
  for (let i = 0; i < raw.length; i++) {
    hash = (hash << 5) - hash + raw.charCodeAt(i)
    hash |= 0
  }
  return String(Math.abs(hash))
}
