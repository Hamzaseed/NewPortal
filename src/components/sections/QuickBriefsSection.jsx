import { quickBriefs } from '../../data/newsData'
import SectionTitle from '../ui/SectionTitle'

function QuickBriefsSection() {
  return (
    <section className="mt-20">
      <SectionTitle title="News Briefs" actionLabel="More Updates" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {quickBriefs.map((item) => (
          <article key={item.label} className="border border-slate-200 bg-white p-5 transition hover:border-slate-900">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">{item.label}</p>
            <h3 className="mt-3 font-display font-bold text-slate-900">{item.value}</h3>
            <p className="mt-3 text-slate-600">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default QuickBriefsSection
