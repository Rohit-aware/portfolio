import React, { memo } from 'react'
import EmojiCloud from '@/animations/EmojiCloud'
import { cn } from '@/shared/utils/cn'
import { FLAGS } from '@/config/featureFlags'

const HeroBadge: React.FC = memo(() => (
  <div className="flex items-center gap-3 flex-wrap mb-6 animate-fade-in">
    <div className={cn(
      'inline-flex items-center gap-2 px-3 py-1.5 rounded-full shrink-0',
      'bg-primary/10 border border-primary/20',
    )}>
      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
      <span className="text-xs font-mono font-medium text-primary">Open to work</span>
    </div>
    {FLAGS.HOVER_ME && <EmojiCloud />}
  </div>
))

HeroBadge.displayName = 'HeroBadge'
export default HeroBadge
