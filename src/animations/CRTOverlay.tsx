import React, { memo } from 'react'

const CRTOverlay: React.FC = memo(() => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
  >
    <div className="absolute inset-0 crt-scanlines opacity-[0.035]" />
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.55) 100%)',
      }}
    />
    <div className="absolute inset-0 crt-flicker opacity-[0.018]" />
  </div>
))
CRTOverlay.displayName = 'CRTOverlay'
export default CRTOverlay
