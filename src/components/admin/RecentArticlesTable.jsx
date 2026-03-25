import { recentArticles } from '../../data/adminData'
import Icon from '../ui/Icon'

const statusClassMap = {
  Published: 'bg-emerald-100 text-emerald-700',
  Draft: 'bg-amber-100 text-amber-700',
  Scheduled: 'bg-blue-100 text-blue-700',
}

const statusDotClassMap = {
  Published: 'bg-emerald-500',
  Draft: 'bg-amber-500',
  Scheduled: 'bg-blue-500',
}

function RecentArticlesTable() {
  return (
    <section className="overflow-hidden rounded-xl border border-primary/5 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-primary/5 p-6">
        <h3 className="text-lg font-bold">Recent Articles</h3>
        <div className="flex gap-2">
          <button type="button" className="rounded border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-50">
            <Icon name="filter_list" className="h-5 w-5" />
          </button>
          <button type="button" className="rounded border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-50">
            <Icon name="download" className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="cms-numeric w-full text-left">
          <thead>
            <tr className="border-b border-primary/5 bg-background-light/50">
              {['Title', 'Author', 'Category', 'Status', 'Date'].map((heading) => (
                <th key={heading} className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">{heading}</th>
              ))}
              <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-widest text-slate-400">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-primary/5">
            {recentArticles.map((item) => (
              <tr key={item.slug} className="group transition-colors hover:bg-background-light">
                <td className="px-6 py-4">
                  <p className="text-sm font-bold leading-tight text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-500">Slug: {item.slug}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${item.authorImage})` }} />
                    <span className="text-sm">{item.author}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">{item.category}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${statusClassMap[item.status]}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${statusDotClassMap[item.status]}`} />
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-500">{item.date}</td>
                <td className="px-6 py-4 text-right">
                  <button type="button" className="text-slate-400 transition-colors hover:text-primary">
                    <Icon name="more_vert" className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-primary/5 bg-background-light/30 p-6">
        <span className="cms-numeric text-xs font-medium uppercase tracking-widest text-slate-500">Showing 3 of 1,240 results</span>
        <div className="flex gap-2">
          <button type="button" disabled className="rounded border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold disabled:opacity-50">Previous</button>
          <button type="button" className="rounded border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold transition-colors hover:bg-slate-50">Next</button>
        </div>
      </div>
    </section>
  )
}

export default RecentArticlesTable
