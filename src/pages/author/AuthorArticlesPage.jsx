import { Edit, Eye, Filter, Sparkles } from 'lucide-react'
import AuthorShell from '../../components/author/AuthorShell'
import { AppLink } from '../../components/ui/AppLink'
import { authorArticles } from '../../data/authorData'

const filters = ['All', 'Published', 'Draft', 'Scheduled']

function AuthorArticlesPage() {
  return (
    <AuthorShell
      eyebrow="Content Desk"
      title="My Articles"
      description="Manage every story from first draft to scheduled publish, with quick visibility into audience response and editorial readiness."
      actions={
        <>
          <AppLink
            to="/author/articles/new"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-primary/90"
          >
            Add Article
          </AppLink>
          <div className="flex rounded-lg border border-primary/10 bg-white p-1">
            {filters.map((filter, index) => (
              <button
                key={filter}
                type="button"
                className={`rounded px-4 py-2 text-xs font-bold ${index === 0 ? 'bg-primary text-white' : 'text-slate-500 transition hover:text-slate-900'}`}
              >
                {filter}
              </button>
            ))}
          </div>
          <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-primary/10 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-primary/30 hover:text-primary">
            <Filter className="h-4 w-4" />
            Filter View
          </button>
        </>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="cms-numeric w-full min-w-[680px] text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">Title</th>
                <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">Category</th>
                <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">Status</th>
                <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">Views</th>
                <th className="hidden px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 md:table-cell">Comments</th>
                <th className="hidden px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 lg:table-cell">SEO</th>
                <th className="hidden px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 xl:table-cell">Date</th>
                <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {authorArticles.map((article) => (
                <tr key={article.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={article.image} alt={article.title} className="h-12 w-12 rounded-lg object-cover" />
                      <div>
                        <p className="text-sm font-bold text-slate-900">{article.title}</p>
                        <p className="text-xs text-slate-500">{article.readTime}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-700">{article.category}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
                        article.status === 'Published'
                          ? 'bg-primary/10 text-primary'
                          : article.status === 'Draft'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {article.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-700">{article.views}</td>
                  <td className="hidden px-5 py-4 text-sm text-slate-700 md:table-cell">{article.comments}</td>
                  <td className="hidden px-5 py-4 text-sm text-slate-700 lg:table-cell">{article.seo}</td>
                  <td className="hidden px-5 py-4 text-sm text-slate-500 xl:table-cell">{article.date}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button type="button" className="rounded-lg p-2 text-slate-500 transition hover:bg-white hover:text-primary">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button type="button" className="rounded-lg p-2 text-slate-500 transition hover:bg-white hover:text-primary">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-3 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Editorial Checklist</p>
                <h3 className="mt-1 text-xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
                  Ready to publish
                </h3>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {[
                '2 drafts need headline polishing',
                '1 scheduled story missing social copy',
                'SEO descriptions are complete for 3/4 stories',
                'Fact-check pass pending on one article',
              ].map((item) => (
                <div key={item} className="rounded-lg bg-background-light px-4 py-3 text-sm text-slate-600">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Momentum</p>
            <h3 className="cms-numeric mt-3 text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
              3 stories
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">Published or scheduled this week, with readership pacing 21% ahead of last week.</p>
          </div>
        </aside>
      </div>
    </AuthorShell>
  )
}

export default AuthorArticlesPage
