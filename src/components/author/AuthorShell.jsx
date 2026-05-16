import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearch } from '../../context/SearchContext'
import { useAuth } from '../../context/AuthContext'
import { AUTHOR_NAV_ITEMS } from '../../constants/navigation'
import { AppLink, AppNavLink } from '../ui/AppLink'
import Icon from '../ui/Icon'
import ProfileMenu from '../ui/ProfileMenu'

function navClass(isActive) {
  return [
    'flex items-center gap-3 rounded px-3 py-2.5 transition-colors',
    isActive ? 'bg-primary text-white' : 'hover:bg-white/10',
  ].join(' ')
}

function AuthorShell({ eyebrow, title, description, actions, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { openSearch } = useSearch()
  const { user, logout } = useAuth()
  const displayUser = !user
    ? {
        name: 'Author',
        role: 'Author Workspace',
        email: '',
        avatar: '',
      }
    : {
        name: `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim() || 'Author',
        role: user.role === 'author' ? 'Author Workspace' : 'Editorial Workspace',
        email: user.email ?? '',
        avatar: user.avatar || '',
      }

  return (
    <div className="cms-shell flex min-h-screen w-full bg-white font-display text-slate-900">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <button
        type="button"
        aria-label="Close sidebar"
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity lg:hidden ${sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-shrink-0 flex-col border-r border-slate-700 bg-slate-900 text-slate-100 transition-transform lg:sticky lg:top-0 lg:z-auto lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between gap-3 p-6 lg:justify-start">
          <div className="flex items-center">
            <div className="flex flex-col">
              <h1 className="text-lg font-bold leading-tight">Editorial Desk</h1>
              <p className="text-xs text-slate-400">Editorial workspace</p>
            </div>
          </div>

          <button type="button" onClick={() => setSidebarOpen(false)} className="cms-round rounded-full p-1 text-slate-300 hover:bg-white/10 lg:hidden">
            <Icon name="close" className="h-5 w-5" />
          </button>
        </header>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4">
          {AUTHOR_NAV_ITEMS.map((item) => (
            <AppNavLink key={item.label} to={item.path} onClick={() => setSidebarOpen(false)} className={({ isActive }) => navClass(isActive)}>
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </AppNavLink>
          ))}
        </nav>

        <footer className="border-t border-slate-700 p-4">
          <div className="mb-3 grid gap-2">
            <AppLink
              to="/author/articles/new"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-primary/90"
            >
              <Icon name="add" className="h-4 w-4" />
              New Article
            </AppLink>
          </div>

          <AppLink
            to="/newsroom"
            onClick={() => setSidebarOpen(false)}
            className="mb-3 flex items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/10 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-primary/20"
          >
            <Icon name="chevron_left" className="h-4 w-4" />
            Back To Home
          </AppLink>

          <div className="mb-3 flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-full border border-primary/30 bg-primary/20 bg-cover bg-center" style={{ backgroundImage: `url(${displayUser.avatar})` }} />
            <div className="flex min-w-0 flex-col">
              <p className="truncate text-sm font-medium">{displayUser.name}</p>
              <p className="truncate text-[10px] uppercase tracking-wider text-slate-400">{displayUser.role}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-2 rounded px-2 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <Icon name="logout" className="h-4 w-4" />
            Logout
          </button>
        </footer>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col overflow-visible bg-white">
        <header className="relative z-20 flex h-16 items-center justify-between overflow-visible border-b border-primary/10 bg-white px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="cms-round rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-50 lg:hidden"
              aria-label="Open menu"
            >
              <Icon name="menu" className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => openSearch('author')}
              className="group relative hidden w-full max-w-xl items-center rounded border border-slate-200 bg-white px-3 py-2 text-left sm:flex"
            >
              <Icon name="search" className="mr-2 h-5 w-5 text-slate-400 transition group-hover:text-primary" />
              <span className="text-sm text-slate-500">Search drafts, articles, analytics or comments...</span>
            </button>
          </div>

          <div className="flex items-center gap-1 sm:gap-3">
            <button type="button" className="relative rounded p-2 text-slate-600 transition-colors hover:bg-slate-50">
              <Icon name="notifications" className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-primary" />
            </button>

            <button
              type="button"
              onClick={() => openSearch('author')}
              className="rounded p-2 text-slate-600 transition-colors hover:bg-slate-50 sm:hidden"
              aria-label="Open search"
            >
              <Icon name="search" className="h-5 w-5" />
            </button>

            <ProfileMenu />

            <AppLink
              to="/author/articles"
              className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-bold text-white transition-all hover:bg-primary/90 sm:px-4"
            >
              <Icon name="add" className="h-4 w-4" />
              <span className="hidden sm:inline">My Articles</span>
            </AppLink>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-white p-4 sm:p-6 lg:p-8">
          <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">{eyebrow}</p>
              <h1 className="mt-1 text-xl font-bold sm:text-2xl">{title}</h1>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">{description}</p>
            </div>
            {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
          </header>

          {children}
        </div>
      </main>
    </div>
  )
}

export default AuthorShell
