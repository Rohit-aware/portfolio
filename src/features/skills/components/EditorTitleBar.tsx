import React, { memo } from 'react'
import type { EditorFile } from '../constants/terminal'

interface EditorTitleBarProps {
  readonly activeFile: EditorFile
}

const EditorTitleBar: React.FC<EditorTitleBarProps> = memo(({ activeFile }) => (
  <div className="flex items-center gap-3 px-4 py-3 border-b border-[#2a2a3a] bg-[#0d0d14]">
    <div className="flex items-center gap-1.5" aria-hidden="true">
      <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
      <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
      <div className="w-3 h-3 rounded-full bg-[#28c840]" />
    </div>
    <div className="flex-1 text-center">
      <span className="text-xs font-mono text-[#6a6a7a]">
        rohit-aware / skills /&nbsp;
        <span className="text-[#9cdcfe]">{activeFile.name}</span>
      </span>
    </div>
    <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#3178c6]/15 border border-[#3178c6]/25">
      <span className="text-[10px] font-mono font-bold text-[#3178c6]">TS</span>
    </div>
  </div>
))

EditorTitleBar.displayName = 'EditorTitleBar'
export default EditorTitleBar
