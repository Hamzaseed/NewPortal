import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import AdminHeader from '../components/admin/AdminHeader'
import AdminSidebar from '../components/admin/AdminSidebar'

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="cms-shell flex min-h-screen w-full bg-white font-display text-slate-900">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-white">
        <AdminHeader onMenuClick={() => setSidebarOpen((prev) => !prev)} />
        <div className="flex-1 overflow-y-auto bg-white p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout
