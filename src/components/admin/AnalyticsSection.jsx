import { categoryPerformance } from '../../data/adminData'

function TrafficOverviewCard() {
  const chartAccent = '#b91c1c'

  return (
    <section className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm lg:col-span-2">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">Traffic Overview</h3>
          <p className="text-sm text-slate-500">Page views over the last 7 days</p>
        </div>
        <select className="admin-select w-auto bg-background-light py-1 text-xs font-bold text-slate-600">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      <div className="relative h-64">
        <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="admin-traffic-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartAccent} stopOpacity="0.18" />
              <stop offset="100%" stopColor={chartAccent} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,250 Q100,220 200,240 T400,120 T600,180 T800,50 T1000,100 V300 H0 Z" fill="url(#admin-traffic-gradient)" />
          <path d="M0,250 Q100,220 200,240 T400,120 T600,180 T800,50 T1000,100" fill="none" stroke={chartAccent} strokeWidth="4" strokeLinecap="round" />
        </svg>
        <div className="mt-4 flex justify-between px-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function TopCategoriesCard() {
  return (
    <section className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold">Top Categories</h3>
      <div className="space-y-4">
        {categoryPerformance.map((entry) => (
          <article key={entry.name}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-medium">{entry.name}</span>
              <span className="text-slate-500">{entry.percent}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-background-light">
              <div className="h-full rounded-full bg-primary" style={{ width: `${entry.percent}%` }} />
            </div>
          </article>
        ))}
      </div>

      <button type="button" className="mt-6 w-full rounded-lg border border-primary/20 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/5">
        View All Analytics
      </button>
    </section>
  )
}

function AnalyticsSection() {
  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <TrafficOverviewCard />
      <TopCategoriesCard />
    </section>
  )
}

export default AnalyticsSection
