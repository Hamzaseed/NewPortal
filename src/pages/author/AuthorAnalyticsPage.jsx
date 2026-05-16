import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Download } from 'lucide-react'
import AuthorShell from '../../components/author/AuthorShell'
import { fetchAuthorAnalytics } from '../../../app/analytics/authorAnalyticSlice'

function AuthorAnalyticsPage() {
  const dispatch = useDispatch()
  const {
    period,
    averageReadingTime,
    retentionCurve,
    deviceSplit,
    topReferrals,
    performanceRows,
    loading,
    error,
  } = useSelector((state) => state.authorAnalytics)
  const [rangeDays, setRangeDays] = useState(30)

  useEffect(() => {
    dispatch(fetchAuthorAnalytics({ range_days: rangeDays, article_limit: 8 }))
  }, [dispatch, rangeDays])

  return (
    <AuthorShell
      eyebrow="Analytics / Deep Dive"
      title="Audience Intelligence"
      description="Comprehensive breakdown of content performance and audience behavior, tuned for editorial decisions instead of vanity metrics."
      actions={
        <>
          <div className="flex rounded-lg border border-primary/10 bg-white p-1">
            <button
              type="button"
              onClick={() => setRangeDays(30)}
              className={`rounded px-4 py-2 text-xs font-bold ${rangeDays === 30 ? 'bg-primary text-white' : 'text-slate-500 transition hover:text-slate-900'}`}
            >
              30 Days
            </button>
            <button
              type="button"
              onClick={() => setRangeDays(90)}
              className={`rounded px-4 py-2 text-xs font-bold ${rangeDays === 90 ? 'bg-primary text-white' : 'text-slate-500 transition hover:text-slate-900'}`}
            >
              90 Days
            </button>
            <button
              type="button"
              onClick={() => setRangeDays(365)}
              className={`rounded px-4 py-2 text-xs font-bold ${rangeDays === 365 ? 'bg-primary text-white' : 'text-slate-500 transition hover:text-slate-900'}`}
            >
              1 Year
            </button>
          </div>
          <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-primary/10 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-primary/30 hover:text-primary">
            <Download className="h-4 w-4" />
            Export PDF
          </button>
        </>
      }
    >
      {error ? (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {loading ? <p className="mb-6 text-sm text-slate-500">Loading analytics...</p> : null}

      <div className="mb-8 grid grid-cols-12 gap-6">
        <section className="col-span-12 overflow-hidden rounded-xl border border-primary/10 bg-white p-8 shadow-sm lg:col-span-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Avg. Reading Time</p>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="cms-numeric text-5xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>{averageReadingTime.value}</span>
            <span className="cms-numeric text-sm font-bold text-primary">{averageReadingTime.delta}</span>
          </div>
          <p className="mt-2 text-sm text-slate-500">Industry benchmark: {averageReadingTime.benchmark}</p>
          <div className="mt-8 flex h-24 items-end gap-1">
            {(averageReadingTime.bars || []).map((height, index) => (
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
        </section>

        <section className="col-span-12 rounded-xl border border-primary/10 bg-white p-8 shadow-sm lg:col-span-8">
          <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Retention Curve</p>
              <h3 className="mt-2 text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
                Reader drop-off analysis
              </h3>
            </div>
            {period.current_label || period.previous_label ? (
              <div className="flex gap-4 text-xs text-slate-500">
                <p className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-primary" />{period.current_label}</p>
                <p className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-slate-300" />{period.previous_label}</p>
              </div>
            ) : null}
          </header>
          <div className="relative h-48">
            <svg className="h-full w-full" viewBox="0 0 800 200">
              <path d={retentionCurve.previous_path} fill="none" stroke="#dadddf" strokeDasharray="8 4" strokeWidth="3" />
              <path d={retentionCurve.current_path} fill="none" stroke="#0057bd" strokeWidth="4" />
            </svg>
            <div className="absolute bottom-0 flex w-full justify-between border-t border-primary/10 px-2 pt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
              {(retentionCurve.labels || []).map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="mb-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border border-primary/10 bg-white p-8 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Device Split</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <article className="rounded-lg bg-background-light p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Mobile</p>
                <p className="cms-numeric mt-2 text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>{deviceSplit.mobile}</p>
              </article>
              <article className="rounded-lg bg-background-light p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Desktop</p>
                <p className="cms-numeric mt-2 text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>{deviceSplit.desktop}</p>
              </article>
            </div>
          </section>

          <section className="rounded-xl border border-primary/10 bg-white p-8 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Top Referrals</h3>
            <div className="mt-5 flex gap-4 overflow-x-auto pb-2">
              {topReferrals.map((item) => (
                <article key={item.name} className="w-44 flex-shrink-0 rounded-lg bg-background-light p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>{item.name}</span>
                    <span className="cms-numeric text-xs font-bold text-primary">{item.value}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
        <header className="flex items-center justify-between border-b border-primary/10 p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Article Performance Detail</p>
            <h3 className="mt-2 text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
              Story-level engagement
            </h3>
          </div>
          {period.label ? <div className="rounded-xl bg-background-light px-3 py-2 text-xs font-bold text-slate-700">{period.label}</div> : null}
        </header>
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
      </section>
    </AuthorShell>
  )
}

export default AuthorAnalyticsPage
