import React, { memo } from 'react'
import { cn } from '@/shared/utils/cn'

export interface FormFieldProps {
  readonly id:          string
  readonly label:       string
  readonly type?:       string
  readonly name:        string
  readonly value:       string
  readonly placeholder: string
  readonly required?:   boolean
  readonly error?:      boolean
  readonly onChange:    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const FormField: React.FC<FormFieldProps> = memo(
  ({ id, label, type = 'text', name, value, placeholder, required, error, onChange }) => (
    <div>
      <label
        htmlFor={id}
        className={cn(
          "block text-xs font-mono mb-1.5 uppercase tracking-wider transition-colors",
          error ? "text-red-500 dark:text-red-400" : "text-muted-foreground"
        )}
      >
        {label}
        {required && <span className={cn("ml-0.5", error ? "text-red-500 dark:text-red-400" : "text-primary")} aria-hidden="true">*</span>}
      </label>
      <input
        id={id} type={type} name={name} value={value}
        placeholder={placeholder} required={required}
        onChange={onChange}
        className={cn(
          'w-full px-3.5 py-2.5 rounded-xl border bg-surface',
          'text-sm text-foreground placeholder:text-muted-foreground/50',
          'focus:outline-none focus:ring-2 transition-all duration-200',
          error 
            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/40 dark:focus:border-red-500' 
            : 'border-border focus:border-primary/40 focus:ring-ring'
        )}
      />
    </div>
  )
)

FormField.displayName = 'FormField'
export default FormField
