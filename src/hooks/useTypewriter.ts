import { useState, useEffect, useCallback } from 'react'

/**
 * useTypewriter — character scramble reveal.
 *
 * Each character cycles through random glyphs before "snapping" to
 * the correct letter. Creates a hacker/matrix-style decode effect.
 * Enterprise pattern: pure hook, zero DOM side-effects, fully testable.
 *
 * @param text      - target string to reveal
 * @param startDelay - ms to wait before starting (default 200)
 * @param charDelay  - ms between each character starting its decode (default 60)
 * @param scrambles  - how many random chars each letter shows before settling (default 8)
 */

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&'

const randomGlyph = (): string =>
  GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? 'X'

interface TypewriterState {
  readonly display:  string   // current rendered string (mix of real + scrambled)
  readonly isDone:   boolean  // all chars settled
}

export const useTypewriter = (
  text: string,
  startDelay  = 200,
  charDelay   = 55,
  scrambles   = 9,
): TypewriterState => {
  // settled[i] = true once character i has finalised
  const [settled,  setSettled]  = useState<boolean[]>(() => new Array(text.length).fill(false))
  const [scrambled, setScrambled] = useState<string[]>(() => new Array(text.length).fill(' '))
  const [started, setStarted]   = useState(false)

  const reset = useCallback((): void => {
    setSettled(new Array(text.length).fill(false))
    setScrambled(new Array(text.length).fill(' '))
    setStarted(false)
  }, [text.length])

  useEffect(() => {
    reset()
    const t = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(t)
  }, [text, startDelay, reset])

  useEffect(() => {
    if (!started) return

    const timers: ReturnType<typeof setTimeout>[] = []
    const rafs:   number[] = []

    text.split('').forEach((char, idx) => {
      // Don't scramble spaces
      if (char === ' ') {
        const t = setTimeout(() => {
          setSettled(prev => {
            const next = [...prev]; next[idx] = true; return next
          })
          setScrambled(prev => {
            const next = [...prev]; next[idx] = ' '; return next
          })
        }, idx * charDelay)
        timers.push(t)
        return
      }

      let count = 0
      const startTime = idx * charDelay

      const tick = (): void => {
        if (count < scrambles) {
          setScrambled(prev => {
            const next = [...prev]; next[idx] = randomGlyph(); return next
          })
          count++
          const raf = requestAnimationFrame(tick)
          rafs.push(raf)
        } else {
          setSettled(prev => {
            const next = [...prev]; next[idx] = true; return next
          })
          setScrambled(prev => {
            const next = [...prev]; next[idx] = char; return next
          })
        }
      }

      const t = setTimeout(() => requestAnimationFrame(tick), startTime)
      timers.push(t)
    })

    return () => {
      timers.forEach(clearTimeout)
      rafs.forEach(cancelAnimationFrame)
    }
  }, [started, text, charDelay, scrambles])

  const display = text.split('').map((char, i) =>
    settled[i] ? char : (scrambled[i] ?? ' ')
  ).join('')

  const isDone = settled.every(Boolean)

  return { display, isDone }
}
