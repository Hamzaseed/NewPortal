import { useState } from 'react'
import Icon from '../components/ui/Icon'

const stats = [
  ['Total Categories', '24'],
  ['Active Now', '18'],
  ['Articles Covered', '12.4k'],
  ['Orphaned Tags', '0'],
]

const categories = [
  { name: 'Politics', dot: 'bg-red-600', slug: '/politics', status: 'Active', statusClass: 'bg-green-100 text-green-700', articles: '4,201' },
  { name: 'Tech', dot: 'bg-blue-600', slug: '/technology', status: 'Active', statusClass: 'bg-green-100 text-green-700', articles: '2,856' },
  { name: 'Sports', dot: 'bg-green-600', slug: '/sports', status: 'Active', statusClass: 'bg-green-100 text-green-700', articles: '3,102' },
  { name: 'Opinion', dot: 'bg-orange-600', slug: '/opinion', status: 'Archived', statusClass: 'bg-slate-100 text-slate-500', articles: '1,240' },
  { name: 'Lifestyle', dot: 'bg-purple-600', slug: '/lifestyle', status: 'Active', statusClass: 'bg-green-100 text-green-700', articles: '943' },
]

function getCategoryStatus(isActive) {
  return isActive
    ? { status: 'Active', statusClass: 'bg-green-100 text-green-700' }
    : { status: 'Inactive', statusClass: 'bg-slate-100 text-slate-500' }
}

function Toggle({ defaultChecked = false }) {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input type="checkbox" className="peer sr-only" defaultChecked={defaultChecked} />
      <div className="h-5 w-10 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full" />
    </label>
  )
}

function AdminCategoriesPage() {
  const [categoryRows, setCategoryRows] = useState(() =>
    categories.map((item) => ({
      ...item,
      isActive: item.status === 'Active',
    })),
  )

  function handleToggleCategory(name) {
    setCategoryRows((current) =>
      current.map((item) => {
        if (item.name !== name) {
          return item
        }

        const nextIsActive = !item.isActive
        return {
          ...item,
          isActive: nextIsActive,
          ...getCategoryStatus(nextIsActive),
        }
      }),
    )
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Category Management</h1>
        <div className="relative hidden sm:block">
          <Icon name="search" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search categories..." className="admin-search w-64 py-1.5 pl-10 pr-4" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value]) => (
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
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Articles</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {categoryRows.map((item) => (
                    <tr key={item.name}>
                      <td className="flex items-center gap-3 px-6 py-4 font-bold text-primary">
                        <div className={`size-2 rounded-full ${item.dot}`} />
                        {item.name}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">{item.slug}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${item.statusClass}`}>{item.status}</span>
                      </td>
                      <td className="px-6 py-4 text-center font-medium">{item.articles}</td>
                      <td className="space-x-3 px-6 py-4 text-right">
                        <button type="button" className="text-slate-400 transition-colors hover:text-primary">
                          <Icon name="edit_note" className="h-4 w-4" />
                        </button>
                        <button type="button" className="text-slate-400 transition-colors hover:text-primary">
                          <Icon name="delete" className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleCategory(item.name)}
                          className="text-slate-400 transition-colors hover:text-primary"
                          title={item.isActive ? 'Set category inactive' : 'Set category active'}
                        >
                          <Icon name={item.isActive ? 'visibility' : 'cancel'} className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-primary/10 bg-background-light px-6 py-4">
              <span className="text-xs font-medium text-slate-500">Showing 5 of 24 categories</span>
              <div className="flex gap-1">
                <button type="button" className="flex size-8 items-center justify-center rounded border border-primary/10 transition-colors hover:bg-white">
                  <Icon name="chevron_left" className="h-4 w-4" />
                </button>
                <button type="button" className="flex size-8 items-center justify-center rounded bg-primary text-xs font-bold text-white">
                  1
                </button>
                <button type="button" className="flex size-8 items-center justify-center rounded border border-primary/10 text-xs font-bold transition-colors hover:bg-white">
                  2
                </button>
                <button type="button" className="flex size-8 items-center justify-center rounded border border-primary/10 text-xs font-bold transition-colors hover:bg-white">
                  3
                </button>
                <button type="button" className="flex size-8 items-center justify-center rounded border border-primary/10 transition-colors hover:bg-white">
                  <Icon name="chevron_right" className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold">Add New Category</h3>
          <div className="space-y-5 rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Title</label>
              <input type="text" placeholder="e.g. World News" className="admin-input p-2.5" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">URL Slug</label>
              <div className="flex items-stretch">
                <span className="flex items-center border border-r-0 border-primary/10 bg-background-light px-3 text-xs text-slate-400">/</span>
                <input type="text" placeholder="world-news" className="admin-input rounded-l-none p-2.5" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Description</label>
              <textarea rows={3} placeholder="Brief overview of this category content..." className="admin-textarea p-2.5" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Visual Marker</label>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="size-8 rounded-full bg-red-600 ring-2 ring-red-600 ring-offset-2" />
                <button type="button" className="size-8 rounded-full bg-blue-600 hover:ring-2 hover:ring-blue-600/50 hover:ring-offset-2" />
                <button type="button" className="size-8 rounded-full bg-green-600 hover:ring-2 hover:ring-green-600/50 hover:ring-offset-2" />
                <button type="button" className="size-8 rounded-full bg-yellow-500 hover:ring-2 hover:ring-yellow-500/50 hover:ring-offset-2" />
                <button type="button" className="size-8 rounded-full bg-purple-600 hover:ring-2 hover:ring-purple-600/50 hover:ring-offset-2" />
                <button type="button" className="flex size-8 items-center justify-center rounded-full bg-slate-300">
                  <Icon name="settings" className="h-4 w-4 text-slate-600" />
                </button>
              </div>
            </div>

            <div className="space-y-4 border-t border-primary/5 pt-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold">Featured Category</p>
                  <p className="text-[11px] text-slate-500">Show in main homepage navigation and hero sections.</p>
                </div>
                <Toggle defaultChecked />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold">Public Accessibility</p>
                  <p className="text-[11px] text-slate-500">Enable RSS feeds and social sharing for this tag.</p>
                </div>
                <Toggle />
              </div>
            </div>

            <button type="button" className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-bold text-white transition-all hover:brightness-110">
              <Icon name="add" className="h-4 w-4" />
              Create Category
            </button>
          </div>

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
