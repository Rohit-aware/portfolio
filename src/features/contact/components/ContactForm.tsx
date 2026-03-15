import React, { memo } from 'react'
import { Mail, Send, CheckCircle } from 'lucide-react'
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
          error={status === 'error' && !formData.name.trim()}
        />
        <FormField
          id="contact-email" label="Your Email" type="email" name="email"
          value={formData.email} placeholder="your@email.com"
          required onChange={handleChange}
          error={status === 'error' && !formData.email.trim()}
        />
        <div>
          <label htmlFor="contact-message"
            className={cn(
              "block text-xs font-mono mb-1.5 uppercase tracking-wider transition-colors",
              status === 'error' && !formData.message.trim() ? "text-red-500 dark:text-red-400" : "text-muted-foreground"
            )}>
            Message<span className={cn("ml-0.5", status === 'error' && !formData.message.trim() ? "text-red-500 dark:text-red-400" : "text-primary")} aria-hidden="true">*</span>
          </label>
          <textarea
            id="contact-message" name="message" rows={5}
            value={formData.message} placeholder="Tell me about your project..."
            required onChange={handleChange}
            className={cn(
              'w-full px-3.5 py-2.5 rounded-xl border bg-surface',
              'text-sm text-foreground placeholder:text-muted-foreground/50',
              'focus:outline-none focus:ring-2 transition-all duration-200 resize-none',
              status === 'error' && !formData.message.trim()
                ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/40 dark:focus:border-red-500'
                : 'border-border focus:border-primary/40 focus:ring-ring'
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
      </form>
    </div>
  )
})

ContactForm.displayName = 'ContactForm'
export default ContactForm
