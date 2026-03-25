import AdminHeader from '../components/admin/AdminHeader'
import AdminSidebar from '../components/admin/AdminSidebar'
import AnalyticsSection from '../components/admin/AnalyticsSection'
import RecentArticlesTable from '../components/admin/RecentArticlesTable'
import StatsGrid from '../components/admin/StatsGrid'

function AdminCmsPage() {
  return (
    <div className="flex min-h-screen w-full bg-background-light font-display text-slate-900">
      <AdminSidebar />

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <AdminHeader />

        <div className="flex-1 space-y-8 overflow-y-auto p-8">
          <StatsGrid />
          <AnalyticsSection />
          <RecentArticlesTable />
        </div>
      </main>
    </div>
  )
}

export default AdminCmsPage
