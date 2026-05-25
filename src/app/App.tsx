import React, { memo, lazy, Suspense } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import AnimatedCursor from '@/animations/AnimatedCursor'
import AnalyticsBadge from '@/components/ui/AnalyticsBadge'
import { useTheme } from '@/features/theme/hooks/useTheme'
import { FLAGS } from '@/config/featureFlags'
import { useSessionTracking } from '@/features/analytics/hooks/useSessionTracking'
import SecuritySystem from '@/components/security/SecuritySystem'
import { ErrorBoundary } from '@/features/analytics-logger/components/ErrorBoundary'
import { useGlobalErrorTracking } from '@/features/analytics-logger/hooks/useGlobalErrorTracking'
import { useAnalyticsKeyboardShortcut } from '@/features/analytics/hooks/useAnalyticsKeyboardShortcut'
import { useDashboardStore } from '@/features/analytics/store/dashboardStore'

const PortfolioChat = lazy(() => import('@/components/ui/PortfolioChat'))
const AnalyticsDashboardOverlay = lazy(() => import('@/features/analytics/components/AnalyticsDashboardOverlay'))

const App: React.FC = memo(() => {
  const { isDark, toggleTheme, theme } = useTheme()
  useSessionTracking()
  useGlobalErrorTracking()
  useAnalyticsKeyboardShortcut()
  const isOpen = useDashboardStore((state) => state.isOpen)

  return (
    <ErrorBoundary>
      <SecuritySystem />
      {FLAGS.ANIMATED_CURSOR && <AnimatedCursor />}
      {FLAGS.PORTFOLIO_CHAT && (
        <Suspense fallback={null}>
          <PortfolioChat />
        </Suspense>
      )}
      {FLAGS.PORTFOLIO_ANYALYTICS && <AnalyticsBadge />}
      {isOpen && (
        <Suspense fallback={null}>
          <AnalyticsDashboardOverlay />
        </Suspense>
      )}
      <div className="min-h-screen bg-background text-foreground">
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} theme={theme} />
        <Home />
        <Footer />
      </div>
    </ErrorBoundary>
  )
})

App.displayName = 'App'
export default App
