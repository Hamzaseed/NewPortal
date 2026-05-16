import Icon from '../ui/Icon'
import NewsletterCard from '../ui/NewsletterCard'
import { AppLink } from '../ui/AppLink'

function MostRead({ items = [] }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-6 flex items-center gap-2 font-display text-xl font-bold text-slate-900">
        <Icon name="trending_up" className="text-primary" />
        Most Read
      </h3>
      <div className="space-y-6">
        {items.map((item, index) => (
          <AppLink
            key={item.rank}
            to={`/news/${item.slug || String(item.title || '')
              .trim()
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '')}`}
            className={['group flex gap-4', index === 0 ? '' : 'border-t border-slate-100 pt-6'].filter(Boolean).join(' ')}
          >
            <span className="font-display text-3xl font-black text-slate-200 transition group-hover:text-primary">
              {item.rank}
            </span>
            <div>
              <h4 className="text-sm font-bold leading-tight text-slate-900 group-hover:underline">{item.title}</h4>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">{item.section}</p>
            </div>
          </AppLink>
        ))}
      </div>
      {items.length === 0 ? <p className="text-sm text-slate-500">No reading data available yet.</p> : null}
    </section>
  )
}

function NewsletterSignup() {
  return (
    <NewsletterCard
      title="Stay Informed"
      description="Get the day's most important stories delivered straight to your inbox every morning."
      placeholder="Email Address"
      buttonLabel="Subscribe Now"
      note="By subscribing, you agree to our Terms of Use and Privacy Policy."
      iconName=""
      inputClassName="border-none"
    />
  )
}

function OpinionSection({ opinions = [] }) {
  if (opinions.length === 0) {
    return null
  }

  return (
    <section className="border-t-4 border-primary pt-6">
      <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-primary">Opinion</h3>
      <div className="space-y-8">
        {opinions.map((item, index) => (
          <article
            key={`${item.author}-${index}`}
            className={index === 0 ? 'cursor-pointer' : 'cursor-pointer border-t border-slate-100 pt-6'}
          >
            <p className="mb-2 font-display text-sm italic leading-6 text-slate-600">&quot;{item.quote}&quot;</p>
            <h4 className="text-sm font-bold text-slate-900">- {item.author}</h4>
          </article>
        ))}
      </div>
    </section>
  )
}

function Sidebar({ mostRead = [], opinions = [] }) {
  return (
    <aside className="space-y-12 lg:col-span-4">
      <MostRead items={mostRead} />
      <NewsletterSignup />
      <OpinionSection opinions={opinions} />
    </aside>
  )
}

export default Sidebar
