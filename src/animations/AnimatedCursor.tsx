import React, { useEffect, useRef, useState, memo, useCallback } from 'react'

/**
 * PARTICLE TRAIL CURSOR
 * - Sharp crosshair dot that tracks exactly
 * - 12 glowing colour particles that spawn at cursor and drift up/out
 * - On hover: particles become more vivid, dot becomes a ring
 * - On click: burst of 8 particles explode outward
 * Zero external deps — pure canvas-free DOM particles
 */

interface Pos { x: number; y: number }

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  hue: number
  life: number
  maxLife: number
}

let _pid = 0
const nextId = () => ++_pid

const AnimatedCursor: React.FC = memo(() => {
  const dotRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pos = useRef<Pos>({ x: -400, y: -400 })
  const rafId = useRef<number>(0)
  const particles = useRef<Particle[]>([])
  const lastSpawn = useRef<number>(0)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const isTouch = useRef(false)

  const spawnParticle = useCallback((x: number, y: number, burst = false): void => {
    const count = burst ? 8 : 1
    for (let i = 0; i < count; i++) {
      const angle = burst ? (i / count) * Math.PI * 2 : Math.random() * Math.PI * 2
      const speed = burst ? 2.5 + Math.random() * 3 : 0.4 + Math.random() * 1.2
      particles.current.push({
        id: nextId(),
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (burst ? 0 : 1.5),
        size: burst ? 4 + Math.random() * 3 : 2 + Math.random() * 3,
        alpha: 1,
        hue: 200 + Math.random() * 60,  // sky-blue to purple range
        life: 0,
        maxLife: burst ? 35 : 22 + Math.random() * 14,
      })
    }
    // cap pool
    if (particles.current.length > 80) {
      particles.current = particles.current.slice(-80)
    }
  }, [])

  const renderParticles = useCallback((): void => {
    const container = containerRef.current
    if (!container) return

    // Remove dead DOM particles
    const dead = new Set<number>()
    particles.current.forEach(p => {
      if (p.life >= p.maxLife) dead.add(p.id)
    })
    dead.forEach(id => {
      const el = document.getElementById(`cp-${id}`)
      if (el) container.removeChild(el)
    })
    particles.current = particles.current.filter(p => !dead.has(p.id))

    // Update + create DOM particles
    particles.current.forEach(p => {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.04  // gravity
      p.life += 1
      p.alpha = 1 - p.life / p.maxLife

      let el = document.getElementById(`cp-${p.id}`) as HTMLDivElement | null
      if (!el) {
        el = document.createElement('div')
        el.id = `cp-${p.id}`
        el.className = 'cursor-particle'
        container.appendChild(el)
      }
      el.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: ${p.size}px; height: ${p.size}px;
        border-radius: 50%;
        background: hsl(${p.hue} 90% 65%);
        box-shadow: 0 0 ${p.size * 2}px hsl(${p.hue} 90% 65% / 0.8);
        pointer-events: none;
        z-index: 9998;
        transform: translate(${p.x}px, ${p.y}px) translate(-50%, -50%);
        opacity: ${p.alpha};
        will-change: transform, opacity;
      `
    })
  }, [])

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      isTouch.current = true
      return
    }

    const onMove = (e: MouseEvent): void => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)

      // Spawn trail particle every 30ms
      const now = performance.now()
      if (now - lastSpawn.current > 30) {
        spawnParticle(e.clientX, e.clientY)
        lastSpawn.current = now
      }

      const dot = dotRef.current
      if (dot) {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
    }

    const onClick = (e: MouseEvent): void => spawnParticle(e.clientX, e.clientY, true)
    const onLeave = (): void => setVisible(false)
    const onEnter = (): void => setHovering(true)
    const onOut = (): void => setHovering(false)

    const tick = (): void => {
      renderParticles()
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('click', onClick)
    document.addEventListener('mouseleave', onLeave)

    const targets = document.querySelectorAll<HTMLElement>(
      'a,button,[role="button"],input,textarea,select,label'
    )
    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onOut)
    })

    return () => {
      cancelAnimationFrame(rafId.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
      document.removeEventListener('mouseleave', onLeave)
      targets.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onOut)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Particle container */}
      <div ref={containerRef} aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998 }} />

      {/* Sharp dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: hovering ? '12px' : '6px',
          height: hovering ? '12px' : '6px',
          borderRadius: '50%',
          background: hovering ? 'transparent' : 'hsl(var(--primary))',
          border: hovering ? '2px solid hsl(var(--primary))' : 'none',
          pointerEvents: 'none',
          zIndex: 10000,
          opacity: visible ? 1 : 0,
          willChange: 'transform, width, height',
          boxShadow: `0 0 ${hovering ? 10 : 6}px hsl(var(--primary) / 0.7)`,
          transition: 'width .2s ease, height .2s ease, background .2s ease, border .2s ease, opacity .3s ease, box-shadow .2s ease',
        }}
      />
    </>
  )
})

AnimatedCursor.displayName = 'AnimatedCursor'
export default AnimatedCursor
