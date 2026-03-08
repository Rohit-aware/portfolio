import React, { memo } from 'react'
import { EDITOR_FILES } from '../constants/terminal'
import type { EditorFile } from '../constants/terminal'
import { cn } from '@/shared/utils/cn'

interface EditorTabBarProps {
  readonly activeFile: EditorFile
  readonly onSelect:   (f: EditorFile) => void
}

const EditorTabBar: React.FC<EditorTabBarProps> = memo(({ activeFile, onSelect }) => (
  <div
    className="flex items-end border-b border-[#2a2a3a] bg-[#0d0d14] overflow-x-auto"
    role="tablist"
    aria-label="Skill category files"
  >
    {EDITOR_FILES.map(f => (
      <button
        key={f.name}
        role="tab"
        aria-selected={activeFile.name === f.name}
        onClick={() => onSelect(f)}
        className={cn(
          'flex items-center gap-2 px-4 py-2.5 text-xs font-mono shrink-0',
          'border-r border-[#2a2a3a] transition-all duration-200',
          'focus-visible:outline-none',
          activeFile.name === f.name
            ? 'bg-[#0d1117] text-[#d4d4d4] border-t border-t-[#569cd6]'
            : 'bg-[#0d0d14] text-[#6a6a7a] hover:text-[#9cdcfe] hover:bg-[#0d1117]/60',
        )}
      >
        <span aria-hidden="true">{f.icon}</span>
        {f.name}
        {activeFile.name === f.name && (
          <span className="w-1.5 h-1.5 rounded-full bg-primary ml-1" aria-hidden="true" />
        )}
      </button>
    ))}
  </div>
))

EditorTabBar.displayName = 'EditorTabBar'
export default EditorTabBar
