import { useAuth } from '../../context/AuthContext'
import { ADMIN_NAV_ITEMS } from '../../constants/navigation'
import { AppLink, AppNavLink } from '../ui/AppLink'
import Icon from '../ui/Icon'

function navClass(isActive) {
  return [
    'flex items-center gap-3 rounded px-3 py-2.5 transition-colors',
    isActive ? 'bg-primary text-white' : 'hover:bg-white/10',
  ]
    .filter(Boolean)
    .join(' ')
}

function AdminSidebar({ isOpen = false, onClose }) {
  const { user } = useAuth()
  const displayName = `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim() || 'Admin'
  const displayRole = user?.role || 'Administrator'
  const avatar = user?.avatar || ''

  return (
    <>
      <button
        type="button"
        aria-label="Close sidebar"
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-shrink-0 flex-col border-r border-slate-700 bg-slate-900 text-slate-100 transition-transform lg:sticky lg:top-0 lg:z-auto lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between gap-3 p-6 lg:justify-start">
          <div className="flex items-center">
            <div className="flex flex-col">
              <h1 className="text-lg font-bold leading-tight">Editorial</h1>
              <p className="text-xs text-slate-400">CMS v2.4.0</p>
            </div>
          </div>

          <button type="button" onClick={onClose} className="cms-round rounded-full p-1 text-slate-300 hover:bg-white/10 lg:hidden">
            <Icon name="close" className="h-5 w-5" />
          </button>
        </header>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4">
          {ADMIN_NAV_ITEMS.map((item) => (
            <AppNavLink key={item.label} to={item.path} onClick={onClose} className={({ isActive }) => navClass(isActive)}>
              <Icon name={item.key} className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </AppNavLink>
          ))}

          <section className="mt-4 border-t border-slate-700 pt-4" aria-label="Sidebar settings">
            <AppNavLink to="/admin/settings" onClick={onClose} className={({ isActive }) => navClass(isActive)}>
              <Icon name="settings" className="h-5 w-5" />
              <span className="text-sm font-medium">Settings</span>
            </AppNavLink>
          </section>
        </nav>

        <footer className="border-t border-slate-700 p-4">
          <AppLink
            to="/newsroom"
            onClick={onClose}
            className="mb-3 flex items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/10 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-primary/20"
          >
            <Icon name="chevron_left" className="h-4 w-4" />
            Back To Home
          </AppLink>

          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-full border border-primary/30 bg-primary/20 bg-cover bg-center" style={{ backgroundImage: avatar ? `url(${avatar})` : 'none' }} />
            <div className="flex min-w-0 flex-col">
              <p className="truncate text-sm font-medium">{displayName}</p>
              <p className="truncate text-[10px] uppercase tracking-wider text-slate-400">{displayRole}</p>
            </div>
          </div>
        </footer>
      </aside>
    </>
  )
}

export default AdminSidebar
