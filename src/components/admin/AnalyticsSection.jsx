function TrafficOverviewCard({ trafficOverview = [], summary = {} }) {
  const values = trafficOverview.map((item) => item.value || item.views || item.total || 0)
  const maxValue = Math.max(...values, 1)

  return (
    <section className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm lg:col-span-2">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">Traffic Overview</h3>
          <p className="text-sm text-slate-500">{summary?.trafficLabel || 'Page views over the last 7 days'}</p>
        </div>
        <select className="admin-select w-auto bg-background-light py-1 text-xs font-bold text-slate-600">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </header>

      <div className="flex h-64 items-end justify-between gap-3">
        {trafficOverview.map((item, index) => {
          const value = item.value || item.views || item.total || 0
          const height = `${Math.max((value / maxValue) * 100, 12)}%`

          return (
            <div key={item.day || item.label || index} className="flex h-full w-full flex-col items-center justify-end gap-3">
              <div className="w-full rounded-t-md bg-primary/20 transition-colors hover:bg-primary" style={{ height }} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {item.day || item.label || `Day ${index + 1}`}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function AnalyticsSection({ trafficOverview = [], summary = {} }) {
  return (
    <section className="grid grid-cols-1 gap-6">
      <TrafficOverviewCard trafficOverview={trafficOverview} summary={summary} />
    </section>
  )
}

export default AnalyticsSection
