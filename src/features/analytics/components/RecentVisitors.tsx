import React from 'react'
import { Smartphone, Monitor, Tablet, HelpCircle, Laptop } from 'lucide-react'
import { RecentVisitor } from '../types/analytics.types'

interface RecentVisitorsProps {
  visitors: RecentVisitor[]
}

const getDeviceIcon = (deviceType: string) => {
  switch (deviceType.toLowerCase()) {
    case 'mobile':
      return Smartphone
    case 'tablet':
      return Tablet
    case 'laptop':
      return Laptop
    case 'desktop':
      return Monitor
    default:
      return HelpCircle
  }
}

const formatRelativeTime = (timestamp: number) => {
  const diff = Date.now() - timestamp
  const secs = Math.floor(diff / 1000)
  const mins = Math.floor(secs / 60)
  const hours = Math.floor(mins / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (mins > 0) return `${mins}m ago`
  return 'Just now'
}

export const RecentVisitors: React.FC<RecentVisitorsProps> = ({ visitors }) => {
  return (
    <div className="card-glass p-5 rounded-xl border border-white/5 flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-sm font-mono text-neutral-200 tracking-wider mb-1">
          Recent Visitors
        </h3>
        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
          Last 5 active visitor records
        </p>
      </div>

      <div className="flex-1 flex flex-col divide-y divide-white/5 overflow-y-auto max-h-[260px] pr-1">
        {visitors.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-xs font-mono text-neutral-500 py-8">
            No recent visitors recorded
          </div>
        ) : (
          visitors.map((visitor) => {
            const DeviceIcon = getDeviceIcon(visitor.deviceType)
            return (
              <div key={visitor.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-neutral-300">
                    <DeviceIcon size={14} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-mono font-medium text-white truncate max-w-[120px] sm:max-w-none">
                      IP Ref: {visitor.id.slice(0, 8)}...
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">
                      {visitor.browser} / {visitor.os}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-0.5 text-right font-mono">
                  <span className="text-xs text-neutral-300 font-semibold">
                    {visitor.sessionCount} {visitor.sessionCount === 1 ? 'session' : 'sessions'}
                  </span>
                  <span className="text-[9px] text-neutral-500 uppercase tracking-wider">
                    {formatRelativeTime(visitor.lastSeen)}
                  </span>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
