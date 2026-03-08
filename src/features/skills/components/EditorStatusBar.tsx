import React, { memo } from 'react'

interface EditorStatusBarProps {
  readonly currentLine:  number
  readonly totalLines:   number
  readonly skillCount:   number
}

const EditorStatusBar: React.FC<EditorStatusBarProps> = memo(
  ({ currentLine, totalLines, skillCount }) => (
    <div className="flex items-center justify-between px-4 py-1.5 bg-[#0d0d14] border-t border-[#2a2a3a]">
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono text-[#4a4a5a]">
          Ln {Math.min(currentLine, totalLines)}, Col 1
        </span>
        <span className="text-[10px] font-mono text-[#4a4a5a]">UTF-8</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono text-[#3178c6]">TypeScript</span>
        <span className="text-[10px] font-mono text-[#4a4a5a]">{skillCount} exports</span>
      </div>
    </div>
  )
)

EditorStatusBar.displayName = 'EditorStatusBar'
export default EditorStatusBar
