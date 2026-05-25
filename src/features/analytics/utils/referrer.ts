import { ReferrerSource, ReferrerSourceType } from '@/shared/domain/referrerSource'

export function getReferrerSource(): ReferrerSourceType {
  const ref = document.referrer.toLowerCase()
  if (!ref) return ReferrerSource.DIRECT
  if (ref.includes('linkedin') || ref.includes('lnkd')) return ReferrerSource.LINKEDIN
  if (ref.includes('github')) return ReferrerSource.GITHUB
  if (ref.includes('google')) return ReferrerSource.GOOGLE
  return ReferrerSource.OTHER
}
