import React, { memo, useRef, useEffect, useCallback } from 'react'

/**
 * 3D FLOATING PHONE MOCKUP
 * - CSS perspective 3D with rotateX/rotateY
 * - Follows mouse position with damped spring
 * - Idle: continuous float + gentle rotation animation
 * - Shows a glowing app screen with mock UI
 * - Pure CSS 3D — zero deps
 */

const Phone3D: React.FC = memo(() => {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const target   = useRef({ rx: 4, ry: -8 })
  const current  = useRef({ rx: 4, ry: -8 })
  const rafId    = useRef<number>(0)
  const isHover  = useRef(false)

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t

  const onMouseMove = useCallback((e: MouseEvent): void => {
    const wrap = wrapRef.current
    if (!wrap) return
    const rect  = wrap.getBoundingClientRect()
    const cx    = rect.left + rect.width  / 2
    const cy    = rect.top  + rect.height / 2
    const dx    = (e.clientX - cx) / (rect.width  / 2)  // -1 to 1
    const dy    = (e.clientY - cy) / (rect.height / 2)  // -1 to 1
    target.current = { rx: dy * -18, ry: dx * 20 }
  }, [])

  const onMouseEnter = useCallback((): void => { isHover.current = true  }, [])
  const onMouseLeave = useCallback((): void => {
    isHover.current = false
    target.current  = { rx: 4, ry: -8 }
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const tick = (): void => {
      const phone = phoneRef.current
      if (phone) {
        // Slow lerp for damped spring feel
        const t = isHover.current ? 0.08 : 0.03
        current.current.rx = lerp(current.current.rx, target.current.rx, t)
        current.current.ry = lerp(current.current.ry, target.current.ry, t)

        if (isHover.current) {
          phone.style.animation = 'none'
          phone.style.transform =
            `rotateX(${current.current.rx}deg) rotateY(${current.current.ry}deg)`
        } else {
          phone.style.animation = ''
          phone.style.transform = ''
        }
      }
      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)
    wrap.addEventListener('mousemove',  onMouseMove)
    wrap.addEventListener('mouseenter', onMouseEnter)
    wrap.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(rafId.current)
      wrap.removeEventListener('mousemove',  onMouseMove)
      wrap.removeEventListener('mouseenter', onMouseEnter)
      wrap.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [onMouseMove, onMouseEnter, onMouseLeave])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="phone-wrapper w-full flex items-center justify-center"
      style={{ height: 440 }}
    >
      {/* Ambient glow behind phone */}
      <div
        style={{
          position: 'absolute',
          width: 220, height: 220,
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.25) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          animation: 'phoneFloat 5s ease-in-out infinite',
        }}
      />

      {/* Phone body */}
      <div
        ref={phoneRef}
        className="phone-3d phone-float relative"
        style={{
          width: 180,
          height: 360,
          borderRadius: 28,
          background: 'linear-gradient(145deg, hsl(215 22% 14%), hsl(215 22% 10%))',
          border: '2px solid hsl(var(--border))',
          boxShadow: `
            0 30px 80px hsl(0 0% 0% / 0.5),
            0 0 0 1px hsl(var(--border)),
            inset 0 1px 0 hsl(215 22% 22%),
            0 0 60px hsl(var(--primary) / 0.1)
          `,
        }}
      >
        {/* Side buttons */}
        <div style={{
          position: 'absolute', right: -4, top: 80,
          width: 3, height: 28, borderRadius: 2,
          background: 'hsl(var(--border))',
        }} />
        <div style={{
          position: 'absolute', left: -4, top: 70,
          width: 3, height: 18, borderRadius: 2,
          background: 'hsl(var(--border))',
        }} />
        <div style={{
          position: 'absolute', left: -4, top: 96,
          width: 3, height: 18, borderRadius: 2,
          background: 'hsl(var(--border))',
        }} />

        {/* Notch */}
        <div style={{
          position: 'absolute', top: 10, left: '50%',
          transform: 'translateX(-50%)',
          width: 60, height: 18, borderRadius: 10,
          background: 'hsl(215 25% 7%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'hsl(215 22% 18%)' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'hsl(215 22% 15%)' }} />
        </div>

        {/* Screen */}
        <div style={{
          position: 'absolute',
          top: 12, bottom: 12, left: 8, right: 8,
          borderRadius: 22,
          background: 'linear-gradient(160deg, hsl(215 30% 9%), hsl(220 28% 7%))',
          overflow: 'hidden',
        }}>
          {/* Screen glow */}
          <div className="phone-screen-glow" />

          {/* Mock app UI */}
          <div style={{ padding: '28px 12px 12px', display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
            {/* Status bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 7, color: 'hsl(var(--muted-foreground))', fontFamily: 'monospace' }}>9:41</span>
              <div style={{ display: 'flex', gap: 3 }}>
                {[10, 14, 18].map((h, i) => (
                  <div key={i} style={{ width: 3, height: h, background: 'hsl(var(--muted-foreground))', borderRadius: 1 }} />
                ))}
                <div style={{ width: 16, height: 8, border: '1px solid hsl(var(--border))', borderRadius: 2, marginLeft: 2, display: 'flex', alignItems: 'center', padding: '0 1px' }}>
                  <div style={{ width: '70%', height: 4, background: 'hsl(var(--primary))', borderRadius: 1 }} />
                </div>
              </div>
            </div>

            {/* App header */}
            <div style={{ marginTop: 4 }}>
              <div style={{ width: 60, height: 5, background: 'hsl(var(--primary)/0.4)', borderRadius: 3, marginBottom: 4 }} />
              <div style={{ width: 110, height: 8, background: 'hsl(var(--foreground)/0.15)', borderRadius: 3 }} />
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
              {['hsl(var(--primary)/0.8)', 'hsl(220 75% 60%/0.8)', 'hsl(235 68% 60%/0.8)'].map((bg, i) => (
                <div key={i} style={{
                  flex: 1, height: 38, borderRadius: 8,
                  background: bg.replace('0.8', '0.12'),
                  border: `1px solid ${bg.replace('0.8', '0.25')}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
                }}>
                  <div style={{ width: 20, height: 6, background: bg, borderRadius: 3 }} />
                  <div style={{ width: 28, height: 3, background: 'hsl(var(--muted-foreground)/0.3)', borderRadius: 2 }} />
                </div>
              ))}
            </div>

            {/* List items */}
            {[0.9, 0.7, 0.5, 0.35].map((op, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '5px 6px',
                background: 'hsl(var(--surface)/0.5)', borderRadius: 8,
                border: '1px solid hsl(var(--border)/0.5)',
              }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 6,
                  background: `hsl(var(--primary) / ${op * 0.3})`,
                  border: `1px solid hsl(var(--primary) / ${op * 0.4})`,
                  flexShrink: 0,
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ width: `${55 + i * 8}%`, height: 4, background: `hsl(var(--foreground)/${op * 0.2})`, borderRadius: 2, marginBottom: 3 }} />
                  <div style={{ width: `${35 + i * 5}%`, height: 3, background: `hsl(var(--muted-foreground)/${op * 0.2})`, borderRadius: 2 }} />
                </div>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: `hsl(var(--primary)/${op * 0.5})` }} />
              </div>
            ))}

            {/* Bottom nav */}
            <div style={{
              marginTop: 'auto',
              display: 'flex', justifyContent: 'space-around',
              padding: '6px 0',
              borderTop: '1px solid hsl(var(--border)/0.4)',
            }}>
              {['hsl(var(--primary))', 'hsl(var(--muted-foreground)/0.4)', 'hsl(var(--muted-foreground)/0.4)', 'hsl(var(--muted-foreground)/0.4)'].map((c, i) => (
                <div key={i} style={{
                  width: 22, height: 22, borderRadius: 6,
                  background: i === 0 ? 'hsl(var(--primary)/0.15)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ width: 12, height: 12, borderRadius: i === 0 ? 4 : '50%', background: c }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Home indicator */}
        <div style={{
          position: 'absolute', bottom: 6, left: '50%',
          transform: 'translateX(-50%)',
          width: 50, height: 3, borderRadius: 2,
          background: 'hsl(var(--border))',
        }} />
      </div>
    </div>
  )
})

Phone3D.displayName = 'Phone3D'
export default Phone3D
