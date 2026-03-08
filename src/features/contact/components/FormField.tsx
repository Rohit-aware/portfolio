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
  readonly onChange:    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const inputClass = cn(
  'w-full px-3.5 py-2.5 rounded-xl border border-border bg-surface',
  'text-sm text-foreground placeholder:text-muted-foreground/50',
  'focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary/40',
  'transition-colors duration-200',
)

const FormField: React.FC<FormFieldProps> = memo(
  ({ id, label, type = 'text', name, value, placeholder, required, onChange }) => (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider"
      >
        {label}
        {required && <span className="text-primary ml-0.5" aria-hidden="true">*</span>}
      </label>
      <input
        id={id} type={type} name={name} value={value}
        placeholder={placeholder} required={required}
        onChange={onChange}
        className={inputClass}
      />
    </div>
  )
)

FormField.displayName = 'FormField'
export default FormField
