function buildSparkPath(points, width = 120, height = 52) {
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

function MarketCard({ asset, onSelect, isSelected }) {
  const sparkPath = buildSparkPath(asset.sparkline)
  const stroke = asset.change >= 0 ? '#34d399' : '#fb7185'

  return (
    <button
      type="button"
      onClick={() => onSelect(asset.symbol)}
      className={`group border p-5 text-left transition duration-300 ${
        isSelected
          ? 'border-emerald-400/60 bg-[linear-gradient(180deg,#f3fcf7,#ffffff)] shadow-[0_18px_50px_rgba(16,185,129,0.08)]'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">{asset.symbol}</p>
          <h3 className="mt-2 font-semibold text-slate-900">{asset.name}</h3>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold ${
            asset.change >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
          }`}
        >
          {asset.change >= 0 ? '+' : ''}
          {asset.change.toFixed(2)}%
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className={`text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl ${asset.flashClass}`}>
            {asset.prefix || ''}
            {asset.displayPrice}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">Updated {asset.updatedAt}</p>
        </div>
        <div className="h-14 w-full sm:w-32">
          <svg viewBox="0 0 120 52" className="h-full w-full">
            <path d={sparkPath} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </button>
  )
}

export default MarketCard
