import React, { memo } from 'react'
import { Eye } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import { useAnalytics } from '@/shared/hooks/useAnalytics'

/**
 * AnalyticsBadge — floating visitor counter in bottom-left corner.
 * Subtle by default, glows briefly when a new visit is registered.
 * Uses useAnalytics hook — no props needed.
 */

const AnalyticsBadge: React.FC = memo(() => {
  const { visitCount, isNewVisit, isLoading } = useAnalytics()

  return (
    <div
      aria-label={`Portfolio visited ${visitCount} times`}
      className={cn(
        'fixed bottom-5 left-5 z-40 flex items-center gap-1.5',
        'px-2.5 py-1.5 rounded-full',
        'border text-xs font-mono',
        'transition-all duration-500',
        'backdrop-blur-md',
        isNewVisit
          ? 'border-primary/40 bg-primary/10 text-primary shadow-lg shadow-primary/10'
          : 'border-border bg-card/70 text-muted-foreground',
      )}
    >
      <Eye
        size={11}
        aria-hidden="true"
        className={cn(
          'shrink-0 transition-colors duration-300',
          isNewVisit ? 'text-primary' : 'text-muted-foreground/60',
        )}
      />
      {isLoading
        ? <span className="opacity-40">···</span>
        : (
          <span>
            {visitCount.toLocaleString()}
            <span className="opacity-50 ml-1">visits</span>
          </span>
        )
      }
      {isNewVisit && !isLoading && (
        <span
          aria-live="polite"
          className="ml-0.5 text-primary/70 animate-fade-in"
        >
          ✦
        </span>
      )}
    </div>
  )
})

AnalyticsBadge.displayName = 'AnalyticsBadge'
export default AnalyticsBadge
