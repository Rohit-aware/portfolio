import React from 'react'

export const KpiSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="card-glass p-4 rounded-xl border border-white/5 animate-pulse">
          <div className="h-3 w-16 bg-white/10 rounded mb-2" />
          <div className="h-6 w-24 bg-white/10 rounded mb-2" />
          <div className="h-3 w-12 bg-white/10 rounded" />
        </div>
      ))}
    </div>
  )
}

export const ChartsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 card-glass p-5 rounded-xl border border-white/5 h-[320px] animate-pulse">
        <div className="h-4 w-28 bg-white/10 rounded mb-4" />
        <div className="w-full h-48 bg-white/5 rounded" />
      </div>
      <div className="card-glass p-5 rounded-xl border border-white/5 h-[320px] animate-pulse">
        <div className="h-4 w-24 bg-white/10 rounded mb-4" />
        <div className="w-full h-40 bg-white/5 rounded-full mx-auto" />
      </div>
    </div>
  )
}

export const InsightsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="card-glass p-5 rounded-xl border border-white/5 animate-pulse">
        <div className="h-4 w-32 bg-white/10 rounded mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex justify-between">
                <div className="h-3 w-20 bg-white/10 rounded" />
                <div className="h-3 w-8 bg-white/10 rounded" />
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded" />
            </div>
          ))}
        </div>
      </div>
      <div className="card-glass p-5 rounded-xl border border-white/5 animate-pulse">
        <div className="h-4 w-32 bg-white/10 rounded mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex justify-between">
                <div className="h-3 w-20 bg-white/10 rounded" />
                <div className="h-3 w-8 bg-white/10 rounded" />
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const RecentVisitorsSkeleton: React.FC = () => {
  return (
    <div className="card-glass p-5 rounded-xl border border-white/5 animate-pulse">
      <div className="h-4 w-32 bg-white/10 rounded mb-4" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-white/10 rounded-full" />
              <div>
                <div className="h-4 w-24 bg-white/10 rounded mb-1" />
                <div className="h-3 w-16 bg-white/5 rounded" />
              </div>
            </div>
            <div className="h-4 w-12 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
