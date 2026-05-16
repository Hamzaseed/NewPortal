import { useMemo, useState } from 'react'
import Icon from '../components/ui/Icon'

const marketAssets = [
  { symbol: 'BTC', name: 'Bitcoin', category: 'Crypto', status: 'Live', ticker: true, watchlist: true, news: true, priority: 'High', priceSource: 'Coinbase feed' },
  { symbol: 'ETH', name: 'Ethereum', category: 'Crypto', status: 'Live', ticker: true, watchlist: true, news: true, priority: 'High', priceSource: 'Kraken feed' },
  { symbol: 'AAPL', name: 'Apple', category: 'Stocks', status: 'Live', ticker: false, watchlist: true, news: true, priority: 'Medium', priceSource: 'NASDAQ delayed' },
  { symbol: 'TSLA', name: 'Tesla', category: 'Stocks', status: 'Review', ticker: false, watchlist: true, news: true, priority: 'Medium', priceSource: 'NASDAQ delayed' },
  { symbol: 'GOLD', name: 'Gold Spot', category: 'Commodities', status: 'Live', ticker: true, watchlist: false, news: true, priority: 'Medium', priceSource: 'Metal desk composite' },
  { symbol: 'USD/PKR', name: 'US Dollar / PKR', category: 'Forex', status: 'Live', ticker: true, watchlist: true, news: false, priority: 'High', priceSource: 'FX desk reference' },
  { symbol: 'OIL', name: 'Brent Crude', category: 'Commodities', status: 'Draft', ticker: false, watchlist: false, news: true, priority: 'Low', priceSource: 'Energy futures desk' },
]

const intakeQueue = [
  { name: 'Silver Spot', symbol: 'XAG/USD', requestedBy: 'Markets Editor', note: 'Requested for metals expansion', status: 'Pending validation' },
  { name: 'NVIDIA', symbol: 'NVDA', requestedBy: 'Growth Desk', note: 'Needed for AI-heavy headline cycles', status: 'Awaiting approval' },
  { name: 'EUR/PKR', symbol: 'EUR/PKR', requestedBy: 'FX Team', note: 'Local FX comparison pair', status: 'Ready to map' },
]

const newsModules = [
  { title: 'Ticker Bar', description: 'Choose which assets scroll across the top strip.', items: '6 active assets', accent: 'bg-emerald-500' },
  { title: 'Watchlist Defaults', description: 'Control the starter symbols shown to readers.', items: '3 default assets', accent: 'bg-amber-500' },
  { title: 'News Panel', description: 'Map which asset classes should surface related stories.', items: '4 editorial rules', accent: 'bg-sky-500' },
]

function badgeClass(status) {
  if (status === 'Live') {
    return 'bg-emerald-50 text-emerald-700'
  }

  if (status === 'Review') {
    return 'bg-amber-50 text-amber-700'
  }

  if (status === 'Draft') {
    return 'bg-slate-100 text-slate-600'
  }

  return 'bg-rose-50 text-rose-700'
}

function AdminMarketsPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Crypto', 'Stocks', 'Forex', 'Commodities']

  const filteredAssets = useMemo(
    () =>
      marketAssets.filter((asset) => {
        const matchesCategory = activeCategory === 'All' || asset.category === activeCategory
        const haystack = `${asset.symbol} ${asset.name} ${asset.priceSource}`.toLowerCase()
        const matchesQuery = haystack.includes(query.trim().toLowerCase())
        return matchesCategory && matchesQuery
      }),
    [activeCategory, query],
  )

  const liveCount = marketAssets.filter((asset) => asset.status === 'Live').length
  const tickerCount = marketAssets.filter((asset) => asset.ticker).length
  const watchlistCount = marketAssets.filter((asset) => asset.watchlist).length

  return (
    <section className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Markets Admin</p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Manage the Markets page surface</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              This admin view is focused on the public markets experience only: adding assets, hiding symbols, controlling ticker visibility,
              adjusting watchlist defaults, and reviewing what should appear in the news panel.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold uppercase tracking-[0.16em] text-slate-700 transition hover:bg-slate-50">
              <Icon name="visibility" className="h-4 w-4" />
              Preview Layout
            </button>
            <button type="button" className="inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-black">
              <Icon name="add" className="h-4 w-4" />
              Create Asset
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Tracked Assets</p>
          <p className="mt-3 text-3xl font-extrabold text-slate-950">{marketAssets.length}</p>
          <p className="mt-2 text-sm text-slate-600">Symbols configured for the markets experience.</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Live Right Now</p>
          <p className="mt-3 text-3xl font-extrabold text-slate-950">{liveCount}</p>
          <p className="mt-2 text-sm text-slate-600">Assets currently marked ready for public display.</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Ticker Slots</p>
          <p className="mt-3 text-3xl font-extrabold text-slate-950">{tickerCount}</p>
          <p className="mt-2 text-sm text-slate-600">Symbols set to appear in the top market ticker.</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Default Watchlist</p>
          <p className="mt-3 text-3xl font-extrabold text-slate-950">{watchlistCount}</p>
          <p className="mt-2 text-sm text-slate-600">Assets preselected for the public watchlist panel.</p>
        </article>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.95fr)]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Asset Library</p>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-950">Inventory for the markets page</h2>
            </div>

            <label className="block w-full max-w-sm">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Search assets</span>
              <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3">
                <Icon name="search" className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="BTC, Tesla, Forex..."
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition ${
                  activeCategory === category ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-slate-50">
                  <tr>
                    {['Asset', 'Category', 'Source', 'Modules', 'Status', 'Actions'].map((header) => (
                      <th key={header} className="px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredAssets.map((asset) => (
                    <tr key={asset.symbol} className="align-top">
                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-slate-950">{asset.symbol}</p>
                        <p className="mt-1 text-sm text-slate-600">{asset.name}</p>
                        <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">{asset.priority} priority</p>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-700">{asset.category}</td>
                      <td className="px-5 py-4 text-sm text-slate-700">{asset.priceSource}</td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-2">
                          {asset.ticker && <span className="rounded-full bg-sky-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-sky-700">Ticker</span>}
                          {asset.watchlist && <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-amber-700">Watchlist</span>}
                          {asset.news && <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700">News</span>}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${badgeClass(asset.status)}`}>
                          {asset.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button type="button" className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-700 transition hover:bg-slate-50">
                            Edit
                          </button>
                          <button type="button" className="rounded-lg border border-rose-200 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-rose-700 transition hover:bg-rose-50">
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Asset Composer</p>
                <h2 className="mt-1 text-2xl font-extrabold text-slate-950">Add or update asset</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-600">
                UI only
              </span>
            </div>

            <form className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Asset name</span>
                  <input type="text" defaultValue="Silver Spot" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Symbol</span>
                  <input type="text" defaultValue="XAG/USD" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900" />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Category</span>
                  <select className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900">
                    <option>Commodities</option>
                    <option>Crypto</option>
                    <option>Stocks</option>
                    <option>Forex</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Status</span>
                  <select className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900">
                    <option>Draft</option>
                    <option>Review</option>
                    <option>Live</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Price source / feed mapping</span>
                <input type="text" defaultValue="Metals desk composite feed" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900" />
              </label>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ['Show in ticker', true],
                  ['Enable watchlist', true],
                  ['Surface in news panel', false],
                ].map(([label, enabled]) => (
                  <label key={label} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <span className="text-sm font-medium text-slate-700">{label}</span>
                    <span className={`inline-flex h-6 w-11 items-center rounded-full p-1 ${enabled ? 'bg-slate-950 justify-end' : 'bg-slate-300 justify-start'}`}>
                      <span className="h-4 w-4 rounded-full bg-white" />
                    </span>
                  </label>
                ))}
              </div>

              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Editorial note</span>
                <textarea
                  rows={4}
                  defaultValue="Use this asset for commodities coverage and add it to the alternate watchlist preset once pricing is validated."
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="button" className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-950 px-6 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-black">
                  Save Asset UI
                </button>
                <button type="button" className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-bold uppercase tracking-[0.16em] text-slate-700 transition hover:bg-slate-50">
                  Reset
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Intake Queue</p>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-950">Requested assets</h2>
            <div className="mt-5 space-y-4">
              {intakeQueue.map((item) => (
                <article key={item.symbol} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                      <p className="mt-1 text-sm text-slate-600">{item.symbol}</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{item.note}</p>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">{item.requestedBy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {newsModules.map((module) => (
          <article key={module.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className={`h-3 w-3 rounded-full ${module.accent}`} />
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{module.title}</p>
            </div>
            <p className="mt-4 text-xl font-extrabold text-slate-950">{module.items}</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">{module.description}</p>
            <button type="button" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-slate-900 transition hover:text-slate-600">
              Configure module
              <Icon name="chevron_right" className="h-4 w-4" />
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AdminMarketsPage
