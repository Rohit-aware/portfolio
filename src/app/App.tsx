import React, { memo, lazy, Suspense } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import AnimatedCursor from '@/animations/AnimatedCursor'
import AnalyticsBadge from '@/components/ui/AnalyticsBadge'
import { useTheme } from '@/features/theme/hooks/useTheme'
import { FLAGS } from '@/config/featureFlags'

/**
 * App — root shell.
 * Composes global overlays and page layout.
 * ScrollIndicator removed per architecture decision (rule 9).
 */

const PortfolioChat = lazy(() => import('@/components/ui/PortfolioChat'))

const App: React.FC = memo(() => {
  const { isDark, toggleTheme, theme } = useTheme()

  return (
    <>
      {FLAGS.ANIMATED_CURSOR && <AnimatedCursor />}
      {FLAGS.PORTFOLIO_CHAT && <Suspense fallback={null}><PortfolioChat /></Suspense>}
      {FLAGS.PORTFOLIO_ANYALYTICS && <AnalyticsBadge />}
      <div className="min-h-screen bg-background text-foreground">
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} theme={theme} />
        <Home />
        <Footer />
      </div>
    </>
  )
})

App.displayName = 'App'
export default App
