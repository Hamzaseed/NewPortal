import { homeMarketHighlights } from '../../data/marketData'
import { AppLink } from '../ui/AppLink'
import SectionTitle from '../ui/SectionTitle'

function HomeMarketsSection() {
  return (
    <section className="mt-20">
      <SectionTitle title="Markets" />

      <div className="border border-slate-200 bg-[#0b1117] p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] md:p-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-400">Market Snapshot</p>
            <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-[0.04em] text-white">
              Track Oil, Crypto, Stocks, And FX
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              A quick cross-asset look from the homepage, with direct jumps into the full markets dashboard.
            </p>
          </div>

          <AppLink
            to="/markets"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:border-white/30 hover:bg-white/10"
          >
            View Full Market Page
          </AppLink>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {homeMarketHighlights.map((item) => (
            <AppLink
              key={item.symbol}
              to={item.href}
              className="group border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/25 hover:bg-white/[0.06]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">{item.symbol}</p>
                  <h3 className="mt-2 font-display text-xl font-bold text-white transition group-hover:text-amber-300">{item.title}</h3>
                </div>
                <span
                  className={`px-2.5 py-1 text-[11px] font-bold ${
                    item.positive ? 'bg-emerald-500/15 text-emerald-300' : 'bg-red-500/15 text-red-300'
                  }`}
                >
                  {item.change}
                </span>
              </div>

              <p className="mt-5 text-3xl font-black tracking-tight text-white">{item.price}</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>
            </AppLink>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeMarketsSection
