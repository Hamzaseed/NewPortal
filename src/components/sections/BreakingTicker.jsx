import { breakingNews } from '../../data/newsData'

function BreakingTicker() {
  const items = [...breakingNews, ...breakingNews]

  return (
    <div className="overflow-hidden border-b border-primary/10 bg-white">
      <div className="container-shell flex items-center gap-4 py-2">
        <span className="shrink-0 rounded bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
          Breaking
        </span>
        <div className="overflow-hidden">
          <div className="flex min-w-max animate-marquee items-center text-sm font-medium text-slate-700">
            {items.map((story, index) => (
              <p
                key={`${story}-${index}`}
                className={index === 0 ? 'px-4' : 'border-l border-primary/20 px-4'}
              >
                {story}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BreakingTicker
