/**
 * analyticsService — visitor tracking
 * Uses localStorage for session dedup + CountAPI for persistent count.
 * CountAPI is free, no account needed, no PII collected.
 * Namespace: rohit-aware-portfolio (unique per site)
 */

const NAMESPACE  = 'rohit-aware'
const KEY        = 'portfolio-visits'
const SESSION_SK = 'ra-visited'
const LOCAL_SK   = 'ra-visit-count'

export interface VisitStats {
  total:    number
  isNewVisit: boolean
}

/** Hit the counter and return updated total. */
export const recordVisit = async (): Promise<VisitStats> => {
  const isNewVisit = !sessionStorage.getItem(SESSION_SK)

  if (isNewVisit) {
    sessionStorage.setItem(SESSION_SK, '1')
  }

  // Always fetch current count from CountAPI
  try {
    const endpoint = isNewVisit
      ? `https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`
      : `https://api.countapi.xyz/get/${NAMESPACE}/${KEY}`

    const res  = await fetch(endpoint)
    const data = await res.json() as { value: number }
    const total = data.value ?? 0

    // Cache locally so we can show even if API fails next time
    localStorage.setItem(LOCAL_SK, String(total))
    return { total, isNewVisit }
  } catch {
    // Offline fallback — show cached value
    const cached = parseInt(localStorage.getItem(LOCAL_SK) ?? '0', 10)
    return { total: cached, isNewVisit }
  }
}

/** Get current count without incrementing. */
export const getVisitCount = async (): Promise<number> => {
  try {
    const res  = await fetch(`https://api.countapi.xyz/get/${NAMESPACE}/${KEY}`)
    const data = await res.json() as { value: number }
    return data.value ?? 0
  } catch {
    return parseInt(localStorage.getItem(LOCAL_SK) ?? '0', 10)
  }
}
