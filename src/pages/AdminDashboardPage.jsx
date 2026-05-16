import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AnalyticsSection from '../components/admin/AnalyticsSection'
import RecentArticlesTable from '../components/admin/RecentArticlesTable'
import StatsGrid from '../components/admin/StatsGrid'
import { fetchAdminDashboard } from '../../app/Dashboard/dashboardSlice'
import { fetchArticles } from '../../app/articles/articleSlice'

function AdminDashboardPage() {
  const dispatch = useDispatch()
  const { stats, summary, trafficOverview, loading, error } = useSelector((state) => state.adminDashboard)
  const { articles } = useSelector((state) => state.articles)

  useEffect(() => {
    dispatch(fetchAdminDashboard())
    dispatch(fetchArticles({ page: 1, limit: 5 }))
  }, [dispatch])

  return (
    <section className="space-y-8" aria-label="Admin dashboard overview">
      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {loading ? <p className="text-sm text-slate-500">Loading dashboard...</p> : null}

      <StatsGrid stats={stats} />
      <AnalyticsSection trafficOverview={trafficOverview} summary={summary} />
      <RecentArticlesTable articles={articles} />
    </section>
  )
}

export default AdminDashboardPage
