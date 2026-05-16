import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppLink } from '../components/ui/AppLink'
import Icon from '../components/ui/Icon'
import { deleteArticle, fetchArticles } from '../../app/articles/articleSlice'

function AdminArticlesPage() {
  const dispatch = useDispatch()
  const { articles, pagination, loading, error } = useSelector((state) => state.articles)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(fetchArticles({ page, limit: 10 }))
  }, [dispatch, page])

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">Articles</h1>
          <p className="text-xs text-slate-500 sm:text-sm">Manage drafts, review-ready posts, and published stories.</p>
        </div>
        <div className="flex items-center gap-2">
          <AppLink to="/admin/articles/new" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">
            <Icon name="add" className="h-4 w-4" /> New Article
          </AppLink>
          <AppLink
            to="/admin/videos/new"
            className="flex items-center gap-2 rounded-lg border border-primary/20 bg-white px-4 py-2 text-sm font-bold text-primary transition hover:border-primary hover:bg-primary/5"
          >
            <Icon name="play_circle" className="h-4 w-4" /> New Video
          </AppLink>
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-slate-50">
              <tr>
                {['Title', 'Author', 'Category', 'Status', 'Action'].map((header) => (
                  <th key={header} className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {articles.map((item) => (
                <tr key={item.id || item.slug}>
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold">{item.title}</p>
                    <p className="text-xs text-slate-500">/{item.slug}</p>
                  </td>
                  <td className="px-5 py-4 text-sm">{item.author}</td>
                  <td className="px-5 py-4 text-sm">{item.category}</td>
                  <td className="px-5 py-4 text-sm">{item.status}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <AppLink
                        to={`/admin/articles/${item.id}/edit`}
                        className="rounded-lg border border-primary/20 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-primary transition hover:bg-primary/5"
                      >
                        Edit
                      </AppLink>
                      <button
                        type="button"
                        onClick={() => dispatch(deleteArticle(item.id))}
                        className="rounded-lg border border-rose-200 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-rose-700 transition hover:bg-rose-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && articles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-sm text-slate-500">
                    No articles found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-primary/10 bg-slate-50 px-5 py-4">
          <span className="text-xs font-medium text-slate-500">
            {loading
              ? 'Loading articles...'
              : `Showing ${articles.length} of ${pagination?.total_articles || articles.length} articles`}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded border border-primary/10 transition-colors hover:bg-white disabled:opacity-50"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1 || loading}
            >
              <Icon name="chevron_left" className="h-4 w-4" />
            </button>
            <button type="button" className="flex size-8 items-center justify-center rounded bg-primary text-xs font-bold text-white">
              {page}
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded border border-primary/10 transition-colors hover:bg-white disabled:opacity-50"
              onClick={() => setPage((current) => current + 1)}
              disabled={page >= (pagination?.total_pages || 1) || loading}
            >
              <Icon name="chevron_right" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminArticlesPage
