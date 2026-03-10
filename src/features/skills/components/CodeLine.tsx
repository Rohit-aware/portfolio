import React, { memo } from 'react'
import { cn } from '@/shared/utils/cn'
import { VSCODE_TOKENS } from '@/features/skills/constants/terminal'

export interface CodeLineProps {
  readonly lineNum: number
  readonly children: React.ReactNode
  readonly visible: boolean
}

const CodeLine: React.FC<CodeLineProps> = memo(({ lineNum, children, visible }) => (
  <div className={cn('flex gap-0 group transition-opacity duration-150 min-w-0', visible ? 'opacity-100' : 'opacity-0')}>
    {/* Line number gutter */}
    <span
      className={cn('select-none w-8 sm:w-10 text-right pr-2 sm:pr-4 shrink-0 text-xs', VSCODE_TOKENS.lineNum)}
      aria-hidden="true"
    >
      {lineNum}
    </span>
    {/* Code — truncated so nothing pushes the editor wider than its container */}
    <span className="text-xs font-mono leading-6 flex-1 min-w-0 truncate">
      {children}
    </span>
  </div>
))

CodeLine.displayName = 'CodeLine'
export default CodeLine
