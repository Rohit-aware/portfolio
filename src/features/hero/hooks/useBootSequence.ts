import { useState, useEffect, useRef } from 'react'
import { BOOT_SEQUENCE } from '@/features/hero/constants/bootSequence'

export interface UseBootSequenceReturn {
  readonly revealedCount: number
  readonly allDone: boolean
  readonly showCommands: boolean
}

/**
 * useBootSequence — drives the line-by-line reveal of the terminal boot sequence.
 * Each line has its own delay so the typing feels natural, not mechanical.
 */
export const useBootSequence = (): UseBootSequenceReturn => {
  const [revealedCount, setRevealedCount] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let i = 0
    const reveal = (): void => {
      i++
      setRevealedCount(i)
      if (i < BOOT_SEQUENCE.length) {
        timerRef.current = setTimeout(reveal, BOOT_SEQUENCE[i]?.delay ?? 200)
      }
    }
    timerRef.current = setTimeout(reveal, 400)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return {
    revealedCount,
    allDone: revealedCount >= BOOT_SEQUENCE.length,
    showCommands: revealedCount >= BOOT_SEQUENCE.length - 1,
  }
}
