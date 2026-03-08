import { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import type { ContactFormData, ContactFormStatus } from '@/types'
import { SITE_META } from '@/constants/navigation'

interface UseContactFormReturn {
  readonly formData:     ContactFormData
  readonly status:       ContactFormStatus
  readonly handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  readonly handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const INITIAL_FORM: ContactFormData = {
  name: '', email: '', message: '',
} as const

/**
 * useContactForm — opens the user's native mail client with all fields
 * pre-filled in the mailto: URI. No server, no Formspree, works offline.
 */
export const useContactForm = (): UseContactFormReturn => {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM)
  const [status,   setStatus]   = useState<ContactFormStatus>('idle')

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
      if (status !== 'idle') setStatus('idle')
    },
    [status],
  )

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>): void => {
      e.preventDefault()
      const { name, email, message } = formData
      if (!name.trim() || !email.trim() || !message.trim()) {
        setStatus('error')
        return
      }
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`)
      const body    = encodeURIComponent(
        `Hi Rohit,\n\n${message}\n\n---\nFrom: ${name}\nReply-to: ${email}`
      )
      const mailto  = `mailto:${SITE_META.email}?subject=${subject}&body=${body}`
      window.location.href = mailto
      setStatus('success')
      setFormData(INITIAL_FORM)
    },
    [formData],
  )

  return { formData, status, handleChange, handleSubmit }
}
