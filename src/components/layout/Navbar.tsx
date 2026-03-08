import React, { memo, useState, useCallback } from 'react'
import { Moon, Sun, FileText, Menu, X } from 'lucide-react'
import { NAV_ITEMS, SECTION_IDS } from '@/constants/navigation'
import { useScrollSpy } from '@/shared/hooks/useScrollSpy'
import { useNavScroll } from '@/shared/hooks/useNavScroll'
import { scrollToSection } from '@/shared/utils/scroll'
import { downloadResume } from '@/shared/utils/resume'
import { cn, cv } from '@/shared/utils/cn'
import type { ThemeMode } from '@/types'

/* ─────────────────────────────────────────────────────────────
   VARIANT MAPS  —  defined once, used by cv()
   No inline ternaries or .join() anywhere in this file.
   ───────────────────────────────────────────────────────────── */

const navPillVariants = cv(
  // base — all pills share this
  cn(
    'relative px-4 py-1.5 rounded-xl text-sm font-medium',
    'transition-all duration-300 ease-out',
    'focus-visible:outline-none',
    'select-none',
  ),
  {
    state: {
      // Glass torch effect: blur + primary tint + inner glow border
      active: cn(
        'text-primary font-semibold',
        'bg-primary/10',
        'border border-primary/30',
        'shadow-[inset_0_1px_0_hsl(var(--primary)/0.2),0_0_16px_hsl(var(--primary)/0.08)]',
      ),
      inactive: cn(
        'text-muted-foreground',
        'border border-transparent',
        'hover:text-foreground hover:bg-surface/70 hover:border-border',
      ),
    },
  }
)

const mobileItemVariants = cv(
  cn(
    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl',
    'text-sm font-medium transition-all duration-200',
  ),
  {
    state: {
      active: 'bg-primary/10 text-primary border border-primary/20',
      inactive: 'text-muted-foreground hover:text-foreground hover:bg-surface border border-transparent',
    },
  }
)

const headerVariants = cv(
  cn(
    'fixed top-0 left-0 right-0 z-50',
    'transition-all duration-300',
    'animate-nav-slide-down',
  ),
  {
    scrolled: {
      yes: 'border-b border-border bg-background/80 backdrop-blur-xl shadow-sm',
      no: 'border-b border-transparent bg-transparent',
    },
    hidden: {
      yes: '-translate-y-full',
      no: 'translate-y-0',
    },
  }
)

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */

interface NavbarProps {
  readonly isDark: boolean
  readonly onToggleTheme: () => void
  readonly theme: ThemeMode
}

/* ─────────────────────────────────────────────────────────────
   NavPill — glass torch active state
   ───────────────────────────────────────────────────────────── */

interface NavPillProps {
  readonly id: string
  readonly label: string
  readonly isActive: boolean
  readonly onClick: (id: string) => void
}

const NavPill: React.FC<NavPillProps> = memo(({ id, label, isActive, onClick }) => {
  const handleClick = useCallback(() => onClick(id), [id, onClick])

  return (
    <button
      onClick={handleClick}
      aria-current={isActive ? 'page' : undefined}
      className={navPillVariants({ state: isActive ? 'active' : 'inactive' })}
    >
      {/* Glass torch — subtle radial glow behind active item */}
      {isActive && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, hsl(var(--primary)/0.18) 0%, transparent 70%)',
          }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  )
})
NavPill.displayName = 'NavPill'

/* ─────────────────────────────────────────────────────────────
   MobileNavItem
   ───────────────────────────────────────────────────────────── */

interface MobileNavItemProps {
  readonly id: string
  readonly label: string
  readonly index: number
  readonly isActive: boolean
  readonly onClick: (id: string) => void
}

const MobileNavItem: React.FC<MobileNavItemProps> = memo(
  ({ id, label, index, isActive, onClick }) => {
    const handleClick = useCallback(() => onClick(id), [id, onClick])
    return (
      <button
        onClick={handleClick}
        aria-current={isActive ? 'page' : undefined}
        className={mobileItemVariants({ state: isActive ? 'active' : 'inactive' })}
      >
        <span className="text-xs font-mono text-muted-foreground/30 w-4 shrink-0">
          {String(index + 1).padStart(2, '0')}
        </span>
        {label}
        {isActive && (
          <span aria-hidden="true" className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
        )}
      </button>
    )
  }
)
MobileNavItem.displayName = 'MobileNavItem'

/* ─────────────────────────────────────────────────────────────
   ThemeToggle — isolated button
   ───────────────────────────────────────────────────────────── */

