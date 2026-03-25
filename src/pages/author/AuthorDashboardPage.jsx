import { ArrowUpRight, Download, Edit, Trash2 } from 'lucide-react'
import AuthorShell from '../../components/author/AuthorShell'
import { AppLink } from '../../components/ui/AppLink'
import { authorArticles, authorQuickActions, dashboardStats, recentFeedback } from '../../data/authorData'

function AuthorDashboardPage() {
  return (
    <AuthorShell
      eyebrow="Overview Dashboard"
      title="Morning, Alex."
      description="Here&apos;s how your editorial portfolio is performing over the last 30 days, with the work that needs your attention next."
      actions={
        <>
          <div className="flex rounded-lg border border-primary/10 bg-white p-1">
            <button type="button" className="rounded bg-primary px-4 py-2 text-xs font-bold text-white">Last 30 Days</button>
            <button type="button" className="rounded px-4 py-2 text-xs font-bold text-slate-500 transition hover:text-slate-900">Last 7 Days</button>
          </div>
          <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-primary/10 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-primary/30 hover:text-primary">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </>
      }
    >
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((item) => {
          const Icon = item.icon

          return (
            <div key={item.label} className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className={item.tone}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`cms-numeric rounded-full px-2.5 py-1 text-[10px] font-bold ${item.chip}`}>{item.delta}</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
              <h3 className="cms-numeric mt-2 text-3xl font-extrabold tracking-tight text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
                {item.value}
              </h3>
            </div>
          )
        })}
      </div>

      <div className="mb-8 grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(320px,1fr)]">
        <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Views Over Time</p>
              <h3 className="mt-2 text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
                Reader engagement trend
              </h3>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-primary" />Current</span>
              <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-slate-300" />Previous</span>
            </div>
          </div>

          <div className="flex h-64 items-end gap-2 overflow-hidden">
            {[40, 55, 65, 45, 30, 85, 60, 40, 75, 50, 35, 95].map((height, index) => (
              <div key={height + index} className="group flex-1">
                <div
                  className={`w-full rounded-t-lg transition-all duration-300 ${index % 3 === 2 ? 'bg-primary group-hover:opacity-85' : 'bg-slate-200 group-hover:bg-slate-300'}`}
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Top Performing Story</p>
            <h3 className="mt-4 text-2xl font-extrabold leading-tight text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
              The Digital Nomad&apos;s Guide to Ethical Travel
            </h3>
            <div className="mt-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Views</p>
                <p className="cms-numeric mt-1 text-3xl font-extrabold text-slate-900">42.8k</p>
              </div>
              <span className="cms-numeric inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                <ArrowUpRight className="h-4 w-4" />
                +31%
              </span>
            </div>
            <button type="button" className="mt-6 w-full rounded-lg border border-primary/10 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-background-light">
              Detailed Analytics
            </button>
          </div>

          <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
                Quick Focus
              </h3>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">Today</span>
            </div>
            <div className="space-y-3">
              {authorQuickActions.map((item) => {
                const Icon = item.icon

                return (
                  <div key={item.label} className="flex items-center justify-between rounded-lg bg-background-light px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-white p-2 text-primary shadow-sm">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="text-sm font-semibold text-slate-700">{item.label}</p>
                    </div>
                    <span className="cms-numeric text-lg font-extrabold text-slate-900">{item.value}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]">
        <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-primary/10 px-6 py-5 sm:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Recent Articles</p>
              <h3 className="mt-2 text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
                Story pipeline
              </h3>
            </div>
            <AppLink to="/author/articles" className="text-sm font-bold text-primary transition hover:underline">
              View All
            </AppLink>
          </div>

          <div className="overflow-x-auto">
            <table className="cms-numeric w-full min-w-[760px] text-left">
              <thead>
                <tr className="bg-background-light">
                  {['Article Title', 'Status', 'Views', 'Likes', 'Actions'].map((head, index) => (
                    <th key={head} className={`px-8 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 ${index === 4 ? 'text-right' : ''}`}>
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10">
                {authorArticles.slice(0, 3).map((row) => (
                  <tr key={row.id} className="group transition hover:bg-background-light">
                    <td className="px-8 py-5">
                      <p className="text-sm font-bold text-slate-900">{row.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{row.meta}</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${row.status === 'Published' ? 'bg-primary/10 text-primary' : 'bg-amber-50 text-amber-700'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm font-bold text-slate-900">{row.views}</td>
                    <td className="px-8 py-5 text-sm font-bold text-slate-900">{row.likes}</td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
                        <button type="button" className="rounded-2xl p-2 text-slate-500 transition hover:bg-white hover:text-primary">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button type="button" className="rounded-2xl p-2 text-slate-500 transition hover:bg-white hover:text-rose-700">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
              Recent Feedback
            </h3>
            <span className="cms-numeric rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">12 New</span>
          </div>
          <div className="space-y-5">
            {recentFeedback.map((item) => (
              <div key={item.name} className="flex gap-4">
                <img src={item.image} alt={item.name} className="h-11 w-11 rounded-2xl object-cover" />
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-bold text-slate-900">{item.name}</p>
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{item.time}</span>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{item.text}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <button type="button" className="text-xs font-bold text-primary transition hover:underline">Reply</button>
                    <button type="button" className="text-xs font-bold text-slate-500 transition hover:text-primary">Like</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthorShell>
  )
}

export default AuthorDashboardPage
