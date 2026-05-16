import Icon from '../ui/Icon'

function StatsGrid({ stats = [] }) {
  const items = stats

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4" aria-label="Key metrics">
      {items.map((stat) => (
        <article key={stat.title} className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
          <header className="mb-4 flex items-start justify-between">
            <span className="text-primary">
              <Icon name={stat.icon} className="h-5 w-5" />
            </span>
            <span
              className={[
                'cms-numeric',
                'flex items-center text-xs font-bold',
                stat.deltaType === 'up' ? 'text-emerald-600' : 'text-slate-400',
              ].join(' ')}
            >
              {stat.delta}
              <Icon name={stat.deltaType === 'up' ? 'trending_up' : 'remove'} className="ml-1 h-3.5 w-3.5" />
            </span>
          </header>
          <p className="mb-1 text-sm font-medium text-slate-500">{stat.title}</p>
          <h3 className="cms-numeric text-3xl font-bold">{stat.value}</h3>
        </article>
      ))}
      {items.length === 0 ? (
        <article className="rounded-xl border border-primary/5 bg-white p-6 text-sm text-slate-500 shadow-sm">
          Live stats will appear here when dashboard data is available.
        </article>
      ) : null}
    </section>
  )
}

export default StatsGrid
