import React, { memo } from 'react'
import { MapPin } from 'lucide-react'
import { SITE_META }     from '@/constants/navigation'
import { CONNECT_LINKS } from '@/features/contact/constants/connectLinks'

const ContactInfo: React.FC = memo(() => (
  <div className="flex flex-col gap-4">
    {CONNECT_LINKS.map(({ href, icon: Icon, label, value, external }) => (
      <a
        key={label}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="card-glass card-hover p-4 flex items-center gap-4"
      >
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <Icon size={18} className="text-primary" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-mono text-muted-foreground mb-0.5">{label}</p>
          <p className="text-sm font-semibold text-foreground">{value}</p>
        </div>
      </a>
    ))}

    <div className="card-glass p-4 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
        <MapPin size={18} className="text-primary" aria-hidden="true" />
      </div>
      <div>
        <p className="text-xs font-mono text-muted-foreground mb-0.5">Location</p>
        <p className="text-sm font-semibold text-foreground">{SITE_META.location}</p>
        <p className="text-xs text-muted-foreground mt-0.5">Working in {SITE_META.workLocation}</p>
      </div>
    </div>
  </div>
))

ContactInfo.displayName = 'ContactInfo'
export default ContactInfo
