import React, { memo } from 'react'
import { BOOT_SEQUENCE } from '@/features/hero/constants/bootSequence'
import TypedLine from '@/features/hero/components/TypedLine'
import TerminalCommandBar from '@/features/hero/components/TerminalCommandBar'

interface TerminalWindowProps {
  readonly revealedCount: number
  readonly allDone: boolean
  readonly showCommands: boolean
}

const TerminalWindow: React.FC<TerminalWindowProps> = memo(
  ({ revealedCount, allDone, showCommands }) => (
    <div
      className="relative z-10 w-full max-w-3xl mx-auto px-4"
      role="region"
      aria-label="Terminal boot sequence"
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 rounded-t-xl"
        style={{
          background: '#0f1117',
          borderTop: '1px solid rgba(0,255,100,0.12)',
          borderLeft: '1px solid rgba(0,255,100,0.12)',
          borderRight: '1px solid rgba(0,255,100,0.12)',
        }}
      >
        <div className="flex gap-1.5 shrink-0" aria-hidden="true">
          <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        </div>
        <span
          className="flex-1 text-center text-xs font-mono truncate"
          style={{ color: 'rgba(0,255,100,0.35)' }}
        >
          rohit@portfolio ~ zsh
        </span>
      </div>

      {/* Terminal body
          overflow-x: auto lets long lines scroll inside the terminal box
          instead of pushing the page width.
          white-space: pre on each line is set in TypedLine.
      */}
      <div
        className="px-3 py-4 sm:px-5 sm:py-5 rounded-b-xl overflow-x-auto no-scrollbar"
        style={{
          background: '#020408',
          border: '1px solid rgba(0,255,100,0.12)',
          borderTop: 'none',
          minHeight: 380,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: 12,
          lineHeight: 1.65,
        }}
      >
        {BOOT_SEQUENCE.map((line, i) => (
          <TypedLine
            key={i}
            text={line.text}
            colour={line.colour}
            bold={line.bold}
            done={i < revealedCount}
            isLast={allDone && i === BOOT_SEQUENCE.length - 1}
          />
        ))}
        <TerminalCommandBar visible={showCommands} />
      </div>
    </div>
  )
)

TerminalWindow.displayName = 'TerminalWindow'
export default TerminalWindow
