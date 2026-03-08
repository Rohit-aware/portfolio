import React, { memo, useState, useEffect, useRef } from 'react'

export interface TypedLineProps {
  readonly text:    string
  readonly colour?: string
  readonly bold?:   boolean
  readonly done:    boolean
  readonly isLast:  boolean
}

const TypedLine: React.FC<TypedLineProps> = memo(({ text, colour, bold, done, isLast }) => {
  const [shown, setShown] = useState('')
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!done || !text) {
      setShown('')
      return
    }
    let i = 0
    setShown('')
    timerRef.current = setInterval(() => {
      i++
      setShown(text.slice(0, i))
      if (i >= text.length && timerRef.current) {
        clearInterval(timerRef.current)
      }
    }, 18)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [done, text])

  const style: React.CSSProperties = {
    color:      colour ?? '#a3e635',
    fontWeight: bold ? 700 : 400,
  }

  return (
    <div className="flex items-center min-h-[1.5em]" style={style}>
      <span>{shown}</span>
      {isLast && done && (
        <span
          aria-hidden="true"
          className="inline-block w-2 h-[1em] ml-0.5 animate-blink"
          style={{ background: colour ?? '#a3e635', verticalAlign: 'text-bottom' }}
        />
      )}
    </div>
  )
})

TypedLine.displayName = 'TypedLine'
export default TypedLine
