import { SITE_META } from '@/constants/navigation'
import { useAnalyticsStore } from '@/features/analytics/store/analyticsStore'

const RESUME_FILENAME = 'Rohit_Aware_Resume.pdf'

export const downloadResume = (): void => {
  useAnalyticsStore
    .getState()
    .setResumeDownloaded()
    .catch(() => {})
  const a = document.createElement('a')
  a.href = SITE_META.resumeUrl
  a.download = RESUME_FILENAME
  a.rel = 'noopener noreferrer'
  a.style.display = 'none'

  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export const openResume = (): void => {
  useAnalyticsStore
    .getState()
    .setResumeDownloaded()
    .catch(() => {})
  window.open(SITE_META.resumeUrl, '_blank', 'noopener,noreferrer')
}
