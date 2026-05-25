import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { ChartItem, PlatformItem } from '../types/analytics.types'

interface ChartsProps {
  chartData: ChartItem[]
  platforms: PlatformItem[]
}

const COLORS = {
  Desktop: '#34d399',
  Tablet: '#c084fc',
  Mobile: '#60a5fa',
  Other: '#fbbf24'
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-950/95 border border-white/10 p-3 rounded-lg shadow-xl backdrop-blur-md">
        <p className="text-xs font-mono text-neutral-400 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs font-medium mb-1 last:mb-0">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-neutral-300">{entry.name}:</span>
            <span className="text-white font-semibold">{entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

const PieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-neutral-950/95 border border-white/10 p-3 rounded-lg shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-medium">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.fill }} />
          <span className="text-neutral-300">{data.name}:</span>
          <span className="text-white font-semibold">{data.value.toLocaleString()}</span>
        </div>
      </div>
    )
  }
  return null
}

export const DashboardCharts: React.FC<ChartsProps> = ({ chartData, platforms }) => {
  const activePlatforms = platforms.filter((p) => p.value > 0)
  const totalPlatformVisits = activePlatforms.reduce((acc, curr) => acc + curr.value, 0)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 card-glass p-5 rounded-xl border border-white/5 h-[340px] flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-mono text-neutral-200 tracking-wider">
            Traffic History
          </h3>
          <div className="flex gap-4 text-[10px] font-mono text-neutral-400">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>Visits</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Unique Visitors</span>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full min-h-0 text-[10px] font-mono">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="#ffffff20"
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="#ffffff20"
                tickLine={false}
                axisLine={false}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="visits"
                name="Visits"
                stroke="#6366f1"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorVisits)"
              />
              <Area
                type="monotone"
                dataKey="visitors"
                name="Visitors"
                stroke="#22d3ee"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorVisitors)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card-glass p-5 rounded-xl border border-white/5 h-[340px] flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-mono text-neutral-200 tracking-wider mb-1">
            Device Breakdown
          </h3>
          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
            By user-agent detection
          </p>
        </div>

        {totalPlatformVisits === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-xs font-mono text-neutral-500">
            No platform data available
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-between min-h-0">
            <div className="w-[50%] h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<PieTooltip />} />
                  <Pie
                    data={activePlatforms}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {activePlatforms.map((entry, index) => {
                      const name = entry.name as keyof typeof COLORS
                      const color = COLORS[name] || COLORS.Other
                      return (
                        <Cell key={`cell-${index}`} fill={color} stroke="#ffffff05" strokeWidth={1} />
                      )
                    })}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-[45%] flex flex-col gap-2 font-mono text-[10px]">
              {activePlatforms.map((p, idx) => {
                const name = p.name as keyof typeof COLORS
                const color = COLORS[name] || COLORS.Other
                const pct = totalPlatformVisits > 0 ? ((p.value / totalPlatformVisits) * 100).toFixed(0) : '0'
                return (
                  <div key={idx} className="flex flex-col gap-0.5">
                    <div className="flex items-center justify-between text-neutral-300">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                        <span className="font-semibold">{p.name}</span>
                      </div>
                      <span className="text-white font-bold">{pct}%</span>
                    </div>
                    <span className="text-[9px] text-neutral-500 pl-3">
                      {p.value.toLocaleString()} sessions
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
