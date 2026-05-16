import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppLink } from '../components/ui/AppLink'
import Icon from '../components/ui/Icon'
import { fetchAdminAnalytics } from '../../app/analytics/analyticSlice'
import { fetchAdminCategories } from '../../app/categories/categoriesSlice'
import { fetchArticles } from '../../app/articles/articleSlice'

function AdminAnalyticsPage() {
  const dispatch = useDispatch()
  const { overviewCards, trafficTrends, deviceSplit, period, loading, error } = useSelector((state) => state.adminAnalytics)
  const { categories } = useSelector((state) => state.categories)
  const { articles } = useSelector((state) => state.articles)
  const [selectedFilter, setSelectedFilter] = useState('daily')

  useEffect(() => {
    let trafficDays = 1

    if (selectedFilter === 'weekly') {
      trafficDays = 7
    }

    if (selectedFilter === 'monthly') {
      trafficDays = 30
    }

    dispatch(fetchAdminAnalytics({ traffic_days: trafficDays }))
    dispatch(fetchAdminCategories({ page: 1, limit: 5 }))
    dispatch(fetchArticles({ page: 1, limit: 100 }))
  }, [dispatch, selectedFilter])

  const maxTraffic = Math.max(...trafficTrends.map((item) => item.value || item.views || item.total || 0), 1)
  const recentArticles = articles.slice(0, 5)

  return (
    <section className="space-y-8">
      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="font-medium text-slate-500">Overview</p>
          <h1 className="text-4xl font-bold">Traffic &amp; Performance</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-lg border border-primary/10 bg-white p-1">
            <button
              type="button"
              onClick={() => setSelectedFilter('daily')}
              className={`rounded px-4 py-1.5 text-sm font-bold ${selectedFilter === 'daily' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Daily
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('weekly')}
              className={`rounded px-4 py-1.5 text-sm font-bold ${selectedFilter === 'weekly' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Weekly
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('monthly')}
              className={`rounded px-4 py-1.5 text-sm font-bold ${selectedFilter === 'monthly' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Monthly
            </button>
          </div>

          <button type="button" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white shadow-lg shadow-primary/20">
            <Icon name="file_download" className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {loading ? <p className="text-sm text-slate-500">Loading analytics...</p> : null}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {overviewCards.map((card) => (
          <article key={card.title} className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-slate-500">{card.title}</p>
              <Icon name={card.icon || 'insights'} className="h-5 w-5 text-primary" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="cms-numeric text-3xl font-bold">{card.value}</p>
              <span
                className={`cms-numeric flex items-center text-xs font-bold ${
                  card.changeType === 'up'
                    ? 'text-green-500'
                    : card.changeType === 'down'
                      ? 'text-red-500'
                      : 'text-slate-400'
                }`}
              >
                <Icon
                  name={
                    card.changeType === 'up'
                      ? 'trending_up'
                      : card.changeType === 'down'
                        ? 'arrow_downward'
                        : 'remove'
                  }
                  className="h-4 w-4"
                />{' '}
                {card.change}
              </span>
            </div>
            {card.note ? (
              <p className="mt-4 text-right text-[10px] font-bold uppercase tracking-widest text-slate-400">{card.note}</p>
            ) : (
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-3/4 bg-primary" />
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-lg font-bold">Traffic Trends</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-primary" />
                <span className="text-xs font-medium">Visitors</span>
              </div>
            </div>
          </div>

          <div className="flex h-64 items-end justify-between gap-1">
            {trafficTrends.map((item, index) => {
              const value = item.value || item.views || item.total || 0
              const height = `${Math.max((value / maxTraffic) * 100, 20)}%`

              return (
                <div
                  key={`${item.label || item.day || 'day'}-${index}`}
                  className={`relative w-full rounded-t-sm transition-all ${
                    index === trafficTrends.length - 2
                      ? 'bg-rose-700 hover:bg-rose-800'
                      : index >= 2
                        ? 'bg-rose-300 hover:bg-rose-400'
                        : 'bg-rose-100 hover:bg-rose-200'
                  }`}
                  style={{ height }}
                >
                  <div className="absolute inset-x-0 bottom-full mb-1 h-1 bg-rose-700" />
                </div>
              )
            })}
          </div>

          <div className="mt-4 flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {trafficTrends.map((item, index) => (
              <span key={`${item.label || item.day || 'day'}-${index}`}>{item.label || item.day || `Day ${index + 1}`}</span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
          <h3 className="mb-8 text-lg font-bold">Device Split</h3>
          <div className="space-y-6">
            {[
              ['Mobile', deviceSplit.mobile || deviceSplit.Mobile || 0, 'smartphone', 'bg-primary'],
              ['Desktop', deviceSplit.desktop || deviceSplit.Desktop || 0, 'laptop', 'bg-primary/60'],
              ['Tablet', deviceSplit.tablet || deviceSplit.Tablet || 0, 'tablet', 'bg-primary/30'],
            ].map(([label, value, icon, barClass]) => (
              <div key={label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Icon name={icon} className="h-4 w-4 text-slate-400" />
                    {label}
                  </span>
                  <span className="cms-numeric font-bold">{value}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full ${barClass}`} style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-lg border border-primary/10 bg-primary/5 p-4">
            <p className="text-xs leading-relaxed text-primary">
              <span className="font-bold">Insight:</span> Mobile traffic peaked on Friday evening during the breaking news event.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="flex flex-col rounded-xl border border-primary/5 bg-white p-6 shadow-sm lg:col-span-1">
          <h3 className="mb-6 text-lg font-bold">Top Categories</h3>
          <div className="flex-1 space-y-4">
            {categories.map((item, index) => (
              <div key={item.id || item.name} className="flex items-center gap-4">
                <span className={`cms-numeric flex size-8 items-center justify-center rounded-full text-xs font-bold ${index === 0 ? 'bg-primary text-white' : 'bg-primary/20 text-primary'}`}>
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold">{item.name}</p>
                  <p className="text-[10px] font-medium text-slate-400">
                    {
                      articles.filter((article) => (
                        String(article.category || '')
                          .trim()
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-') ===
                        String(item.slug || item.name || '')
                          .trim()
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                      )).length
                    }{' '}
                    articles
                  </p>
                </div>
              </div>
            ))}
          </div>
          <AppLink
            to="/admin/analytics/categories"
            className="mt-6 flex items-center justify-center gap-1 text-sm font-bold text-primary hover:underline"
          >
            View All Categories <Icon name="chevron_right" className="h-4 w-4" />
          </AppLink>
        </div>

        <div className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold">Recent Articles</h3>
            <button type="button" className="text-sm font-medium text-slate-500 transition-colors hover:text-primary">
              Filter by Author
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="cms-numeric w-full text-left">
              <thead>
                <tr className="border-b border-primary/10 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <th className="px-2 pb-3">Article Title</th>
                  <th className="px-2 pb-3">Author</th>
                  <th className="px-2 pb-3">Category</th>
                  <th className="px-2 pb-3">Status</th>
                  <th className="px-2 pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5 text-sm">
                {recentArticles.map((article) => (
                  <tr key={article.id || article.slug || article.title} className="group transition-colors hover:bg-primary/5">
                    <td className="px-2 py-4">
                      <p className="line-clamp-1 font-bold">{article.title}</p>
                      <p className="mt-0.5 text-[10px] text-slate-400">{article.slug ? `/${article.slug}` : '-'}</p>
                    </td>
                    <td className="px-2 py-4">{article.author}</td>
                    <td className="px-2 py-4">{article.category || '-'}</td>
                    <td className="px-2 py-4">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                        {article.status}
                      </span>
                    </td>
                    <td className="px-2 py-4">{article.publishDate || article.date || article.publishedAt || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-primary/10 bg-white/50 p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        <p>© 2023 The Daily Observer CMS. All rights reserved.</p>
        <div className="flex flex-wrap gap-6">
          <a href="#" className="transition-colors hover:text-primary">
            System Status: Healthy
          </a>
          <a href="#" className="transition-colors hover:text-primary">
            Data Privacy
          </a>
          <a href="#" className="transition-colors hover:text-primary">
            Support Portal
          </a>
        </div>
      </footer>
    </section>
  )
}

export default AdminAnalyticsPage
