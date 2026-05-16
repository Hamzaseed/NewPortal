import { useEffect, useState } from 'react'
import Icon from '../components/ui/Icon'

const defaultPackages = [
  {
    id: 1,
    name: 'Digital Starter',
    description: 'Daily stories, market briefs, and saved articles for one reader.',
    monthlyPrice: '9',
    monthlySalePrice: '6',
    yearlyPrice: '90',
    yearlySalePrice: '70',
    badge: 'Popular',
    features: 'Unlimited articles, Daily newsletter, Save stories',
    active: true,
  },
  {
    id: 2,
    name: 'Editorial Plus',
    description: 'Full access to premium reporting, videos, and archive coverage.',
    monthlyPrice: '19',
    monthlySalePrice: '14',
    yearlyPrice: '190',
    yearlySalePrice: '149',
    badge: 'Best Value',
    features: 'Premium articles, Video access, Archive access, Weekly insights',
    active: true,
  },
]

function AdminSubscriptionPackagesPage() {
  const [packages, setPackages] = useState(() => {
    const savedPackages = localStorage.getItem('subscription_packages')

    if (savedPackages) {
      return JSON.parse(savedPackages)
    }

    return defaultPackages
  })
  const [form, setForm] = useState({
    name: '',
    description: '',
    monthlyPrice: '',
    monthlySalePrice: '',
    yearlyPrice: '',
    yearlySalePrice: '',
    badge: '',
    features: '',
    active: true,
  })
  const [previewBilling, setPreviewBilling] = useState('monthly')

  useEffect(() => {
    localStorage.setItem('subscription_packages', JSON.stringify(packages))
  }, [packages])

  function handleSubmit(event) {
    event.preventDefault()

    if (!form.name || !form.monthlyPrice || !form.yearlyPrice) {
      return
    }

    setPackages([
      ...packages,
      {
        ...form,
        id: Date.now(),
      },
    ])
    setForm({
      name: '',
      description: '',
      monthlyPrice: '',
      monthlySalePrice: '',
      yearlyPrice: '',
      yearlySalePrice: '',
      badge: '',
      features: '',
      active: true,
    })
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl">Subscription Packages</h1>
          <p className="max-w-2xl text-base text-slate-600">
            Create reader subscription offers, add sale prices, and publish the packages customers can choose from.
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <form onSubmit={handleSubmit} className="rounded-xl border border-primary/10 bg-white p-5 shadow-sm">
          <h2 className="mb-5 text-xl font-black text-slate-900">Create Package</h2>

          <div className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm font-bold text-slate-700">Package Name</span>
              <input
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                className="admin-input w-full rounded border border-primary/10 bg-primary/5 px-3 py-2 text-sm"
                placeholder="Digital Annual"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-bold text-slate-700">Description</span>
              <textarea
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
                className="admin-input min-h-24 w-full rounded border border-primary/10 bg-primary/5 px-3 py-2 text-sm"
                placeholder="Short package detail for readers"
              />
            </label>

            <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
              <h3 className="mb-3 text-sm font-black text-slate-800">Monthly Pricing</h3>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1 block text-sm font-bold text-slate-700">Monthly Price</span>
                  <input
                    value={form.monthlyPrice}
                    onChange={(event) => setForm({ ...form, monthlyPrice: event.target.value })}
                    className="admin-input w-full rounded border border-primary/10 bg-white px-3 py-2 text-sm"
                    placeholder="29"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-bold text-slate-700">Monthly Sale</span>
                  <input
                    value={form.monthlySalePrice}
                    onChange={(event) => setForm({ ...form, monthlySalePrice: event.target.value })}
                    className="admin-input w-full rounded border border-primary/10 bg-white px-3 py-2 text-sm"
                    placeholder="19"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
              <h3 className="mb-3 text-sm font-black text-slate-800">Yearly Pricing</h3>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1 block text-sm font-bold text-slate-700">Yearly Price</span>
                  <input
                    value={form.yearlyPrice}
                    onChange={(event) => setForm({ ...form, yearlyPrice: event.target.value })}
                    className="admin-input w-full rounded border border-primary/10 bg-white px-3 py-2 text-sm"
                    placeholder="290"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-bold text-slate-700">Yearly Sale</span>
                  <input
                    value={form.yearlySalePrice}
                    onChange={(event) => setForm({ ...form, yearlySalePrice: event.target.value })}
                    className="admin-input w-full rounded border border-primary/10 bg-white px-3 py-2 text-sm"
                    placeholder="199"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block">
                <span className="mb-1 block text-sm font-bold text-slate-700">Badge</span>
                <input
                  value={form.badge}
                  onChange={(event) => setForm({ ...form, badge: event.target.value })}
                  className="admin-input w-full rounded border border-primary/10 bg-primary/5 px-3 py-2 text-sm"
                  placeholder="Sale"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1 block text-sm font-bold text-slate-700">Features</span>
              <textarea
                value={form.features}
                onChange={(event) => setForm({ ...form, features: event.target.value })}
                className="admin-input min-h-24 w-full rounded border border-primary/10 bg-primary/5 px-3 py-2 text-sm"
                placeholder="Premium articles, Videos, Archive access"
              />
            </label>

            <label className="flex items-center gap-3 rounded border border-primary/10 bg-primary/5 px-3 py-2 text-sm font-bold text-slate-700">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(event) => setForm({ ...form, active: event.target.checked })}
                className="h-4 w-4 accent-primary"
              />
              Publish package
            </label>

            <button type="submit" className="flex h-11 w-full items-center justify-center rounded bg-primary px-5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90">
              <Icon name="add" className="mr-2 h-5 w-5" />
              Add Package
            </button>
          </div>
        </form>

        <div className="rounded-xl border border-primary/10 bg-white p-5 shadow-sm">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-black text-slate-900">Current Packages</h2>
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
                <button
                  type="button"
                  onClick={() => setPreviewBilling('monthly')}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${previewBilling === 'monthly' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-primary'}`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewBilling('yearly')}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${previewBilling === 'yearly' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-primary'}`}
                >
                  Yearly · Save 17%
                </button>
              </div>
              <span className="rounded bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">{packages.length} total</span>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {packages.map((item) => (
              <article key={item.id} className="rounded-lg border border-primary/10 p-4">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-black text-slate-900">{item.name}</h3>
                      {item.badge ? <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">{item.badge}</span> : null}
                    </div>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPackages(packages.filter((currentPackage) => currentPackage.id !== item.id))}
                    className="flex size-9 shrink-0 items-center justify-center rounded border border-red-100 text-red-600 transition hover:bg-red-50"
                    aria-label={`Delete ${item.name}`}
                  >
                    <Icon name="delete" className="h-4 w-4" />
                  </button>
                </div>

                <div className="mb-4 flex items-end gap-2">
                  {previewBilling === 'yearly' && item.yearlySalePrice ? <span className="text-3xl font-black text-primary">${item.yearlySalePrice}</span> : null}
                  {previewBilling === 'monthly' && (item.monthlySalePrice || item.salePrice) ? <span className="text-3xl font-black text-primary">${item.monthlySalePrice || item.salePrice}</span> : null}
                  <span
                    className={`${
                      (previewBilling === 'yearly' && item.yearlySalePrice) || (previewBilling === 'monthly' && (item.monthlySalePrice || item.salePrice))
                        ? 'text-sm text-slate-400 line-through'
                        : 'text-3xl font-black text-primary'
                    }`}
                  >
                    ${previewBilling === 'yearly' ? item.yearlyPrice || item.price : item.monthlyPrice || item.price}
                  </span>
                  <span className="pb-1 text-sm font-semibold text-slate-500">/ {previewBilling === 'yearly' ? 'year' : 'month'}</span>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {item.features.split(',').map((feature) => (
                    <span key={feature} className="rounded bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">{feature.trim()}</span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setPackages(packages.map((currentPackage) => currentPackage.id === item.id ? { ...currentPackage, active: !currentPackage.active } : currentPackage))}
                  className={`rounded px-3 py-1 text-xs font-bold uppercase tracking-wider ${item.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}
                >
                  {item.active ? 'Published' : 'Hidden'}
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminSubscriptionPackagesPage
