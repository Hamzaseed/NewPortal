import { AppLink } from '../ui/AppLink'
import SectionTitle from '../ui/SectionTitle'

function CategoryHighlightsSection({ sections = [] }) {
  if (sections.length === 0) {
    return null
  }

  return (
    <section className="mt-20">
      <SectionTitle title="Category Highlights" />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        {sections.map((section) => (
          <article key={section.slug} className="border border-slate-200 bg-white p-5 shadow-sm">
            <AppLink
              to={section.slug === 'video' || section.slug === 'videos' ? '/videos' : `/category/${section.slug}`}
              className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.22em] text-primary"
            >
              {section.title}
            </AppLink>

            <AppLink
              to={`/news/${section.lead.slug || String(section.lead.title || '')
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')}`}
              className="group block"
            >
              <figure className="mb-4 aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={section.lead.image}
                  alt={section.lead.alt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </figure>
              <h3 className="text-[1.02rem] font-display font-bold leading-tight text-slate-900 transition group-hover:text-primary sm:text-[1.15rem]">
                {section.lead.title}
              </h3>
              <p className="mt-3 text-[0.82rem] leading-5 text-slate-600 sm:text-[0.8rem]">{section.lead.excerpt}</p>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                {section.lead.author} | <time>{section.lead.time}</time>
              </p>
            </AppLink>

            <div className="mt-6 space-y-4 border-t border-slate-200 pt-4">
              {section.stories.map((story) => (
                <AppLink
                  key={story.slug || story.title}
                  to={`/news/${story.slug || String(story.title || '')
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '')}`}
                  className="group flex items-start gap-3"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <h4 className="font-medium leading-6 text-slate-700 transition group-hover:text-primary">{story.title}</h4>
                </AppLink>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CategoryHighlightsSection
