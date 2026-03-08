import React, { memo } from 'react'
import type { AboutFact } from '../constants/facts'

interface AboutFactCardProps {
  readonly fact: AboutFact
}

const AboutFactCard: React.FC<AboutFactCardProps> = memo(({ fact: { icon: Icon, label, value } }) => (
  <div className="card-glass card-hover p-4 flex gap-3 items-start">
    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
      <Icon size={16} className="text-primary" aria-hidden="true" />
    </div>
    <div>
      <p className="text-xs font-mono text-muted-foreground mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-foreground leading-snug">{value}</p>
    </div>
  </div>
))

AboutFactCard.displayName = 'AboutFactCard'
export default AboutFactCard
