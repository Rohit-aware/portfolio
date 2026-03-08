import type { ContactFormData } from '@/types'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined

/**
 * Submits contact form to Formspree.
 * Set VITE_FORMSPREE_ID in .env to enable.
 */
export const submitContactForm = async (data: ContactFormData): Promise<void> => {
  if (!FORMSPREE_ID) {
    // Simulate in dev when no key is set
    await new Promise(r => setTimeout(r, 1000))
    return
  }
  const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body:    JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Form submission failed')
}
