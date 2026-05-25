import React from 'react'
import { Users, Eye, RotateCcw, Calendar } from 'lucide-react'
import { Kpis } from '../types/analytics.types'

interface KpisProps {
  kpis: Kpis
}

export const DashboardKpis: React.FC<KpisProps> = ({ kpis }) => {
  const items = [
    {
      title: 'Total Visitors',
      value: kpis.totalVisitors,
      icon: Users,
      color: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
      trend: 'Unique IPs',
    },
    {
      title: 'Total Visits',
      value: kpis.totalVisits,
      icon: Eye,
      color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
      trend: 'All sessions',
    },
    {
      title: 'Returning Visitors',
      value: kpis.returningVisitors,
      icon: RotateCcw,
      color: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5',
      trend: `${((kpis.returningVisitors / (kpis.totalVisitors || 1)) * 100).toFixed(0)}% rate`,
    },
    {
      title: 'Visits Today',
      value: kpis.visitsToday,
      icon: Calendar,
      color: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
      trend: 'Last 24 hours',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {items.map((item, idx) => {
        const Icon = item.icon
        return (
          <div
            key={idx}
            className="group relative card-glass p-4 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-neutral-400 tracking-wider">
                {item.title}
              </span>
              <div className={`p-1.5 rounded-lg border ${item.color}`}>
                <Icon size={12} />
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:scale-[1.02] origin-left transition-transform duration-300">
                {item.value.toLocaleString()}
              </span>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                {item.trend}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
