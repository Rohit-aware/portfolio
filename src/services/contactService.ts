import type { ContactFormData } from '@/types'
import { logApiError, logError } from '@/features/analytics-logger/facade/logError'
import { ErrorSeverity } from '@/shared/domain/errorSeverity'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined

export const submitContactForm = async (data: ContactFormData): Promise<void> => {
  if (!FORMSPREE_ID) {
    await new Promise((r) => setTimeout(r, 1000))
    return
  }
  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const errorText = await res.text().catch(() => 'Unknown error')
      logApiError(
        { url: `/f/${FORMSPREE_ID}`, method: 'POST' },
        { status: res.status, statusText: errorText },
      )
      throw new Error('Form submission failed')
    }
  } catch (error) {
    if (error instanceof Error && error.message === 'Form submission failed') {
      throw error
    }
    logError(error, ErrorSeverity.MEDIUM, true)
    throw error
  }
}
