import { AppLink } from './AppLink'

function ArticleTopStories({
  title = 'Most Read',
  articles = [],
  currentSlug = '',
}) {
  const stories = Array.isArray(articles)
    ? articles
        .filter((item) => item.status === 'Published' && item.slug !== currentSlug)
        .slice(0, 3)
        .map((item, index) => ({
          rank: `0${index + 1}`.slice(-2),
          title: item.title || 'Untitled Article',
          meta: `${item.category || 'News'} | ${item.read_time || item.readTime || item.publish_date || item.publishDate || item.publishedAt || 'Latest update'}`,
          slug:
            item.slug ||
            String(item.title || `article-${index}`)
              .trim()
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, ''),
        }))
    : []

  if (!stories.length) {
    return null
  }

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="mb-6 border-b border-primary/20 pb-2 font-display text-xl font-bold">
        {title}
      </h3>

      <div className="space-y-6">
        {stories.map((item) => (
          <AppLink
            key={`${item.rank}-${item.slug}`}
            to={`/news/${item.slug}`}
            className="group flex cursor-pointer gap-4"
          >
            <span className="font-display text-3xl font-black text-slate-200 transition-colors group-hover:text-primary">
              {item.rank}
            </span>
            <div>
              <h4 className="font-bold leading-tight group-hover:underline">
                {item.title}
              </h4>
              <p className="mt-1 text-xs text-slate-500">{item.meta}</p>
            </div>
          </AppLink>
        ))}
      </div>
    </div>
  )
}

export default ArticleTopStories
