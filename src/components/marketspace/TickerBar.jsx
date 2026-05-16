function formatPrice(value, digits = 2) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)
}

function TickerItem({ item }) {
  return (
    <div className="flex min-w-max items-center gap-3 border border-slate-200 bg-white px-4 py-2">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500">{item.symbol}</p>
        <p className="mt-1 text-sm font-semibold text-slate-900">{item.label}</p>
      </div>
      <div className="text-right">
        <p className={`text-sm font-semibold text-slate-900 ${item.flashClass}`}>
          {item.prefix || ''}
          {formatPrice(item.price, item.digits ?? 2)}
        </p>
        <p className={`text-xs font-bold ${item.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
          {item.change >= 0 ? '+' : ''}
          {item.change.toFixed(2)}%
        </p>
      </div>
    </div>
  )
}

function TickerBar({ items }) {
  const loopedItems = [...items, ...items]

  return (
    <section className="overflow-hidden border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500">
        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
        Live Markets
      </div>
      <div className="relative overflow-hidden py-4">
        <div className="ticker-fade pointer-events-none absolute inset-y-0 left-0 z-10 w-20" />
        <div className="ticker-fade ticker-fade-right pointer-events-none absolute inset-y-0 right-0 z-10 w-20" />
        <div className="flex w-max animate-marquee gap-4 px-4">
          {loopedItems.map((item, index) => (
            <TickerItem key={`${item.symbol}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TickerBar
