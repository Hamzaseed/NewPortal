import { useEffect, useEffectEvent, useState } from 'react'
import { Activity, ArrowUpRight, CandlestickChart, Landmark, Newspaper, Star, TrendingUp } from 'lucide-react'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import MarketCard from '../components/marketspace/MarketCard'
import MarketChart from '../components/marketspace/MarketChart'
import MarketTable from '../components/marketspace/MarketTable'
import NewsPanel from '../components/marketspace/NewsPanel'
import TickerBar from '../components/marketspace/TickerBar'
import Watchlist from '../components/marketspace/Watchlist'

function makeSeries(base, points, spread, formatter) {
  return Array.from({ length: points }, (_, index) => {
    const drift = Math.sin(index / 2.7) * spread * 0.22
    const noise = (Math.cos(index / 1.9) + Math.sin(index / 4.4)) * spread * 0.14
    const price = Number((base + drift + noise + index * spread * 0.02).toFixed(2))
    return { label: formatter(index), price }
  })
}

function formatTimeLabel(date) {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

const initialAssets = [
  { symbol: 'BTC', name: 'Bitcoin', category: 'Crypto', price: 68420.54, open: 67844.1, high: 68980.12, low: 67320.4, change: 2.48, volume: 32800000000, prefix: '$', digits: 2, series: { '1D': makeSeries(68200, 12, 520, (i) => `${9 + i}:00`), '1W': makeSeries(66800, 7, 880, (i) => `Day ${i + 1}`), '1M': makeSeries(64100, 10, 1150, (i) => `W${i + 1}`), '1Y': makeSeries(43200, 12, 2600, (i) => `M${i + 1}`) } },
  { symbol: 'ETH', name: 'Ethereum', category: 'Crypto', price: 3564.12, open: 3498.42, high: 3592.3, low: 3446.8, change: 1.84, volume: 14200000000, prefix: '$', digits: 2, series: { '1D': makeSeries(3510, 12, 42, (i) => `${9 + i}:00`), '1W': makeSeries(3400, 7, 65, (i) => `Day ${i + 1}`), '1M': makeSeries(3160, 10, 98, (i) => `W${i + 1}`), '1Y': makeSeries(2150, 12, 140, (i) => `M${i + 1}`) } },
  { symbol: 'AAPL', name: 'Apple', category: 'Stocks', price: 212.64, open: 210.2, high: 213.1, low: 208.4, change: 0.92, volume: 92100000, prefix: '$', digits: 2, series: { '1D': makeSeries(209, 12, 2.4, (i) => `${9 + i}:00`), '1W': makeSeries(204, 7, 3.2, (i) => `Day ${i + 1}`), '1M': makeSeries(198, 10, 4.1, (i) => `W${i + 1}`), '1Y': makeSeries(172, 12, 6.8, (i) => `M${i + 1}`) } },
  { symbol: 'TSLA', name: 'Tesla', category: 'Stocks', price: 185.72, open: 188.1, high: 191.4, low: 183.2, change: -1.36, volume: 138000000, prefix: '$', digits: 2, series: { '1D': makeSeries(189, 12, 3.2, (i) => `${9 + i}:00`), '1W': makeSeries(194, 7, 4.8, (i) => `Day ${i + 1}`), '1M': makeSeries(201, 10, 7.6, (i) => `W${i + 1}`), '1Y': makeSeries(231, 12, 11.5, (i) => `M${i + 1}`) } },
  { symbol: 'GOLD', name: 'Gold Spot', category: 'Commodities', price: 2318.45, open: 2307.1, high: 2322.8, low: 2296.6, change: 0.66, volume: 483000, prefix: '$', digits: 2, series: { '1D': makeSeries(2304, 12, 8.5, (i) => `${9 + i}:00`), '1W': makeSeries(2288, 7, 11, (i) => `Day ${i + 1}`), '1M': makeSeries(2241, 10, 15, (i) => `W${i + 1}`), '1Y': makeSeries(1982, 12, 26, (i) => `M${i + 1}`) } },
  { symbol: 'OIL', name: 'Brent Crude', category: 'Commodities', price: 84.16, open: 83.24, high: 84.9, low: 82.4, change: 1.11, volume: 1260000, prefix: '$', digits: 2, series: { '1D': makeSeries(83.1, 12, 0.7, (i) => `${9 + i}:00`), '1W': makeSeries(81.8, 7, 1.1, (i) => `Day ${i + 1}`), '1M': makeSeries(79.4, 10, 1.6, (i) => `W${i + 1}`), '1Y': makeSeries(73.2, 12, 2.2, (i) => `M${i + 1}`) } },
  { symbol: 'USD/PKR', name: 'US Dollar / PKR', category: 'Forex', price: 278.56, open: 277.92, high: 278.8, low: 277.48, change: 0.23, volume: 8100000, prefix: 'Rs ', digits: 2, series: { '1D': makeSeries(277.8, 12, 0.22, (i) => `${9 + i}:00`), '1W': makeSeries(276.9, 7, 0.36, (i) => `Day ${i + 1}`), '1M': makeSeries(275.4, 10, 0.52, (i) => `W${i + 1}`), '1Y': makeSeries(268.2, 12, 0.9, (i) => `M${i + 1}`) } },
  { symbol: 'SPX', name: 'S&P 500', category: 'Stocks', price: 5291.38, open: 5258.2, high: 5302.4, low: 5236.8, change: 0.74, volume: 4390000000, prefix: '', digits: 2, series: { '1D': makeSeries(5264, 12, 18, (i) => `${9 + i}:00`), '1W': makeSeries(5212, 7, 26, (i) => `Day ${i + 1}`), '1M': makeSeries(5114, 10, 33, (i) => `W${i + 1}`), '1Y': makeSeries(4620, 12, 56, (i) => `M${i + 1}`) } },
]

const tickerSymbols = ['BTC', 'ETH', 'GOLD', 'OIL', 'USD/PKR', 'SPX']
const cardSymbols = ['BTC', 'ETH', 'AAPL', 'TSLA', 'GOLD', 'OIL']

function makeNewsCard(title, colorA, colorB) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${colorA}" offset="0%"/><stop stop-color="${colorB}" offset="100%"/></linearGradient></defs><rect width="160" height="160" rx="28" fill="url(#g)"/><circle cx="122" cy="38" r="18" fill="rgba(255,255,255,0.16)"/><path d="M24 120C42 88 72 70 108 62" stroke="rgba(255,255,255,0.5)" stroke-width="8" fill="none" stroke-linecap="round"/><text x="24" y="38" fill="white" font-size="16" font-family="Arial" font-weight="700">${title}</text></svg>`)}` 
}

const newsItems = [
  { title: 'Bitcoin extends breakout as ETF flows accelerate through the US session', source: 'Desk Wire', time: '2m ago', sentiment: 'bullish', image: makeNewsCard('BTC', '#0f766e', '#111827') },
  { title: 'Oil edges higher after supply concerns return to the commodity complex', source: 'Macro Journal', time: '9m ago', sentiment: 'neutral', image: makeNewsCard('OIL', '#7c2d12', '#111827') },
  { title: 'Tesla slips as traders rotate into defensives ahead of earnings', source: 'Street Pulse', time: '14m ago', sentiment: 'bearish', image: makeNewsCard('TSLA', '#7f1d1d', '#1e293b') },
  { title: 'Gold remains supported as rate-cut bets revive haven demand', source: 'Global Markets', time: '22m ago', sentiment: 'bullish', image: makeNewsCard('GOLD', '#b45309', '#0f172a') },
]

function formatAsset(asset) {
  return {
    ...asset,
    displayPrice: asset.price.toLocaleString('en-US', { minimumFractionDigits: asset.digits ?? 2, maximumFractionDigits: asset.digits ?? 2 }),
    volumeLabel: asset.volume >= 1000000000 ? `${(asset.volume / 1000000000).toFixed(2)}B` : asset.volume >= 1000000 ? `${(asset.volume / 1000000).toFixed(2)}M` : `${(asset.volume / 1000).toFixed(0)}K`,
    updatedAt: formatTimeLabel(new Date()),
    sparkline: asset.series['1D'].map((point) => point.price),
    flashClass: asset.flash === 'up' ? 'market-flash-up' : asset.flash === 'down' ? 'market-flash-down' : '',
    label: asset.name,
  }
}

function MarketsPage() {
  const [assets, setAssets] = useState(() => initialAssets.map((asset) => formatAsset({ ...asset, flash: null })))
  const [selectedSymbol, setSelectedSymbol] = useState('BTC')
  const [watchlist, setWatchlist] = useState(['BTC', 'AAPL', 'USD/PKR'])

  const tickMarket = useEffectEvent(() => {
    setAssets((currentAssets) =>
      currentAssets.map((asset) => {
        const drift = (Math.random() - 0.5) * (asset.price < 500 ? asset.price * 0.01 : asset.price * 0.004)
        const nextPrice = Math.max(asset.price + drift, 0.01)
        const nextChange = ((nextPrice - asset.open) / asset.open) * 100
        const flash = nextPrice > asset.price ? 'up' : nextPrice < asset.price ? 'down' : null
        const nextPoint = { label: formatTimeLabel(new Date()), price: Number(nextPrice.toFixed(2)) }
        const nextSeries1D = [...asset.series['1D'].slice(-11), nextPoint]
        const nextHigh = Math.max(asset.high, nextPrice)
        const nextLow = Math.min(asset.low, nextPrice)

        return formatAsset({
          ...asset,
          price: Number(nextPrice.toFixed(asset.digits ?? 2)),
          high: Number(nextHigh.toFixed(asset.digits ?? 2)),
          low: Number(nextLow.toFixed(asset.digits ?? 2)),
          change: Number(nextChange.toFixed(2)),
          flash,
          series: { ...asset.series, '1D': nextSeries1D },
        })
      })
    )
  })

  useEffect(() => {
    const intervalId = window.setInterval(() => tickMarket(), 2000)
    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (!assets.some((asset) => asset.flash)) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setAssets((currentAssets) => currentAssets.map((asset) => formatAsset({ ...asset, flash: null })))
    }, 700)

    return () => window.clearTimeout(timeoutId)
  }, [assets])

  const selectedAsset = assets.find((asset) => asset.symbol === selectedSymbol) || assets[0]
  const tickerItems = tickerSymbols.map((symbol) => assets.find((asset) => asset.symbol === symbol)).filter(Boolean)
  const cards = cardSymbols.map((symbol) => assets.find((asset) => asset.symbol === symbol)).filter(Boolean)

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-950">
      <Header />
      <main className="flex-1 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_24%),radial-gradient(circle_at_85%_0%,rgba(59,130,246,0.08),transparent_18%),linear-gradient(180deg,#f8fafc,#ffffff_45%,#f1f5f9)]">
        <section className="mx-auto w-full max-w-[1440px] px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <div className="border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-7">
            <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-700">
                  <Activity className="h-3.5 w-3.5" />
                  Real-Time Market Pulse
                </div>
                <h1 className="mt-4 max-w-4xl font-sans text-3xl font-semibold leading-tight text-slate-950 sm:text-5xl">
                  A live-feeling financial dashboard for crypto, stocks, forex, and commodities.
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                  Track cross-asset moves, watch live-style chart motion, scan headline flow, and keep a personal watchlist in one modern dark trading surface.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  <div className="border border-slate-200 bg-white p-4">
                    <div className="flex items-center gap-2 text-emerald-600"><TrendingUp className="h-4 w-4" /><span className="text-[11px] font-bold uppercase tracking-[0.26em]">Momentum</span></div>
                    <p className="mt-3 text-2xl font-semibold text-slate-950">Risk-On</p>
                    <p className="mt-1 text-sm text-slate-600">Crypto and energy are leading the tape.</p>
                  </div>
                  <div className="border border-slate-200 bg-white p-4">
                    <div className="flex items-center gap-2 text-sky-600"><Landmark className="h-4 w-4" /><span className="text-[11px] font-bold uppercase tracking-[0.26em]">FX Focus</span></div>
                    <p className="mt-3 text-2xl font-semibold text-slate-950">USD/PKR</p>
                    <p className="mt-1 text-sm text-slate-600">Local currency pressure remains firm.</p>
                  </div>
                  <div className="border border-slate-200 bg-white p-4">
                    <div className="flex items-center gap-2 text-amber-600"><CandlestickChart className="h-4 w-4" /><span className="text-[11px] font-bold uppercase tracking-[0.26em]">Chart Feed</span></div>
                    <p className="mt-3 text-2xl font-semibold text-slate-950">2 Sec</p>
                    <p className="mt-1 text-sm text-slate-600">Prices refresh continuously with motion.</p>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                <div className="border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div><p className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-500">Headline Move</p><h2 className="mt-2 text-2xl font-semibold text-slate-950">{selectedAsset.symbol}</h2></div>
                    <ArrowUpRight className={`h-5 w-5 ${selectedAsset.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`} />
                  </div>
                  <p className={`mt-4 break-words text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl ${selectedAsset.flashClass}`}>{selectedAsset.prefix || ''}{selectedAsset.displayPrice}</p>
                  <p className={`mt-2 text-sm font-bold ${selectedAsset.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{selectedAsset.change >= 0 ? '+' : ''}{selectedAsset.change.toFixed(2)}% today</p>
                </div>
                <div className="border border-slate-200 bg-white p-5">
                  <div className="flex items-center gap-2 text-slate-500"><Star className="h-4 w-4 text-amber-300" /><p className="text-[11px] font-bold uppercase tracking-[0.28em]">Watchlist Count</p></div>
                  <p className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">{watchlist.length}</p>
                  <p className="mt-1 text-sm text-slate-600">Saved assets stay in sync with the live feed.</p>
                </div>
              </div>
            </div>
            <div className="mt-8"><TickerBar items={tickerItems} /></div>
          </div>

          <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((asset) => <MarketCard key={asset.symbol} asset={asset} onSelect={setSelectedSymbol} isSelected={selectedAsset.symbol === asset.symbol} />)}
          </section>

          <section className="mt-8 grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
            <MarketChart asset={selectedAsset} />
            <div className="grid gap-6">
              <Watchlist assets={assets} watchlist={watchlist} onAdd={(symbol) => setWatchlist((current) => (current.includes(symbol) ? current : [...current, symbol]))} onRemove={(symbol) => setWatchlist((current) => current.filter((item) => item !== symbol))} />
              <NewsPanel items={newsItems} />
            </div>
          </section>

          <section className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
            <MarketTable assets={assets} activeSymbol={selectedAsset.symbol} onSelect={setSelectedSymbol} />
            <section className="border border-slate-200 bg-white p-5 shadow-sm">
              <div className="border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2 text-slate-500"><Newspaper className="h-4 w-4 text-sky-300" /><p className="text-[11px] font-bold uppercase tracking-[0.3em]">Desk Snapshot</p></div>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">Market Summary</h2>
              </div>
              <div className="mt-4 space-y-3">
                <div className="border border-slate-200 bg-white p-4"><p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">Active Chart</p><p className="mt-2 text-lg font-semibold text-slate-950">{selectedAsset.name}</p><p className="mt-1 text-sm text-slate-600">Main chart switches when you click a market card or table row.</p></div>
                <div className="border border-slate-200 bg-white p-4"><p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">Live Update Loop</p><p className="mt-2 text-lg font-semibold text-slate-950">Every 2 seconds</p><p className="mt-1 text-sm text-slate-600">Price, change, mini charts, table, ticker, and watchlist stay synchronized.</p></div>
                <div className="border border-slate-200 bg-white p-4"><p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">Sentiment Mix</p><p className="mt-2 text-lg font-semibold text-slate-950">Bullish / Bearish / Neutral</p><p className="mt-1 text-sm text-slate-600">News items are tagged to simulate a live market intelligence panel.</p></div>
              </div>
            </section>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default MarketsPage
