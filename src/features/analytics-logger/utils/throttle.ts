export function shouldThrottle(
  fingerprint: string,
  lastSeenMap: Map<string, number>,
  intervalMs: number,
): boolean {
  const now = Date.now()
  const lastSeen = lastSeenMap.get(fingerprint)
  if (lastSeen && now - lastSeen < intervalMs) {
    return true
  }
  lastSeenMap.set(fingerprint, now)
  return false
}
