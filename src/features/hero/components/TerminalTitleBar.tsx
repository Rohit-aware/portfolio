import React, { memo } from 'react'

const TerminalTitleBar: React.FC = memo(() => (
  <div
    className="flex items-center gap-2 px-4 py-2.5 rounded-t-xl"
    style={{
      background:  '#0f1117',
      borderTop:   '1px solid rgba(0,255,100,0.12)',
      borderLeft:  '1px solid rgba(0,255,100,0.12)',
      borderRight: '1px solid rgba(0,255,100,0.12)',
    }}
  >
    <div className="flex gap-1.5" aria-hidden="true">
      <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
      <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
      <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
    </div>
    <span
      className="flex-1 text-center text-xs font-mono"
      style={{ color: 'rgba(0,255,100,0.35)' }}
    >
      rohit@portfolio ~ zsh
    </span>
  </div>
))

TerminalTitleBar.displayName = 'TerminalTitleBar'
export default TerminalTitleBar
