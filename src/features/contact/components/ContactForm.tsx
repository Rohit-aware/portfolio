import React, { memo } from 'react'
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import { useContactForm } from '@/shared/hooks/useContactForm'
import FormField from '@/features/contact/components/FormField'

const ContactForm: React.FC = memo(() => {
  const { formData, status, handleChange, handleSubmit } = useContactForm()

  return (
    <div className="card-glass p-6">
      <div className="mb-5">
        <h3 className="heading-md text-foreground">Send a message</h3>
        <p className="text-xs text-muted-foreground font-mono mt-1 flex items-center gap-1.5">
          <Mail size={11} className="text-primary" aria-hidden="true" />
          Opens your mail app with everything pre-filled
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormField
          id="contact-name" label="Name" name="name"
          value={formData.name} placeholder="Your name"
          required onChange={handleChange}
        />
        <FormField
          id="contact-email" label="Your Email" type="email" name="email"
          value={formData.email} placeholder="your@email.com"
          required onChange={handleChange}
        />
        <div>
          <label htmlFor="contact-message"
            className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
            Message<span className="text-primary ml-0.5" aria-hidden="true">*</span>
          </label>
          <textarea
            id="contact-message" name="message" rows={5}
            value={formData.message} placeholder="Tell me about your project..."
            required onChange={handleChange}
            className={cn(
              'w-full px-3.5 py-2.5 rounded-xl border border-border bg-surface',
              'text-sm text-foreground placeholder:text-muted-foreground/50',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary/40',
              'transition-colors duration-200 resize-none',
            )}
          />
        </div>

        <button type="submit" className="btn-primary w-full justify-center">
          <Send size={14} aria-hidden="true" />
          Open Mail App
        </button>

        {status === 'success' && (
          <div role="status" className={cn(
            'flex items-start gap-2.5 text-sm rounded-xl px-4 py-3',
            'bg-emerald-400/10 border border-emerald-400/20 text-emerald-400',
          )}>
            <CheckCircle size={15} className="shrink-0 mt-0.5" aria-hidden="true" />
            <span>Your mail app should open with everything filled in. Just hit send — I'll reply within 24 hours!</span>
          </div>
        )}

        {status === 'error' && (
          <div role="alert" className={cn(
            'flex items-start gap-2 text-sm rounded-xl px-4 py-3',
            'bg-red-400/10 border border-red-400/20 text-red-400',
          )}>
            <AlertCircle size={15} className="shrink-0 mt-0.5" aria-hidden="true" />
            <span>Please fill in all fields before sending.</span>
          </div>
        )}
      </form>
    </div>
  )
})

ContactForm.displayName = 'ContactForm'
export default ContactForm
