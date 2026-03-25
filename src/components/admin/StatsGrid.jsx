import { adminStats } from '../../data/adminData'
import Icon from '../ui/Icon'

function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {adminStats.map((stat) => (
        <article key={stat.title} className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <span className="text-primary">
              <Icon name={stat.icon} className="h-5 w-5" />
            </span>
            <span className={[
              'cms-numeric',
              'flex items-center text-xs font-bold',
              stat.deltaType === 'up' ? 'text-emerald-600' : 'text-slate-400',
            ].join(' ')}>
              {stat.delta}
              <Icon name={stat.deltaType === 'up' ? 'trending_up' : 'remove'} className="ml-1 h-3.5 w-3.5" />
            </span>
          </div>
          <p className="mb-1 text-sm font-medium text-slate-500">{stat.title}</p>
          <h3 className="cms-numeric text-3xl font-bold">{stat.value}</h3>
        </article>
      ))}
    </div>
  )
}

export default StatsGrid
