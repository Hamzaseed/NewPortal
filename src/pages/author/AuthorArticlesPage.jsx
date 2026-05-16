import { useEffect, useState } from 'react'
import { Edit, Eye, Sparkles } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import AuthorShell from '../../components/author/AuthorShell'
import { AppLink } from '../../components/ui/AppLink'
import { useAuth } from '../../context/AuthContext'
import { fetchArticles } from '../../../app/articles/articleSlice'

const filters = ['All', 'Published', 'Draft', 'Ready for review']

function AuthorArticlesPage() {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const { articles, loading, error } = useSelector((state) => state.articles)
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    dispatch(fetchArticles({ page: 1, limit: 50 }))
  }, [dispatch])

  const loggedInAuthorName = `${user?.first_name || ''} ${user?.last_name || ''}`.trim()

  const myArticles = articles.filter((article) => {
    if (user?.id && article.created_by === user.id) {
      return true
    }

    if (loggedInAuthorName && article.author === loggedInAuthorName) {
      return true
    }

    return false
  })

  const filteredArticles = myArticles.filter((article) => {
    if (activeFilter === 'All') {
      return true
    }

    return article.status === activeFilter
  })

  return (
    <AuthorShell
      eyebrow="Content Desk"
      title="My Articles"
      description="Manage every story from first draft to review and publication, with quick visibility into audience response and editorial readiness."
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
                onClick={() => setActiveFilter(filter)}
                className={`rounded px-4 py-2 text-xs font-bold ${
                  activeFilter === filter ? 'bg-primary text-white' : 'text-slate-500 transition hover:text-slate-900'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
          {error ? (
            <div className="border-b border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="overflow-x-auto">
            <table className="cms-numeric w-full min-w-[680px] text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">Title</th>
                <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">Category</th>
                <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">Status</th>
                <th className="hidden px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 lg:table-cell">Slug</th>
                <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {filteredArticles.map((article) => (
                <tr key={article.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={article.hero_image || 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=200&q=80'}
                        alt={article.title}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-sm font-bold text-slate-900">{article.title}</p>
                        <p className="text-xs text-slate-500">{article.read_time || '-'}</p>
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
                            : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {article.status}
                    </span>
                  </td>
                  <td className="hidden px-5 py-4 text-sm text-slate-700 lg:table-cell">/{article.slug}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <AppLink to={`/news/${article.slug}`} className="rounded-lg p-2 text-slate-500 transition hover:bg-white hover:text-primary">
                        <Eye className="h-4 w-4" />
                      </AppLink>
                      <AppLink to={`/author/articles/${article.id}/edit`} className="rounded-lg p-2 text-slate-500 transition hover:bg-white hover:text-primary">
                        <Edit className="h-4 w-4" />
                      </AppLink>
                    </div>
                  </td>
                </tr>
              ))}
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-sm text-slate-500">
                    Loading articles...
                  </td>
                </tr>
              ) : null}
              {!loading && filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-sm text-slate-500">
                    No articles found for this filter.
                  </td>
                </tr>
              ) : null}
            </tbody>
            </table>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
            <header className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-3 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Editorial Checklist</p>
                <h3 className="mt-1 text-xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
                  Ready to publish
                </h3>
              </div>
            </header>
            <div className="mt-6 space-y-3">
              {[
                '2 drafts need headline polishing',
                '1 story in review missing social copy',
                'SEO descriptions are complete for 3/4 stories',
                'Fact-check pass pending on one article',
              ].map((item) => (
                <article key={item} className="rounded-lg bg-background-light px-4 py-3 text-sm text-slate-600">
                  {item}
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Momentum</p>
            <h3 className="cms-numeric mt-3 text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
              {myArticles.length} stories
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">Your saved drafts, submitted reviews, and published articles are collected here.</p>
          </section>
        </aside>
      </div>
    </AuthorShell>
  )
}

export default AuthorArticlesPage
