import { SITE_META } from '@/constants/navigation'
import { useAnalyticsStore } from '@/features/analytics/store/analyticsStore'

export const downloadResume = async (): Promise<void> => {
  if (typeof document === 'undefined') return

  useAnalyticsStore
    .getState()
    .setResumeDownloaded()
    .catch(() => {})

  const filename = SITE_META.resumeFileName

  try {
    const response = await fetch(SITE_META.resumeUrl)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const blob = await response.blob()

    const objectUrl = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = objectUrl
    a.download = filename
    a.style.display = 'none'

    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(objectUrl)
  } catch {
    const fallbackLink = document.createElement('a')
    fallbackLink.href = SITE_META.resumeUrl
    fallbackLink.download = filename
    fallbackLink.target = '_blank'
    fallbackLink.rel = 'noopener noreferrer'
    fallbackLink.click()
  }
}

export const openResume = (): void => {
  if (typeof window === 'undefined') return

  useAnalyticsStore
    .getState()
    .setResumeDownloaded()
    .catch(() => {})
  window.open(SITE_META.resumeUrl, '_blank', 'noopener,noreferrer')
}
