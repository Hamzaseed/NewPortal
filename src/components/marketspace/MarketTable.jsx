import { useState } from 'react'

const tabs = ['Stocks', 'Crypto', 'Forex', 'Commodities']

function MarketTable({ assets, activeSymbol, onSelect }) {
  const [activeTab, setActiveTab] = useState('Stocks')
  const rows = assets.filter((asset) => asset.category === activeTab)

  return (
    <section className="border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500">Cross-Asset Board</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">Market Table</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] transition ${
                activeTab === tab ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-3 md:hidden">
        {rows.map((asset) => (
          <button
            key={asset.symbol}
            type="button"
            onClick={() => onSelect(asset.symbol)}
            className={`w-full border px-4 py-4 text-left transition ${
              activeSymbol === asset.symbol
                ? 'border-emerald-400/60 bg-emerald-50'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-950">{asset.symbol}</p>
                <p className="mt-1 text-sm text-slate-600">{asset.name}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold text-slate-950 ${asset.flashClass}`}>
                  {asset.prefix || ''}
                  {asset.displayPrice}
                </p>
                <p className={`mt-1 text-xs font-bold ${asset.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {asset.change >= 0 ? '+' : ''}
                  {asset.change.toFixed(2)}%
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Volume</span>
              <span>{asset.volumeLabel}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 hidden overflow-x-auto md:block">
        <div className="min-w-[720px]">
          <div className="grid grid-cols-[0.8fr_1.8fr_1fr_0.9fr_1fr] gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
            <span>Symbol</span>
            <span>Name</span>
            <span>Price</span>
            <span>Change</span>
            <span className="text-right">Volume</span>
          </div>
          <div className="space-y-2">
            {rows.map((asset) => (
              <button
                key={asset.symbol}
                type="button"
                onClick={() => onSelect(asset.symbol)}
                className={`grid w-full grid-cols-[0.8fr_1.8fr_1fr_0.9fr_1fr] items-center gap-3 border px-4 py-3 text-left transition ${
                  activeSymbol === asset.symbol
                    ? 'border-emerald-400/60 bg-emerald-50'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className="text-sm font-semibold text-slate-950">{asset.symbol}</span>
                <span className="text-sm text-slate-600">{asset.name}</span>
                <span className={`text-sm font-semibold text-slate-950 ${asset.flashClass}`}>
                  {asset.prefix || ''}
                  {asset.displayPrice}
                </span>
                <span className={`text-sm font-bold ${asset.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {asset.change >= 0 ? '+' : ''}
                  {asset.change.toFixed(2)}%
                </span>
                <span className="text-right text-sm text-slate-400">{asset.volumeLabel}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MarketTable
