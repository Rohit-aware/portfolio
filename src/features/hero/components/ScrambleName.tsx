import React, { memo } from 'react'
import { useTypewriter } from '@/shared/hooks/useTypewriter'
import { cn } from '@/shared/utils/cn'

interface ScrambleNameProps {
  readonly name: string
}

const ScrambleName: React.FC<ScrambleNameProps> = memo(({ name }) => {
  const { display, isDone } = useTypewriter(name, 300, 55, 10)

  return (
    <span
      aria-label={name}
      className={cn(
        'text-gradient inline-block font-mono',
        'transition-filter duration-300',
        !isDone && 'blur-[0.5px]',
      )}
    >
      {display.split('').map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={cn(
            'inline-block transition-all duration-75',
            char === ' ' ? 'w-[0.35em]' : '',
          )}
        >
          {char}
        </span>
      ))}
    </span>
  )
})

ScrambleName.displayName = 'ScrambleName'
export default ScrambleName
