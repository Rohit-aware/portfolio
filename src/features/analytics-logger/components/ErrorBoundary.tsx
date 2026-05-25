import React from 'react'
import { logCriticalError } from '../facade/logError'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error): void {
    logCriticalError(error)
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-[#050505] text-[#f5f5f7] font-sans">
          <div className="absolute inset-0 bg-radial-gradient from-blue-900/10 to-transparent pointer-events-none" />
          <div className="relative max-w-md p-8 border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-red-950/30 border border-red-500/20">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
              Something went wrong
            </h2>
            <p className="text-sm text-neutral-400 mb-8">
              An unexpected error occurred during rendering. Please try reloading the page
              to restore your session.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full px-6 py-3 text-sm font-semibold text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-500 active:scale-[0.98] shadow-lg shadow-blue-500/20"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
