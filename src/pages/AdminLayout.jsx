import { useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../components/admin/AdminHeader'
import AdminSidebar from '../components/admin/AdminSidebar'
import useItalicizeNumbers from '../hooks/useItalicizeNumbers'

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const shellRef = useRef(null)

  useItalicizeNumbers(shellRef)

  return (
    <div ref={shellRef} className="cms-shell flex min-h-screen w-full bg-white font-display text-slate-900">
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
