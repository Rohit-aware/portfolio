import React from 'react'
import { BrowserItem, OsItem } from '../types/analytics.types'

interface InsightsProps {
  browsers: BrowserItem[]
  oss: OsItem[]
}

export const DashboardInsights: React.FC<InsightsProps> = ({ browsers, oss }) => {
  const maxBrowser = browsers.reduce((max, item) => Math.max(max, item.count), 0) || 1
  const maxOs = oss.reduce((max, item) => Math.max(max, item.count), 0) || 1

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="card-glass p-5 rounded-xl border border-white/5 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-mono text-neutral-200 tracking-wider mb-1">
            Top Browsers
          </h3>
          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-4">
            Sessions by user-agent
          </p>
        </div>
        <div className="space-y-3">
          {browsers.slice(0, 4).map((item, idx) => {
            const pct = ((item.count / maxBrowser) * 100).toFixed(0)
            return (
              <div key={idx} className="flex flex-col gap-1 font-mono">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-300 font-semibold">{item.name}</span>
                  <span className="text-white font-bold">{item.count}</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500/80 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
          {browsers.length === 0 && (
            <div className="text-xs font-mono text-neutral-500 py-4 text-center">
              No browser data recorded
            </div>
          )}
        </div>
      </div>

      <div className="card-glass p-5 rounded-xl border border-white/5 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-mono text-neutral-200 tracking-wider mb-1">
            Top Platforms
          </h3>
          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-4">
            Operating System distribution
          </p>
        </div>
        <div className="space-y-3">
          {oss.slice(0, 4).map((item, idx) => {
            const pct = ((item.count / maxOs) * 100).toFixed(0)
            return (
              <div key={idx} className="flex flex-col gap-1 font-mono">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-300 font-semibold">{item.name}</span>
                  <span className="text-white font-bold">{item.count}</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400/80 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
          {oss.length === 0 && (
            <div className="text-xs font-mono text-neutral-500 py-4 text-center">
              No platform data recorded
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
