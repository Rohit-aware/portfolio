import { Smartphone, Zap, Shield, Linkedin, Github, Mail } from 'lucide-react'
import { SITE_META } from '@/constants/navigation'

export interface HeroStat {
  readonly value: string
  readonly label: string
}

export interface HeroHighlight {
  readonly icon: typeof Smartphone
  readonly text: string
  readonly sub: string
  readonly show: boolean
}

export interface SocialLink {
  readonly href: string
  readonly icon: typeof Linkedin
  readonly label: string
  readonly external: boolean
}

export const HERO_STATS: readonly HeroStat[] = [
  { value: '5+', label: 'Apps' },
  { value: '3', label: 'Migrations' },
  { value: '3+', label: 'Years Experience' },
] as const

export const HERO_HIGHLIGHTS: readonly HeroHighlight[] = [
  { icon: Smartphone, text: 'React Native', sub: 'iOS & Android', show: true },
  { icon: Zap, text: 'New Arch', sub: 'Fabric + Turbo', show: true },
  { icon: Shield, text: 'VAPT Cert', sub: 'Banking security', show: false },
] as const

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { href: SITE_META.linkedIn, icon: Linkedin, label: 'LinkedIn', external: true },
  { href: SITE_META.github, icon: Github, label: 'GitHub', external: true },
  { href: `mailto:${SITE_META.email}`, icon: Mail, label: 'Email', external: false },
] as const
