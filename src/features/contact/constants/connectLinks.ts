import { Mail, Linkedin, Github } from 'lucide-react'
import { SITE_META } from '@/constants/navigation'

export interface ConnectLink {
  readonly href:     string
  readonly icon:     typeof Mail
  readonly label:    string
  readonly value:    string
  readonly external: boolean
}

export const CONNECT_LINKS: readonly ConnectLink[] = [
  { href: `mailto:${SITE_META.email}`, icon: Mail,    label: 'Email',    value: SITE_META.email,                external: false },
  { href: SITE_META.linkedIn,          icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/rohitaware',   external: true  },
  { href: SITE_META.github,            icon: Github,   label: 'GitHub',   value: 'github.com/rohitaware',        external: true  },
] as const
