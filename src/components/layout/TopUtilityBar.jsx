import { useSearch } from '../../context/SearchContext'
import { AppLink } from '../ui/AppLink'
import Icon from '../ui/Icon'
function TopUtilityBar() {
  const { openSearch } = useSearch()
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="container-shell flex flex-col gap-2 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600 sm:h-10 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:py-0 sm:text-[11px] sm:tracking-[0.22em]">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="flex min-w-0 items-center gap-2">
            <Icon name="calendar_today" className="h-3.5 w-3.5" />
            <span className="truncate">{today}</span>
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-6">
          <a href="#" className="transition hover:text-primary">
            E-Paper
          </a>
          <a href="#" className="hidden transition hover:text-primary sm:inline">
            Newsletter
          </a>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openSearch('site')}
              className="inline-flex items-center justify-center rounded p-1 transition hover:bg-slate-100 hover:text-primary"
              aria-label="Search"
            >
              <Icon name="search" className="h-4 w-4" />
            </button>
            <AppLink
              to="/subscriptions"
              className="rounded bg-primary px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-white transition hover:bg-primary/90"
            >
              Subscribe
            </AppLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopUtilityBar
