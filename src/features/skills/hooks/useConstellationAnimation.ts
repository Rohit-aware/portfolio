import { useState, useEffect, useRef, useCallback } from 'react'
import { BASE_SPEED, RING_RADII, RING_SPEED, CX, CY } from '../constants/constellationConfig'
import type { SkillNode } from './types'

interface UseConstellationAnimationReturn {
  readonly getPos:      (node: SkillNode) => { x: number; y: number }
  readonly handleEnter: (node: SkillNode, x: number, y: number) => void
  readonly handleLeave: () => void
  readonly floatTip:    FloatTooltip | null
}

export interface FloatTooltip {
  readonly node: SkillNode
  readonly svgX: number
  readonly svgY: number
}

export const useConstellationAnimation = (): UseConstellationAnimationReturn => {
  const [floatTip,   setFloatTip]   = useState<FloatTooltip | null>(null)
  const rotationRef  = useRef<number>(0)
  const isPausedRef  = useRef<boolean>(false)
  const rafRef       = useRef<number>(0)
  const lastTimeRef  = useRef<number>(0)
  const [, setTick]  = useState(0)

  useEffect(() => {
    const loop = (now: number): void => {
      if (lastTimeRef.current === 0) lastTimeRef.current = now
      const dt = Math.min(now - lastTimeRef.current, 32)
      lastTimeRef.current = now
      if (!isPausedRef.current) {
        rotationRef.current += dt * BASE_SPEED
        setTick(t => t + 1)
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const getPos = useCallback((node: SkillNode) => {
    const r   = RING_RADII[node.ring] ?? 88
    const spd = RING_SPEED[node.ring] ?? 1
    const ang = node.angle + rotationRef.current * spd
    return { x: CX + r * Math.cos(ang), y: CY + r * Math.sin(ang) }
  }, [])

  const handleEnter = useCallback((node: SkillNode, x: number, y: number): void => {
    isPausedRef.current = true
    setFloatTip({ node, svgX: x, svgY: y })
  }, [])

  const handleLeave = useCallback((): void => {
    isPausedRef.current = false
    lastTimeRef.current = 0
    setFloatTip(null)
  }, [])

  return { getPos, handleEnter, handleLeave, floatTip }
}