interface ThemeToggleProps {
  readonly isDark: boolean
  readonly onToggle: () => void
}

const ThemeToggle: React.FC<ThemeToggleProps> = memo(({ isDark, onToggle }) => (
  <button
    onClick={onToggle}
    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    className={cn(
      'w-8 h-8 flex items-center justify-center rounded-lg',
      'border border-border text-muted-foreground',
      'hover:text-foreground hover:bg-surface',
      'transition-all duration-200',
    )}
  >
    {isDark ? <Sun size={14} aria-hidden="true" /> : <Moon size={14} aria-hidden="true" />}
  </button>
))
ThemeToggle.displayName = 'ThemeToggle'

/* ─────────────────────────────────────────────────────────────
   Navbar
   ───────────────────────────────────────────────────────────── */

const Navbar: React.FC<NavbarProps> = memo(({ isDark, onToggleTheme }) => {
  const activeId = useScrollSpy(SECTION_IDS)
  const { isScrolled, isHidden } = useNavScroll()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavClick = useCallback((id: string): void => {
    scrollToSection(id)
    setMobileOpen(false)
  }, [])

  const toggleMobile = useCallback(() => setMobileOpen(p => !p), [])

  return (
    <>
      {/* ── Header ── */}
      <header
        className={headerVariants({
          scrolled: isScrolled ? 'yes' : 'no',
          hidden: isHidden ? 'yes' : 'no',
        })}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-14 gap-3">

            {/* Logo */}
            <button
              onClick={() => handleNavClick('hero')}
              aria-label="Back to top"
              className={cn(
                'flex items-center gap-2 font-bold text-foreground text-sm shrink-0 group',
              )}
            >
              <span className={cn(
                'w-7 h-7 rounded-lg bg-primary/12 border border-primary/25',
                'flex items-center justify-center text-primary text-xs font-bold',
                'group-hover:bg-primary/20 transition-colors duration-200',
              )}>
                RA
              </span>
              <span className="hidden sm:block">
                Rohit<span className="text-primary">.</span>
              </span>
            </button>

            {/* Desktop nav — glass torch active pills */}
            <nav
              aria-label="Main navigation"
              className="hidden lg:flex items-center gap-1"
            >
              {NAV_ITEMS.map(item => (
                <NavPill
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  isActive={activeId === item.id}
                  onClick={handleNavClick}
                />
              ))}
            </nav>

            {/* Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

              <a
                onClick={downloadResume}
                aria-label="Download resume PDF"
                className="hidden sm:inline-flex btn-primary py-1.5 px-3 text-xs gap-1.5"
              >
                <FileText size={12} aria-hidden="true" /> Resume
              </a>

              <button
                onClick={toggleMobile}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className={cn(
                  'lg:hidden w-8 h-8 flex items-center justify-center rounded-lg',
                  'border border-border text-muted-foreground',
                  'hover:text-foreground hover:bg-surface transition-all duration-200',
                )}
              >
                {mobileOpen
                  ? <X size={15} aria-hidden="true" />
                  : <Menu size={15} aria-hidden="true" />
                }
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileOpen}
        className={cn(
          'fixed inset-0 z-40 lg:hidden transition-all duration-300',
          mobileOpen ? 'visible' : 'invisible pointer-events-none',
        )}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileOpen(false)}
          className={cn(
            'absolute inset-0 bg-background/70 backdrop-blur-sm',
            'transition-opacity duration-300',
            mobileOpen ? 'opacity-100' : 'opacity-0',
          )}
        />

        {/* Panel */}
        <div
          className={cn(
            'absolute top-[58px] left-3 right-3 rounded-2xl p-2 shadow-2xl',
            'bg-card/90 border border-border backdrop-blur-xl',
            'transition-all duration-300 ease-out',
            mobileOpen
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 -translate-y-2 scale-[0.97]',
          )}
        >
          <nav aria-label="Mobile navigation">
            {NAV_ITEMS.map((item, i) => (
              <MobileNavItem
                key={item.id}
                id={item.id}
                label={item.label}
                index={i}
                isActive={activeId === item.id}
                onClick={handleNavClick}
              />
            ))}
          </nav>
          <div className="border-t border-border mt-2 pt-2">
            <a
              onClick={downloadResume}
              className="btn-primary w-full justify-center text-xs py-2"
            >
              <FileText size={13} aria-hidden="true" /> Download Resume
            </a>
          </div>
        </div>
      </div>
    </>
  )
})

Navbar.displayName = 'Navbar'
export default Navbar
