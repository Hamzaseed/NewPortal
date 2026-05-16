import SectionTitle from '../ui/SectionTitle'

function HomeMarketsSection() {
  return (
    <section className="mt-20">
      <SectionTitle title="Markets" />

      <section className="border border-slate-200 bg-[#0b1117] p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] md:p-8" aria-label="Market snapshot">
        <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-400">Market Snapshot</p>
            <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-[0.04em] text-white">
              Markets Data Unavailable
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Seeded market cards were removed. Connect a real market data source before showing prices here again.
            </p>
          </div>
        </header>

        <div className="border border-white/10 bg-white/[0.03] p-5 text-sm leading-6 text-slate-300">
          No live market feed is configured in this project right now.
        </div>
      </section>
    </section>
  )
}

export default HomeMarketsSection
