import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Icon from '../components/ui/Icon'
import { fetchAdminAnalytics } from '../../app/analytics/analyticSlice'
import { fetchAdminCategories } from '../../app/categories/categoriesSlice'
import { fetchArticles } from '../../app/articles/articleSlice'

function AdminAnalyticsCategoriesPage() {
  const dispatch = useDispatch()
  const { topCategories, loading, error } = useSelector((state) => state.adminAnalytics)
  const { categories } = useSelector((state) => state.categories)
  const { articles } = useSelector((state) => state.articles)

  useEffect(() => {
    dispatch(fetchAdminAnalytics())
    dispatch(fetchAdminCategories({ page: 1, limit: 10 }))
    dispatch(fetchArticles({ page: 1, limit: 100 }))
  }, [dispatch])

  const categoryList = categories.length > 0 ? categories : topCategories

  return (
    <section className="space-y-6">
      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {loading ? <p className="text-sm text-slate-500">Loading categories...</p> : null}

      <section className="overflow-hidden rounded-2xl border border-primary/5 bg-white shadow-sm">
        <header className="border-b border-primary/10 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Editorial Readout</p>
          <h2 className="mt-2 text-2xl font-bold">All Categories At A Glance</h2>
        </header>

        <div className="overflow-x-auto">
          <table className="cms-numeric w-full min-w-[880px] text-left">
            <thead>
              <tr className="bg-background-light text-[10px] font-bold uppercase tracking-widest text-slate-500">
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Traffic Share</th>
                <th className="px-6 py-4">Growth</th>
                <th className="px-6 py-4">Articles</th>
                <th className="px-6 py-4">Engagement</th>
                <th className="px-6 py-4">Trend</th>
                <th className="px-6 py-4">Editorial Insight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5 text-sm">
              {categoryList.map((item) => (
                <tr key={item.id || item.name} className="align-top transition-colors hover:bg-primary/5">
                  <td className="px-6 py-5 font-bold text-slate-900">{item.name}</td>
                  <td className="px-6 py-5">{item.percent || 0}%</td>
                  <td className="px-6 py-5 font-bold">{item.growth || 'Stable'}</td>
                  <td className="px-6 py-5">
                    {
                      articles.filter((article) => (
                        String(article.category || '')
                          .trim()
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-') ===
                        String(item.slug || item.name || '')
                          .trim()
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                      )).length
                    }
                  </td>
                  <td className="px-6 py-5">{item.engagement || '-'}</td>
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${
                        item.trend === 'up'
                          ? 'bg-green-100 text-green-700'
                          : item.trend === 'down'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon
                        name={
                          item.trend === 'up'
                            ? 'trending_up'
                            : item.trend === 'down'
                              ? 'trending_down'
                              : 'trending_flat'
                        }
                        className="h-4 w-4"
                      />
                      {item.trend === 'up' ? 'Rising' : item.trend === 'down' ? 'Cooling' : 'Stable'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-slate-500">{item.standout || item.description || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  )
}

export default AdminAnalyticsCategoriesPage
