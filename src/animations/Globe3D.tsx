import React, { memo, useRef, useEffect, useCallback } from 'react'

/**
 * Globe3D — animated particle sphere rendered on Canvas.
 * • ~280 dots distributed on a sphere via Fibonacci spiral
 * • Auto-rotates on Y axis; draggable to spin manually
 * • Dots closest to viewer are larger + brighter (depth cue)
 * • Mouse proximity causes nearest dots to scatter outward
 * • All rendering in requestAnimationFrame — zero DOM thrashing
 * • No external libraries — pure canvas 2D projection
 */

interface Point3D { x: number; y: number; z: number; ox: number; oy: number; oz: number }

const DOT_COUNT  = 280
const RADIUS     = 160
const SCATTER_R  = 80   // px — mouse scatter radius

const fibonacciSphere = (n: number, r: number): Point3D[] => {
  const pts: Point3D[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y   = 1 - (i / (n - 1)) * 2
    const rad = Math.sqrt(1 - y * y)
    const theta = golden * i
    const x = Math.cos(theta) * rad
    const z = Math.sin(theta) * rad
    pts.push({ x: x * r, y: y * r, z: z * r, ox: x * r, oy: y * r, oz: z * r })
  }
  return pts
}

const Globe3D: React.FC = memo(() => {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const pointsRef  = useRef<Point3D[]>(fibonacciSphere(DOT_COUNT, RADIUS))
  const rotY       = useRef(0)
  const rotX       = useRef(0.18)
  const velY       = useRef(0.003)
  const velX       = useRef(0)
  const drag       = useRef<{ active: boolean; lastX: number; lastY: number }>({ active: false, lastX: 0, lastY: 0 })
  const mouse      = useRef<{ x: number; y: number } | null>(null)
  const rafId      = useRef<number>(0)

  const getColor = useCallback((isDark: boolean): string =>
    isDark ? '130, 200, 255' : '14, 100, 170', [])

  const draw = useCallback((): void => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w  = canvas.width
    const h  = canvas.height
    const cx = w / 2
    const cy = h / 2

    ctx.clearRect(0, 0, w, h)

    const cosY = Math.cos(rotY.current), sinY = Math.sin(rotY.current)
    const cosX = Math.cos(rotX.current), sinX = Math.sin(rotX.current)
    const isDark = document.documentElement.classList.contains('dark')
    const rgb = getColor(isDark)

    const projected: Array<{ sx: number; sy: number; depth: number; idx: number }> = []

    pointsRef.current.forEach((p, idx) => {
      // Rotate Y
      const x1 =  p.x * cosY + p.z * sinY
      const z1 = -p.x * sinY + p.z * cosY
      // Rotate X
      const y2 =  p.y * cosX - z1 * sinX
      const z2 =  p.y * sinX + z1 * cosX

      const fov    = RADIUS * 2.2
      const scale  = fov / (fov + z2)
      const sx     = cx + x1  * scale
      const sy     = cy + y2  * scale
      const depth  = (z2 + RADIUS) / (RADIUS * 2)  // 0 (back) → 1 (front)

      projected.push({ sx, sy, depth, idx })
    })

    // Sort back-to-front for correct overlap
    projected.sort((a, b) => a.depth - b.depth)

    projected.forEach(({ sx, sy, depth, idx }) => {
      const r     = 1.2 + depth * 2.4
      const alpha = 0.15 + depth * 0.85

      // Scatter from mouse
      let drawX = sx
      let drawY = sy

      if (mouse.current) {
        const mx = mouse.current.x
        const my = mouse.current.y
        const dx = sx - mx
        const dy = sy - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < SCATTER_R) {
          const force  = (SCATTER_R - dist) / SCATTER_R
          drawX += dx * force * 0.4
          drawY += dy * force * 0.4
        }
      }

      ctx.beginPath()
      ctx.arc(drawX, drawY, r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${rgb}, ${alpha})`
      ctx.fill()

      // Draw connecting lines to nearby points for front-facing dots
      if (depth > 0.72) {
        for (let j = idx + 1; j < idx + 6 && j < pointsRef.current.length; j++) {
          const q = projected[j]
          if (!q) continue
          const dx = drawX - q.sx
          const dy = drawY - q.sy
          if (Math.abs(dx) < 28 && Math.abs(dy) < 28) {
            const lineDist  = Math.sqrt(dx * dx + dy * dy)
            const lineAlpha = (1 - lineDist / 28) * depth * 0.12
            ctx.beginPath()
            ctx.moveTo(drawX, drawY)
            ctx.lineTo(q.sx, q.sy)
            ctx.strokeStyle = `rgba(${rgb}, ${lineAlpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    })
  }, [getColor])

  const tick = useCallback((): void => {
    if (!drag.current.active) {
      rotY.current += velY.current
      rotX.current += velX.current
      velX.current *= 0.98
    }
    draw()
    rafId.current = requestAnimationFrame(tick)
  }, [draw])

  useEffect(() => {
    rafId.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId.current)
  }, [tick])

  const handleMouseDown = useCallback((e: React.MouseEvent): void => {
    drag.current = { active: true, lastX: e.clientX, lastY: e.clientY }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent): void => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }

    if (drag.current.active) {
      const dx = e.clientX - drag.current.lastX
      const dy = e.clientY - drag.current.lastY
      rotY.current += dx * 0.008
      velX.current  = dy * 0.005
      drag.current.lastX = e.clientX
      drag.current.lastY = e.clientY
    }
  }, [])

  const handleMouseUp   = useCallback((): void => { drag.current.active = false }, [])
  const handleMouseLeave = useCallback((): void => { drag.current.active = false; mouse.current = null }, [])

  return (
    <div
      aria-label="Interactive 3D skill globe — drag to rotate"
      className="relative flex items-center justify-center"
      style={{ width: 380, height: 380, maxWidth: '100%' }}
    >
      {/* Ambient glow behind globe */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle at 40% 35%, hsl(var(--primary)) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      <canvas
        ref={canvasRef}
        width={380}
        height={380}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'grab' }}
        className="relative z-10 rounded-full"
      />

      {/* Center label */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="text-center">
          <p className="text-xs font-mono text-muted-foreground/40 tracking-widest">drag to rotate</p>
        </div>
      </div>
    </div>
  )
})

Globe3D.displayName = 'Globe3D'
export default Globe3D
