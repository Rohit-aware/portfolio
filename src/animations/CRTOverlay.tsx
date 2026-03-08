import React, { memo } from 'react'

/**
 * CRTOverlay — CSS-only CRT monitor effect layer.
 * Renders scanlines, vignette, and phosphor glow.
 * pointer-events:none — purely decorative, never blocks interaction.
 * aria-hidden — no semantic meaning.
 */
const CRTOverlay: React.FC = memo(() => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
    {/* Scanlines */}
    <div className="absolute inset-0 crt-scanlines opacity-[0.035]" />
    {/* Vignette */}
    <div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.55) 100%)',
      }}
    />
    {/* Phosphor flicker — very subtle */}
    <div className="absolute inset-0 crt-flicker opacity-[0.018]" />
  </div>
))
CRTOverlay.displayName = 'CRTOverlay'
export default CRTOverlay
