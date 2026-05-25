import React, { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, RefreshCw, AlertCircle } from 'lucide-react'
import { useDashboardStore } from '../store/dashboardStore'
import { useDashboardData } from '../hooks/useDashboardData'
import { DashboardKpis } from './DashboardKpis'
import { DashboardCharts } from './DashboardCharts'
import { DashboardInsights } from './DashboardInsights'
import { RecentVisitors } from './RecentVisitors'
import {
  KpiSkeleton,
  ChartsSkeleton,
  InsightsSkeleton,
  RecentVisitorsSkeleton
} from './DashboardSkeletons'
import { FirebaseService } from '../services/firebase'

export const AnalyticsDashboardOverlay: React.FC = () => {
  const { isOpen, setOpen } = useDashboardStore()
  const { filterRange, setFilterRange, data, isLoading, error, refetch } = useDashboardData()
  const containerRef = useRef<HTMLDivElement>(null)
  const isMock = FirebaseService.getInstance().isMockMode

  useEffect(() => {
    if (!isOpen) return

    document.body.style.overflow = 'hidden'
    const originalPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
      if (e.key === 'Tab') {
        const focusableElements = containerRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusableElements || focusableElements.length === 0) return
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    const timer = setTimeout(() => {
      const focusable = containerRef.current?.querySelectorAll('button')
      if (focusable && focusable.length > 0) {
        focusable[0].focus()
      }
    }, 100)

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = originalPaddingRight
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timer)
    }
  }, [isOpen, setOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
          onClick={() => setOpen(false)}
        />

        <motion.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dashboard-title"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-5xl max-h-[85vh] md:max-h-[80vh] overflow-y-auto rounded-2xl border border-white/10 bg-neutral-950/80 p-5 md:p-6 shadow-2xl backdrop-blur-2xl text-white outline-none flex flex-col gap-6"
        >
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 id="dashboard-title" className="text-lg font-bold tracking-tight font-mono">
                  TELEMETRY_DASHBOARD
                </h2>
                {isMock && (
                  <span className="px-1.5 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-amber-400 font-mono text-[9px] uppercase tracking-wider font-semibold">
                    Simulated
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-neutral-400">
                Live visitor metrics & platform telemetry
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex rounded-lg border border-white/5 bg-white/5 p-0.5 font-mono text-[10px]">
                {(['7d', '30d', '90d'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setFilterRange(r)}
                    className={`px-2.5 py-1 rounded-md transition-all duration-200 uppercase font-semibold ${
                      filterRange === r
                        ? 'bg-white/10 text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <button
                onClick={refetch}
                disabled={isLoading}
                aria-label="Refetch telemetry data"
                className="p-1.5 rounded-lg border border-white/5 bg-white/5 text-neutral-400 hover:text-white disabled:opacity-50 transition-colors"
              >
                <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
              </button>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close dashboard overlay"
                className="p-1.5 rounded-lg border border-white/5 bg-white/5 text-neutral-400 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-3 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 font-mono text-xs">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
            {isLoading && !data ? (
              <>
                <KpiSkeleton />
                <ChartsSkeleton />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <InsightsSkeleton />
                  </div>
                  <div>
                    <RecentVisitorsSkeleton />
                  </div>
                </div>
              </>
            ) : data ? (
              <>
                <DashboardKpis kpis={data.kpis} />
                <DashboardCharts chartData={data.chartData} platforms={data.platforms} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2">
                    <DashboardInsights browsers={data.browsers} oss={data.oss} />
                  </div>
                  <div>
                    <RecentVisitors visitors={data.recentVisitors} />
                  </div>
                </div>
              </>
            ) : null}
          </div>

          <div className="border-t border-white/5 pt-4 flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
            <span>
              Last fetched:{' '}
              {data
                ? new Date(data.lastUpdated).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    second: '2-digit',
                  })
                : 'Never'}
            </span>
            <div className="flex items-center gap-4">
              <span>ESC TO CLOSE</span>
              <span>CMD+SHIFT+A</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
export default AnalyticsDashboardOverlay
