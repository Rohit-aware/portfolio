import React, { memo } from 'react'
import { cn } from '@/shared/utils/cn'
import { VSCODE_TOKENS } from '@/features/skills/constants/terminal'

export interface CodeLineProps {
  readonly lineNum:  number
  readonly children: React.ReactNode
  readonly visible:  boolean
}

const CodeLine: React.FC<CodeLineProps> = memo(({ lineNum, children, visible }) => (
  <div className={cn('flex gap-0 group transition-opacity duration-150', visible ? 'opacity-100' : 'opacity-0')}>
    <span
      className={cn('select-none w-10 text-right pr-4 shrink-0 text-xs', VSCODE_TOKENS.lineNum)}
      aria-hidden="true"
    >
      {lineNum}
    </span>
    <span className="text-xs font-mono leading-6 flex-1">{children}</span>
  </div>
))

CodeLine.displayName = 'CodeLine'
export default CodeLine
