import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Icon from '../components/ui/Icon'
import {
  marketBenchmarks,
  marketBoards,
  marketCalendar,
  marketMovers,
  marketOverview,
} from '../data/marketData'

function formatPath(points, width = 100, height = 100) {
  if (!points.length) {
    return ''
  }

  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1

  return points
    .map((point, index) => {
      const x = (index / Math.max(points.length - 1, 1)) * width
      const y = height - ((point - min) / range) * height
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')
}

function formatAreaPath(points, width = 100, height = 100) {
  const line = formatPath(points, width, height)

  if (!line) {
    return ''
  }

  return `${line} L ${width} ${height} L 0 ${height} Z`
}

function Sparkline({ points, accent, gradientId, className = 'h-20 w-full' }) {
  const linePath = formatPath(points)
  const areaPath = formatAreaPath(points)

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradientId})`} />
      <path d={linePath} fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function OverviewCard({ item, index }) {
  const accent = item.positive ? '#22c55e' : '#ef4444'

  return (
    <article className="border border-white/10 bg-[#131a23] p-5 text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-500">{item.symbol}</p>
          <h3 className="mt-2 font-display text-xl font-bold text-white">{item.label}</h3>
        </div>
        <span
          className={`inline-flex px-2.5 py-1 text-[11px] font-bold ${
            item.positive ? 'bg-emerald-500/15 text-emerald-300' : 'bg-red-500/15 text-red-300'
          }`}
        >
          {item.change}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-3xl font-black tracking-tight text-white">{item.price}</p>
        <div className="mt-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-500">
          <span>Volume {item.volume}</span>
          <span className="h-1 w-1 rounded-full bg-slate-700" />
          <span>{item.rangeLabel}</span>
        </div>
        <p className="mt-1 text-sm text-slate-400">{item.range}</p>
      </div>

      <div className="mt-5 border border-white/6 bg-black/20 p-3">
        <Sparkline points={item.points} accent={accent} gradientId={`overview-chart-${index}`} />
      </div>
    </article>
  )
}

function BenchmarkPanel({ board, index }) {
  return (
    <section className="border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-slate-400">Terminal View</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-slate-950">{board.title}</h2>
          <p className="mt-2 text-sm text-slate-500">{board.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {board.stats.map((stat) => (
            <div key={stat.label} className="min-w-[110px] border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">{stat.label}</p>
              <p className="mt-1 text-base font-bold text-slate-900">{stat.value}</p>
              <p className={`text-xs font-bold ${stat.change.startsWith('-') ? 'text-red-500' : 'text-emerald-600'}`}>{stat.change}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 border border-slate-200 bg-[#0c1118] p-4">
        <div className="grid h-64 grid-cols-6 gap-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:20%_25%]">
          <div className="col-span-6">
            <Sparkline
              points={board.points}
              accent={board.accent}
              gradientId={`benchmark-chart-${index}`}
              className="h-56 w-full"
            />
          </div>
        </div>
        <div className="mt-3 flex justify-between text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
          {board.labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function MarketBoard({ board }) {
  return (
    <section className="border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="font-display text-xl font-bold text-slate-950">{board.title}</h3>
        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Live Board</span>
      </div>
      <div className="space-y-3">
        {board.items.map((item) => (
          <article key={item.symbol} className="flex items-center justify-between gap-4 border border-slate-100 px-4 py-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">{item.symbol}</p>
              <h4 className="mt-1 font-bold text-slate-900">{item.name}</h4>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-900">{item.price}</p>
              <p className={`text-xs font-bold ${item.positive ? 'text-emerald-600' : 'text-red-500'}`}>{item.change}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function MarketsPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#f3f4f6] text-slate-900">
      <Header />

      <main className="flex-1">
        <section id="market-overview" className="border-b border-slate-900/10 bg-[#0b1117] text-white">
          <div className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-20">
            <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-amber-400">Markets Terminal</p>
                <h1 className="mt-4 max-w-4xl font-display text-4xl font-black uppercase tracking-[0.04em] text-white md:text-5xl">
                  Market Prices Across Oil, Crypto, Stocks, And FX
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
                  A Bloomberg-inspired market dashboard showing major price boards, cross-asset movers, and intraday-style trend charts in one place.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="border border-white/10 bg-white/5 p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Market Pulse</p>
                  <div className="mt-3 flex items-center gap-3">
                    <Icon name="trending_up" className="h-6 w-6 text-emerald-400" />
                    <div>
                      <p className="text-xl font-bold text-white">Risk-On Session</p>
                      <p className="text-sm text-slate-400">Energy and crypto lead while mega-cap equities pause.</p>
                    </div>
                  </div>
                </div>
                <div className="border border-white/10 bg-white/5 p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Last Update</p>
                  <p className="mt-3 text-2xl font-black text-white">09:42 GMT</p>
                  <p className="mt-1 text-sm text-slate-400">Desk snapshot for commodities, digital assets, equities, and foreign exchange.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {marketOverview.map((item, index) => (
                <OverviewCard key={item.symbol} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1400px] px-6 py-8 md:px-20">
          <div className="grid gap-6 xl:grid-cols-2">
            {marketBenchmarks.map((board, index) => (
              <div key={board.title} id={index === 0 ? 'oil-energy' : 'crypto'}>
                <BenchmarkPanel board={board} index={index} />
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {marketBoards.map((board) => (
              <div
                key={board.title}
                id={
                  board.title === 'Oil & Energy'
                    ? 'oil-board'
                    : board.title === 'Crypto'
                      ? 'crypto-board'
                      : board.title === 'Global Equities'
                        ? 'global-equities'
                        : 'fx-crosses'
                }
              >
                <MarketBoard board={board} />
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">Leaders & Laggards</p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-slate-950">Top Movers</h2>
                </div>
                <button type="button" className="border border-slate-200 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-600 transition hover:border-primary/30 hover:text-primary">
                  View Heatmap
                </button>
              </div>

              <div className="overflow-hidden border border-slate-100">
                <div className="grid grid-cols-[1.6fr_0.7fr_0.8fr_0.8fr] bg-slate-50 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  <span>Name</span>
                  <span>Ticker</span>
                  <span>Price</span>
                  <span className="text-right">Change</span>
                </div>
                {marketMovers.map((item) => (
                  <div
                    key={item.ticker}
                    className="grid grid-cols-[1.6fr_0.7fr_0.8fr_0.8fr] items-center border-t border-slate-100 px-4 py-4"
                  >
                    <div>
                      <p className="font-bold text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.sector}</p>
                    </div>
                    <p className="text-sm font-bold text-slate-500">{item.ticker}</p>
                    <p className="text-sm font-bold text-slate-900">{item.price}</p>
                    <p className={`text-right text-sm font-bold ${item.positive ? 'text-emerald-600' : 'text-red-500'}`}>{item.change}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">Event Risk</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-slate-950">Market Calendar</h2>
              <div className="mt-5 space-y-4">
                {marketCalendar.map((item) => (
                  <article key={`${item.time}-${item.event}`} className="border border-slate-100 bg-slate-50 px-4 py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{item.time}</p>
                        <h3 className="mt-1 font-bold text-slate-900">{item.event}</h3>
                      </div>
                      <span
                        className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${
                          item.impact === 'High'
                            ? 'bg-red-500/10 text-red-600'
                            : 'bg-amber-500/10 text-amber-700'
                        }`}
                      >
                        {item.impact}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default MarketsPage
