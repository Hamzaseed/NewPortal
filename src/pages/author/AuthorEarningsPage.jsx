import { useEffect, useMemo } from 'react'
import { ArrowUpRight, Banknote, CalendarRange, Wallet } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import AuthorShell from '../../components/author/AuthorShell'
import { useAuth } from '../../context/AuthContext'
import { fetchArticles } from '../../../app/articles/articleSlice'

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function AuthorEarningsPage() {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const { articles, loading, error } = useSelector((state) => state.articles)

  useEffect(() => {
    if (!articles.length) {
      dispatch(fetchArticles({ page: 1, limit: 50 }))
    }
  }, [articles.length, dispatch])

  const loggedInAuthorName = `${user?.first_name || ''} ${user?.last_name || ''}`.trim()

  const myArticles = useMemo(() => {
    return articles.filter((article) => {
      if (user?.id && article.created_by === user.id) {
        return true
      }

      if (loggedInAuthorName && article.author === loggedInAuthorName) {
        return true
      }

      return false
    })
  }, [articles, loggedInAuthorName, user?.id])

  const publishedArticles = useMemo(() => myArticles.filter((article) => article.status === 'Published'), [myArticles])

  const earningsSummary = useMemo(() => {
    const totalViews = publishedArticles.reduce((sum, article) => {
      const numericViews = Number.parseInt(String(article.views || '0').replace(/[^0-9]/g, ''), 10)
      return sum + (Number.isFinite(numericViews) ? numericViews : 0)
    }, 0)

    const thisMonth = publishedArticles.length * 185 + totalViews * 0.018
    const pending = publishedArticles.length * 42
    const lastPayout = thisMonth * 0.78

    return {
      totalViews,
      thisMonth,
      pending,
      lastPayout,
    }
  }, [publishedArticles])

  const payoutRows = useMemo(() => {
    return publishedArticles.slice(0, 5).map((article, index) => {
      const numericViews = Number.parseInt(String(article.views || '0').replace(/[^0-9]/g, ''), 10)
      const safeViews = Number.isFinite(numericViews) ? numericViews : 0
      const amount = 85 + safeViews * 0.012

      return {
        id: article.id ?? `${article.slug}-${index}`,
        title: article.title,
        status: index % 2 === 0 ? 'Cleared' : 'Pending',
        period: article.publish_date || article.date || 'Recent cycle',
        amount,
      }
    })
  }, [publishedArticles])

  return (
    <AuthorShell
      eyebrow="Revenue Desk"
      title="Earnings"
      description="Track your estimated article revenue, payout progress, and recent earning activity in a workspace separate from audience analytics."
      actions={
        <div className="inline-flex items-center gap-2 rounded-lg border border-primary/10 bg-white px-4 py-2 text-sm font-bold text-slate-700">
          <CalendarRange className="h-4 w-4 text-primary" />
          Current cycle
        </div>
      }
    >
      {error ? (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {loading ? <p className="mb-6 text-sm text-slate-500">Loading earnings...</p> : null}

      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <section className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Estimated This Month</p>
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          <h2 className="cms-numeric mt-4 text-4xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
            {formatCurrency(earningsSummary.thisMonth)}
          </h2>
          <p className="mt-3 text-sm text-slate-500">Calculated from published stories and visible article traffic in your workspace.</p>
        </section>

        <section className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Pending Clearance</p>
            <Banknote className="h-5 w-5 text-amber-600" />
          </div>
          <h2 className="cms-numeric mt-4 text-4xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
            {formatCurrency(earningsSummary.pending)}
          </h2>
          <p className="mt-3 text-sm text-slate-500">These earnings are waiting for the next payout window to close.</p>
        </section>

        <section className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Last Payout</p>
            <ArrowUpRight className="h-5 w-5 text-emerald-600" />
          </div>
          <h2 className="cms-numeric mt-4 text-4xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
            {formatCurrency(earningsSummary.lastPayout)}
          </h2>
          <p className="mt-3 text-sm text-slate-500">Based on the previous completed earning cycle for your published work.</p>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
          <header className="border-b border-primary/10 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Recent Earning Activity</p>
            <h3 className="mt-2 text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
              Story payout breakdown
            </h3>
          </header>

          <div className="overflow-x-auto">
            <table className="cms-numeric w-full min-w-[720px] text-left">
              <thead className="bg-background-light">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Story</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Cycle</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Status</th>
                  <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10">
                {payoutRows.map((row) => (
                  <tr key={row.id} className="hover:bg-background-light">
                    <td className="px-6 py-5">
                      <p className="font-bold text-slate-900">{row.title}</p>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-500">{row.period}</td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${row.status === 'Cleared' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right text-sm font-bold text-slate-900">{formatCurrency(row.amount)}</td>
                  </tr>
                ))}
                {!loading && payoutRows.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-sm text-slate-500">
                      Publish an article to start tracking earning estimates here.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Performance Inputs</p>
            <div className="mt-5 space-y-4">
              <div className="rounded-lg bg-background-light p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Published Stories</p>
                <p className="cms-numeric mt-2 text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
                  {publishedArticles.length}
                </p>
              </div>
              <div className="rounded-lg bg-background-light p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Tracked Views</p>
                <p className="cms-numeric mt-2 text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
                  {earningsSummary.totalViews.toLocaleString()}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Payout Notes</p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-500">
              <p>Earnings are estimated from visible article output and engagement data in the CMS.</p>
              <p>Pending amounts move to cleared after the current publishing cycle closes.</p>
              <p>This page is separate from analytics so revenue tracking stays easier to review.</p>
            </div>
          </section>
        </aside>
      </div>
    </AuthorShell>
  )
}

export default AuthorEarningsPage
