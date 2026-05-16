import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Icon from '../components/ui/Icon'
import {
  createCategory,
  deleteCategory,
  fetchAdminCategories,
  toggleCategoryStatus,
  updateCategory,
} from '../../app/categories/categoriesSlice'

function Toggle({ checked = false, onChange }) {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={onChange} />
      <div className="h-5 w-10 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full" />
    </label>
  )
}

function AdminCategoriesPage() {
  const dispatch = useDispatch()
  const { categories, stats, pagination, loading, error } = useSelector((state) => state.categories)

  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [page, setPage] = useState(1)
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    color: 'bg-blue-600',
    isFeatured: false,
    isPublic: true,
    isActive: true,
  })
  const [editingId, setEditingId] = useState(null)
  const colorOptions = ['bg-red-600', 'bg-blue-600', 'bg-green-600', 'bg-yellow-500', 'bg-purple-600', 'bg-slate-600']

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput)
      setPage(1)
    }, 400)

    return () => clearTimeout(timer)
  }, [searchInput])

  useEffect(() => {
    dispatch(fetchAdminCategories({ search, page, limit: 10 }))
  }, [dispatch, search, page])

  function handleSubmit(e) {
    e.preventDefault()

    if (!form.name.trim() || !form.slug.trim()) {
      return
    }

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      description: form.description.trim(),
      color: form.color,
      is_featured: form.isFeatured,
      is_public: form.isPublic,
      is_active: form.isActive,
      articles_count: 0,
    }

    if (editingId) {
      dispatch(updateCategory({ id: editingId, data: payload }))
    } else {
      dispatch(createCategory(payload))
    }

    setForm({
      name: '',
      slug: '',
      description: '',
      color: 'bg-blue-600',
      isFeatured: false,
      isPublic: true,
      isActive: true,
    })
    setEditingId(null)
  }

  function handleEdit(category) {
    setEditingId(category.id)
    setForm({
      name: category.name || '',
      slug: (category.slug || '').replace(/^\//, ''),
      description: category.description || '',
      color: category.color || 'bg-blue-600',
      isFeatured: Boolean(category.is_featured),
      isPublic: category.is_public !== false,
      isActive: category.is_active !== false,
    })
  }

  function handleDelete(id) {
    dispatch(deleteCategory(id))
  }

  function handleToggle(id) {
    dispatch(toggleCategoryStatus(id))
  }

  const statsCards = [
    ['Total Categories', stats?.total_categories ?? categories.length ?? 0],
    ['Active Now', stats?.active_categories ?? categories.filter((item) => item.is_active).length],
    ['Articles Covered', stats?.total_articles ?? 0],
    ['Orphaned Tags', stats?.orphaned_tags ?? 0],
  ]

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Category Management</h1>
        <div className="relative hidden sm:block">
          <Icon name="search" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search categories..."
            className="admin-search w-64 py-1.5 pl-10 pr-4"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value)
            }}
          />
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statsCards.map(([label, value]) => (
          <article key={label} className="rounded-xl border border-primary/5 bg-white p-4 shadow-sm">
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-500">{label}</p>
            <p className="text-2xl font-black text-primary">{value}</p>
          </article>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-bold">Existing Categories</h3>
            <div className="flex gap-2">
              <button type="button" className="rounded border border-primary/20 px-3 py-1 text-xs font-bold hover:bg-primary/5">
                Export CSV
              </button>
              <button type="button" className="rounded border border-primary/20 px-3 py-1 text-xs font-bold hover:bg-primary/5">
                Bulk Actions
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="border-b border-primary/10 bg-background-light text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Category Name</th>
                    <th className="px-6 py-4">Slug</th>
                    <th className="px-6 py-4">Featured</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Articles</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {categories.map((item) => (
                    <tr key={item.id}>
                      <td className="flex items-center gap-3 px-6 py-4 font-bold text-primary">
                        <div className={`size-2 rounded-full ${item.color || 'bg-blue-600'}`} />
                        {item.name}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">/{(item.slug || '').replace(/^\//, '')}</td>
                      <td className="px-6 py-4">
                        {item.is_featured ? (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">
                            Featured
                          </span>
                        ) : (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-500">
                            Standard
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                            item.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {item.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-medium">{item.articles_count ?? 0}</td>
                      <td className="space-x-3 px-6 py-4 text-right">
                        <button
                          type="button"
                          className="text-slate-400 transition-colors hover:text-primary"
                          onClick={() => handleEdit(item)}
                        >
                          <Icon name="edit_note" className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          className="text-slate-400 transition-colors hover:text-primary"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Icon name="delete" className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggle(item.id)}
                          className="text-slate-400 transition-colors hover:text-primary"
                          title={item.is_active ? 'Set category inactive' : 'Set category active'}
                        >
                          <Icon name={item.is_active ? 'visibility' : 'cancel'} className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {!loading && categories.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-sm text-slate-500">
                        No categories found.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-primary/10 bg-background-light px-6 py-4">
              <span className="text-xs font-medium text-slate-500">
                {loading
                  ? 'Loading categories...'
                  : `Showing ${categories.length} of ${pagination?.total || categories.length} categories`}
              </span>
              <div className="flex gap-1">
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
                  disabled={!pagination?.hasNextPage || loading}
                >
                  <Icon name="chevron_right" className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold">{editingId ? 'Edit Category' : 'Add New Category'}</h3>
          <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Title</label>
              <input
                type="text"
                placeholder="e.g. World News"
                className="admin-input p-2.5"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">URL Slug</label>
              <div className="flex items-stretch">
                <span className="flex items-center border border-r-0 border-primary/10 bg-background-light px-3 text-xs text-slate-400">/</span>
                <input
                  type="text"
                  placeholder="world-news"
                  className="admin-input rounded-l-none p-2.5"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Description</label>
              <textarea
                rows={3}
                placeholder="Brief overview of this category content..."
                className="admin-textarea p-2.5"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Visual Marker</label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`size-8 rounded-full ${color} ${form.color === color ? 'ring-2 ring-offset-2 ring-slate-900/30' : ''}`}
                    onClick={() => setForm({ ...form, color })}
                    title={color}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4 border-t border-primary/5 pt-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold">Featured Category</p>
                  <p className="text-[11px] text-slate-500">Show in main homepage navigation and hero sections.</p>
                </div>
                <Toggle checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold">Public Accessibility</p>
                  <p className="text-[11px] text-slate-500">Enable RSS feeds and social sharing for this tag.</p>
                </div>
                <Toggle checked={form.isPublic} onChange={(e) => setForm({ ...form, isPublic: e.target.checked })} />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold">Active Status</p>
                  <p className="text-[11px] text-slate-500">Control whether this category is visible in the site.</p>
                </div>
                <Toggle checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-bold text-white transition-all hover:brightness-110 disabled:opacity-50"
              disabled={loading}
            >
              <Icon name="add" className="h-4 w-4" />
              {editingId ? 'Update Category' : 'Create Category'}
            </button>
            {editingId ? (
              <button
                type="button"
                className="w-full rounded-lg border border-primary/20 py-3 text-sm font-bold text-primary"
                onClick={() => {
                  setEditingId(null)
                  setForm({
                    name: '',
                    slug: '',
                    description: '',
                    color: 'bg-blue-600',
                    isFeatured: false,
                    isPublic: true,
                    isActive: true,
                  })
                }}
              >
                Cancel Edit
              </button>
            ) : null}
          </form>

          <div className="rounded-xl border border-primary/10 bg-primary/5 p-4">
            <div className="flex gap-3">
              <Icon name="description" className="h-4 w-4 text-primary" />
              <p className="text-xs leading-relaxed text-primary/80">
                <strong>Tip:</strong> Ensure your slug is SEO-friendly. Changing slugs later may cause broken links for indexed articles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminCategoriesPage
