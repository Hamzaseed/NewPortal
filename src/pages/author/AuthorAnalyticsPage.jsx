import { Download } from 'lucide-react'
import AuthorShell from '../../components/author/AuthorShell'
import { analyticsLocations, performanceRows } from '../../data/authorData'

function AuthorAnalyticsPage() {
  return (
    <AuthorShell
      eyebrow="Analytics / Deep Dive"
      title="Audience Intelligence"
      description="Comprehensive breakdown of content performance and audience behavior, tuned for editorial decisions instead of vanity metrics."
      actions={
        <>
          <div className="flex rounded-lg border border-primary/10 bg-white p-1">
            <button type="button" className="rounded bg-primary px-4 py-2 text-xs font-bold text-white">30 Days</button>
            <button type="button" className="rounded px-4 py-2 text-xs font-bold text-slate-500 transition hover:text-slate-900">90 Days</button>
            <button type="button" className="rounded px-4 py-2 text-xs font-bold text-slate-500 transition hover:text-slate-900">1 Year</button>
          </div>
          <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-primary/10 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-primary/30 hover:text-primary">
            <Download className="h-4 w-4" />
            Export PDF
          </button>
        </>
      }
    >
      <div className="mb-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 overflow-hidden rounded-xl border border-primary/10 bg-white p-8 shadow-sm lg:col-span-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Avg. Reading Time</p>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="cms-numeric text-5xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>4m 24s</span>
            <span className="cms-numeric text-sm font-bold text-primary">+12%</span>
          </div>
          <p className="mt-2 text-sm text-slate-500">Industry benchmark: 2m 45s</p>
          <div className="mt-8 flex h-24 items-end gap-1">
            {[40, 60, 55, 80, 95, 70, 50].map((height, index) => (
              <div
                key={height + index}
                className={`flex-1 rounded-t-lg ${
                  index === 4
                    ? 'bg-rose-700'
                    : index >= 2 && index <= 5
                      ? 'bg-rose-300'
                      : 'bg-rose-100'
                }`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        <div className="col-span-12 rounded-xl border border-primary/10 bg-white p-8 shadow-sm lg:col-span-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Retention Curve</p>
              <h3 className="mt-2 text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
                Reader drop-off analysis
              </h3>
            </div>
            <div className="flex gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-primary" />This Month</div>
              <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-slate-300" />Last Month</div>
            </div>
          </div>
          <div className="relative h-48">
            <svg className="h-full w-full" viewBox="0 0 800 200">
              <path d="M0,50 Q100,60 200,100 T400,130 T600,150 T800,160" fill="none" stroke="#dadddf" strokeDasharray="8 4" strokeWidth="3" />
              <path d="M0,40 Q100,45 200,80 T400,100 T600,110 T800,120" fill="none" stroke="#0057bd" strokeWidth="4" />
            </svg>
            <div className="absolute bottom-0 flex w-full justify-between border-t border-primary/10 px-2 pt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
              <span>Intro</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>Conclusion</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 rounded-xl border border-primary/10 bg-white p-8 shadow-sm md:col-span-5">
          <h3 className="text-xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>Top Audience Locations</h3>
          <div className="mt-6 space-y-6">
            {analyticsLocations.map((row) => (
              <div key={row.name} className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-background-light text-xs font-bold text-primary">{row.flag}</div>
                <div className="flex-1">
                  <div className="mb-2 flex justify-between text-sm font-semibold text-slate-700">
                    <span>{row.name}</span>
                    <span className="cms-numeric">{row.pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                    <div className={`h-full rounded-full ${row.tone}`} style={{ width: `${row.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 grid gap-6 md:col-span-7">
          <div className="rounded-xl border border-primary/10 bg-white p-8 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Device Split</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-background-light p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Mobile</p>
                <p className="cms-numeric mt-2 text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>65.2%</p>
              </div>
              <div className="rounded-lg bg-background-light p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Desktop</p>
                <p className="cms-numeric mt-2 text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>28.4%</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-primary/10 bg-white p-8 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Top Referrals</h3>
            <div className="mt-5 flex gap-4 overflow-x-auto pb-2">
              {[
                ['Search Engine', 'Google', '4.2k'],
                ['Social Media', 'Twitter', '2.1k'],
                ['Newsletter', 'Substack', '1.8k'],
              ].map((item) => (
                <div key={item[1]} className="w-44 flex-shrink-0 rounded-lg bg-background-light p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">{item[0]}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>{item[1]}</span>
                    <span className="cms-numeric text-xs font-bold text-primary">{item[2]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-primary/10 p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Article Performance Detail</p>
            <h3 className="mt-2 text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
              Story-level engagement
            </h3>
          </div>
          <div className="rounded-xl bg-background-light px-3 py-2 text-xs font-bold text-slate-700">Filter Tags</div>
        </div>
        <div className="overflow-x-auto">
          <table className="cms-numeric w-full min-w-[760px] text-left">
            <thead>
              <tr className="bg-background-light">
                {['Article Title', 'Avg. Completion', 'Engagement Rate', 'Social Shares', 'Trend'].map((head, index) => (
                  <th key={head} className={`px-8 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 ${index > 0 ? 'text-center' : ''} ${index === 4 ? 'text-right' : ''}`}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {performanceRows.map((row) => (
                <tr key={row.title} className="group transition hover:bg-background-light">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <img src={row.image} alt={row.title} className="h-12 w-12 rounded-2xl object-cover" />
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-primary">{row.title}</p>
                        <p className="mt-1 text-xs text-slate-500">{row.meta}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center font-bold text-slate-900">{row.completion}</td>
                  <td className="px-8 py-6 text-center">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${row.trend === 'up' ? 'bg-primary/10 text-primary' : 'bg-slate-200 text-slate-600'}`}>
                      {row.engagement}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center text-sm font-medium text-slate-900">{row.shares}</td>
                  <td className="px-8 py-6 text-right text-xl">
                    <span className={row.trend === 'up' ? 'text-primary' : 'text-slate-400'}>{row.trend === 'up' ? 'UP' : 'FLAT'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AuthorShell>
  )
}

export default AuthorAnalyticsPage
