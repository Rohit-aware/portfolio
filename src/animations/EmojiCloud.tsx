import React, { memo, useState, useCallback, useRef } from 'react'

/**
 * EMOJI CLOUD
 * Floating emoji particles pop out of a cloud button.
 * Triggered on hover or click. Tech-themed emojis.
 * Lives in /animations — isolated animation concern.
 */

const EMOJIS = ['💻','📱','⚛️','🚀','🎯','✨','🔥','⚡','🛠️','🧩','🎨','📦'] as const

interface EmojiParticle {
  id:    number
  emoji: string
  x:     number   // % offset from center
  dur:   number   // animation duration s
  delay: number
}

let _eid = 0

const EmojiCloud: React.FC = memo(() => {
  const [particles, setParticles] = useState<EmojiParticle[]>([])
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null)
  const activeRef = useRef(false)

  const spawn = useCallback((): void => {
    const newOnes: EmojiParticle[] = Array.from({ length: 3 }, (_, i) => ({
      id:    ++_eid,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)]!,
      x:     (Math.random() - 0.5) * 80,   // -40 to +40 px
      dur:   1.8 + Math.random() * 0.8,
      delay: i * 0.12,
    }))

    setParticles(prev => [...prev.slice(-18), ...newOnes])

    // Auto-remove after animation completes
    setTimeout(() => {
      setParticles(prev =>
        prev.filter(p => !newOnes.find(n => n.id === p.id))
      )
    }, 3200)
  }, [])

  const startLoop = useCallback((): void => {
    if (activeRef.current) return
    activeRef.current = true
    spawn()
    timerRef.current = setInterval(spawn, 600)
  }, [spawn])

  const stopLoop = useCallback((): void => {
    activeRef.current = false
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Emoji particles */}
      {particles.map(p => (
        <span
          key={p.id}
          aria-hidden="true"
          className="emoji-particle select-none"
          style={{
            left:      `calc(50% + ${p.x}px)`,
            bottom:    '100%',
            '--dur':   `${p.dur}s`,
            '--delay': `${p.delay}s`,
          } as React.CSSProperties}
        >
          {p.emoji}
        </span>
      ))}

      {/* Cloud trigger button */}
      <button
        onMouseEnter={startLoop}
        onMouseLeave={stopLoop}
        onClick={spawn}
        aria-label="Emoji cloud — hover to activate"
        className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full
                   border border-primary/25 bg-primary/8
                   text-primary text-xs font-mono font-medium
                   hover:border-primary/50 hover:bg-primary/15
                   transition-all duration-200 select-none"
      >
        <span className="text-base leading-none">☁️</span>
        <span>hover me</span>
        <span
          aria-hidden="true"
          className="w-1.5 h-1.5 rounded-full bg-primary"
          style={{ animation: 'scrollBounce 2s ease-in-out infinite' }}
        />
      </button>
    </div>
  )
})

EmojiCloud.displayName = 'EmojiCloud'
export default EmojiCloud
