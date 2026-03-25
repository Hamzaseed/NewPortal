import { AppLink } from '../ui/AppLink'
import { useSearch } from '../../context/SearchContext'
import Icon from '../ui/Icon'
import ProfileMenu from '../ui/ProfileMenu'

function AdminHeader({ onMenuClick }) {
  const { openSearch } = useSearch()

  return (
    <header className="flex h-16 items-center justify-between border-b border-primary/10 bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
        <button type="button" onClick={onMenuClick} className="cms-round rounded-full p-2 text-slate-600 transition-colors hover:bg-background-light lg:hidden" aria-label="Open menu">
          <Icon name="menu" className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={() => openSearch('admin')}
          className="group relative hidden w-full max-w-xl items-center rounded border border-slate-200 bg-white px-3 py-2 text-left sm:flex"
        >
          <Icon name="search" className="mr-2 h-5 w-5 text-slate-400 transition group-hover:text-primary" />
          <span className="text-sm text-slate-500">Search articles, authors or logs...</span>
        </button>
      </div>

      <div className="flex items-center gap-1 sm:gap-3">
        <button type="button" className="relative rounded p-2 text-slate-600 transition-colors hover:bg-background-light">
          <Icon name="notifications" className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-primary" />
        </button>

        <button
          type="button"
          onClick={() => openSearch('admin')}
          className="rounded p-2 text-slate-600 transition-colors hover:bg-background-light sm:hidden"
          aria-label="Open search"
        >
          <Icon name="search" className="h-5 w-5" />
        </button>

        <ProfileMenu />

        <AppLink
          to="/admin/articles/new"
          className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-bold text-white transition-all hover:bg-primary/90 sm:px-4"
        >
          <Icon name="add" className="h-4 w-4" />
          <span className="hidden sm:inline">New Article</span>
        </AppLink>
      </div>
    </header>
  )
}

export default AdminHeader
