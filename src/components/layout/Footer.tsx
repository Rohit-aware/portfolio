import React, { memo } from 'react'
import { Linkedin, Github, Mail, MapPin } from 'lucide-react'
import { SITE_META } from '@/constants/navigation'
import { scrollToSection } from '@/shared/utils/scroll'

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Experience', 'Contact'] as const

const Footer: React.FC = memo(() => {
  const year = new Date().getFullYear()

  return (
    <footer aria-label="Site footer" className="border-t border-border bg-card">
      <div className="section-container py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-8 h-8 rounded-xl bg-primary/12 border border-primary/25
                               flex items-center justify-center text-primary text-xs font-bold">
                RA
              </span>
              <span className="font-bold text-foreground">
                Rohit<span className="text-primary">.</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              React Native Developer · Pune / Mumbai
            </p>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
              <MapPin size={10} className="text-primary" aria-hidden="true" />
              {SITE_META.location}
            </div>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
              Navigate
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map(label => (
                <li key={label}>
                  <button
                    onClick={() => scrollToSection(label.toLowerCase())}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
              Connect
            </p>
            <div className="space-y-2">
              {[
                { href: `mailto:${SITE_META.email}`, icon: Mail,    label: 'Email'    },
                { href: SITE_META.linkedIn,          icon: Linkedin, label: 'LinkedIn' },
                { href: SITE_META.github,            icon: Github,   label: 'GitHub'   },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-2 text-sm text-muted-foreground
                             hover:text-primary transition-colors">
                  <Icon size={13} aria-hidden="true" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row
                        items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {year} {SITE_META.name}. All rights reserved.</span>
          <span className="font-mono opacity-60">
            React · TypeScript · Vite · Tailwind
          </span>
        </div>
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'
export default Footer
