function Watchlist({ assets, watchlist, onAdd, onRemove }) {
  const availableAssets = assets.filter((asset) => !watchlist.includes(asset.symbol))
  const selectedAssets = watchlist.map((symbol) => assets.find((asset) => asset.symbol === symbol)).filter(Boolean)

  return (
    <section className="border border-slate-200 bg-white p-5 shadow-sm">
      <div className="border-b border-slate-200 pb-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500">Saved Assets</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">Watchlist</h2>
      </div>

      <div className="mt-4 flex gap-3">
        <select
          aria-label="Add asset to watchlist"
          className="min-w-0 flex-1 border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400/60"
          defaultValue=""
          onChange={(event) => {
            if (event.target.value) {
              onAdd(event.target.value)
              event.target.value = ''
            }
          }}
        >
          <option value="" disabled className="bg-slate-900 text-slate-400">
            Add asset
          </option>
          {availableAssets.map((asset) => (
            <option key={asset.symbol} value={asset.symbol} className="bg-slate-900 text-white">
              {asset.symbol} - {asset.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 space-y-3">
        {selectedAssets.map((asset) => (
          <article key={asset.symbol} className="border border-slate-200 bg-white px-4 py-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
              <p className="text-sm font-semibold text-slate-950">{asset.symbol}</p>
              <p className="text-xs text-slate-500">{asset.name}</p>
              </div>
              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <div className="text-left sm:text-right">
                  <p className={`text-sm font-semibold text-slate-950 ${asset.flashClass}`}>
                    {asset.prefix || ''}
                    {asset.displayPrice}
                  </p>
                  <p className={`mt-1 text-xs font-bold ${asset.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {asset.change >= 0 ? '+' : ''}
                    {asset.change.toFixed(2)}%
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(asset.symbol)}
                  className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 transition hover:border-rose-300 hover:text-rose-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Watchlist
