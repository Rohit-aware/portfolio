import { useState, useEffect, useRef } from 'react'

/**
 * useLineReveal — drives line-by-line typewriter reveal in the VS Code terminal.
 * Resets and replays whenever the active file (fileKey) changes.
 */
export const useLineReveal = (fileKey: string, lineCount: number): number => {
  const [revealed, setRevealed] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setRevealed(0)
    let i = 0
    const step = (): void => {
      i++
      setRevealed(i)
      if (i < lineCount) {
        timerRef.current = setTimeout(step, 22)
      }
    }
    timerRef.current = setTimeout(step, 80)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [fileKey, lineCount])

  return revealed
}
