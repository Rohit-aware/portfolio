import React, { memo } from 'react'
import { scrollToSection } from '@/shared/utils/scroll'
import { downloadResume } from '@/shared/utils/resume'
import { TERMINAL_COMMANDS } from '@/features/hero/constants/commands'
import { cn } from '@/shared/utils/cn'

interface TerminalCommandBarProps {
  readonly visible: boolean
}

const cmdBase = 'px-3 py-1.5 rounded font-mono text-xs transition-all duration-150'

const TerminalCommandBar: React.FC<TerminalCommandBarProps> = memo(({ visible }) => {
  if (!visible) return null

  return (
    <div
      className={cn('mt-6 flex flex-wrap gap-2 animate-fade-in-up')}
      role="navigation"
      aria-label="Quick navigation commands"
    >
      {TERMINAL_COMMANDS.map(({ label, section }) => (
        <button
          key={section}
          onClick={() => scrollToSection(section)}
          className={cmdBase}
          style={{
            background:  'rgba(0,255,100,0.06)',
            border:      '1px solid rgba(0,255,100,0.2)',
            color:       '#a3e635',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget
            el.style.background  = 'rgba(0,255,100,0.12)'
            el.style.borderColor = 'rgba(0,255,100,0.5)'
            el.style.boxShadow   = '0 0 12px rgba(0,255,100,0.15)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget
            el.style.background  = 'rgba(0,255,100,0.06)'
            el.style.borderColor = 'rgba(0,255,100,0.2)'
            el.style.boxShadow   = 'none'
          }}
        >
          {label}
        </button>
      ))}

      <button
        onClick={downloadResume}
        className={cmdBase}
        style={{
          background: 'rgba(163,230,53,0.1)',
          border:     '1px solid rgba(163,230,53,0.35)',
          color:      '#a3e635',
          fontWeight: 700,
        }}
        onMouseEnter={e => {
          const el = e.currentTarget
          el.style.background = 'rgba(163,230,53,0.18)'
          el.style.boxShadow  = '0 0 16px rgba(163,230,53,0.2)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget
          el.style.background = 'rgba(163,230,53,0.1)'
          el.style.boxShadow  = 'none'
        }}
      >
        ./resume ↓
      </button>
    </div>
  )
})

TerminalCommandBar.displayName = 'TerminalCommandBar'
export default TerminalCommandBar
