import { useEffect } from 'react'
import { useDashboardStore } from '../store/dashboardStore'

export function useAnalyticsKeyboardShortcut() {
  const { isOpen, setOpen } = useDashboardStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey
      const isShift = e.shiftKey
      if (isCmdOrCtrl && isShift && e.key.toLowerCase() === 'a') {
        e.preventDefault()
        setOpen(!isOpen)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, setOpen])
}
