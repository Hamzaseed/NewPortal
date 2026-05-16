function NewsPanel({ items }) {
  return (
    <section className="border border-slate-200 bg-white p-5 shadow-sm">
      <div className="border-b border-slate-200 pb-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500">News Flow</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">Market News</h2>
      </div>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="border border-slate-200 bg-white p-3 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <img src={item.image} alt={item.title} className="h-32 w-full object-cover sm:h-20 sm:w-20" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${
                      item.sentiment === 'bullish'
                        ? 'bg-emerald-50 text-emerald-700'
                        : item.sentiment === 'bearish'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.sentiment}
                  </span>
                  <span className="text-xs text-slate-500">{item.source}</span>
                  <span className="text-xs text-slate-600">{item.time}</span>
                </div>
                <h3 className="mt-2 text-sm font-semibold leading-6 text-slate-950">{item.title}</h3>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default NewsPanel
