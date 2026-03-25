import AnalyticsSection from '../components/admin/AnalyticsSection'
import RecentArticlesTable from '../components/admin/RecentArticlesTable'
import StatsGrid from '../components/admin/StatsGrid'

function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <StatsGrid />
      <AnalyticsSection />
      <RecentArticlesTable />
    </div>
  )
}

export default AdminDashboardPage
