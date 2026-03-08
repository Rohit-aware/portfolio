import React, { memo } from 'react'

const TerminalBackground: React.FC = memo(() => (
  <>
    {/* CRT Scanline grid */}
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 100, 0.015) 2px,
            rgba(0, 255, 100, 0.015) 4px
          )
        `,
      }}
    />

    {/* Phosphor ambient glow */}
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse 70% 50% at 50% 45%, rgba(0,200,80,0.04) 0%, transparent 70%)',
      }}
    />

    {/* Vignette */}
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.7) 100%)',
      }}
    />
  </>
))

TerminalBackground.displayName = 'TerminalBackground'
export default TerminalBackground
