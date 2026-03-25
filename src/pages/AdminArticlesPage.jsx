import { recentArticles } from '../data/adminData'
import { AppLink } from '../components/ui/AppLink'
import Icon from '../components/ui/Icon'

function AdminArticlesPage() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">Articles</h1>
          <p className="text-xs text-slate-500 sm:text-sm">Manage drafts, scheduled posts, and published stories.</p>
        </div>
        <AppLink to="/admin/articles/new" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">
          <Icon name="add" className="h-4 w-4" /> New Article
        </AppLink>
      </div>

      <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              {['Title', 'Author', 'Category', 'Status', 'Date'].map((header) => (
                <th key={header} className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/5">
            {recentArticles.map((item) => (
              <tr key={item.slug}>
                <td className="px-5 py-4">
                  <p className="text-sm font-bold">{item.title}</p>
                  <p className="text-xs text-slate-500">/{item.slug}</p>
                </td>
                <td className="px-5 py-4 text-sm">{item.author}</td>
                <td className="px-5 py-4 text-sm">{item.category}</td>
                <td className="px-5 py-4 text-sm">{item.status}</td>
                <td className="px-5 py-4 text-sm text-slate-500">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AdminArticlesPage
