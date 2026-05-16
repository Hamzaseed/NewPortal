import { AppLink } from '../ui/AppLink'

function TopStoryItem({ story, bordered = false }) {
  return (
    <AppLink
      to={`/news/${story.slug || String(story.title || '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')}`}
    >
      <article className={['group flex cursor-pointer gap-4', bordered ? 'border-t border-slate-200 pt-6' : ''].filter(Boolean).join(' ')}>
        <div className="h-24 w-24 shrink-0 overflow-hidden">
          <img src={story.image} alt={story.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{story.category}</span>
          <h4 className="font-display text-lg font-bold leading-tight text-slate-900 transition group-hover:text-primary">{story.title}</h4>
        </div>
      </article>
    </AppLink>
  )
}

function HeroSection({ heroStory, topStories = [] }) {
  if (!heroStory) {
    return null
  }

  return (
    <section className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
      <article className="lg:col-span-8">
        <AppLink
          to={`/news/${heroStory.slug || String(heroStory.title || '')
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')}`}
        >
          <figure className="group relative aspect-[16/9] overflow-hidden shadow-editorial">
            <img src={heroStory.image} alt={heroStory.alt} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
              <span className="mb-3 inline-flex bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-900">{heroStory.category}</span>
              <h2 className="max-w-4xl font-display text-3xl font-bold leading-tight md:text-5xl">{heroStory.title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 md:text-base">{heroStory.summary}</p>
            </figcaption>
          </figure>
        </AppLink>
      </article>

      <aside className="flex flex-col gap-6 lg:col-span-4" aria-label="Top stories">
        <h3 className="border-b border-primary/20 pb-1 text-xs font-bold uppercase tracking-[0.22em] text-primary">Top Stories</h3>
        {topStories.map((story, index) => (
          <TopStoryItem key={story.title} story={story} bordered={index !== 0} />
        ))}
      </aside>
    </section>
  )
}

export default HeroSection
