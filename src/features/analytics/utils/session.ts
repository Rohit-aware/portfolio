export function generateSessionId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}

export function getOrCreateVisitorId(): string {
  if (typeof window === 'undefined') return 'ssr_visitor'
  const key = 'analytics:v1:visitorId'
  try {
    let vid = localStorage.getItem(key)
    if (!vid) {
      vid = generateSessionId()
      localStorage.setItem(key, vid)
    }
    return vid
  } catch (e) {
    return 'anonymous_visitor'
  }
}
