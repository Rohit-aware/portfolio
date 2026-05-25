import React, { memo } from 'react'
import { Eye } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import { useAnalyticsStore } from '@/features/analytics/store/analyticsStore'
import { useDashboardStore } from '@/features/analytics/store/dashboardStore'

const AnalyticsBadge: React.FC = memo(() => {
  const { visitCount, isNewVisit, isLoading, recordVisit } = useAnalyticsStore()
  const setOpen = useDashboardStore((state) => state.setOpen)

  React.useEffect(() => {
    recordVisit()
  }, [recordVisit])

  return (
    <div
      aria-label={`Portfolio visited ${visitCount} times`}
      onDoubleClick={() => setOpen(true)}
      title="Double-click to view analytics"
      className={cn(
        'fixed bottom-5 left-5 z-40 flex items-center gap-1.5',
        'px-2.5 py-1.5 rounded-full',
        'border text-xs font-mono',
        'transition-all duration-500',
        'backdrop-blur-md cursor-pointer select-none',
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
      {isLoading ? (
        <span className="opacity-40">···</span>
      ) : (
        <span>
          {visitCount.toLocaleString()}
          <span className="opacity-50 ml-1">visits</span>
        </span>
      )}
      {isNewVisit && !isLoading && (
        <span aria-live="polite" className="ml-0.5 text-primary/70 animate-fade-in">
          ✦
        </span>
      )}
    </div>
  )
})

AnalyticsBadge.displayName = 'AnalyticsBadge'
export default AnalyticsBadge
