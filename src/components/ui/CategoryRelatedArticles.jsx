import { AppLink } from './AppLink'

function CategoryRelatedArticles({ slug, detailsTitle, publishedArticles }) {
  const categoryArticles = publishedArticles
    .filter((article) => {
      const articleCategory = String(article.category || '').replace(/-/g, ' ').trim().toLowerCase()
      const currentCategory = String(slug || '').replace(/-/g, ' ').trim().toLowerCase()
      return articleCategory === currentCategory
    })
    .map((article) => ({
      slug:
        article.slug ||
        String(article.title || '')
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, ''),
      tag: article.category || detailsTitle || 'Latest',
      title: article.title,
      excerpt: article.excerpt || 'In-depth coverage from The Daily Observer newsroom.',
      time: article.publish_date || article.publishDate || article.publishedAt || 'Latest update',
      image: article.hero_image || article.heroImage || article.image || '',
      alt: article.hero_alt || article.heroAlt || article.title,
    }))

  const articlesToShow = (categoryArticles.length > 0 ? categoryArticles : publishedArticles
    .map((article) => ({
      slug:
        article.slug ||
        String(article.title || '')
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, ''),
      tag: article.category || detailsTitle || 'Latest',
      title: article.title,
      excerpt: article.excerpt || 'In-depth coverage from The Daily Observer newsroom.',
      time: article.publish_date || article.publishDate || article.publishedAt || 'Latest update',
      image: article.hero_image || article.heroImage || article.image || '',
      alt: article.hero_alt || article.heroAlt || article.title,
    }))).slice(0, 6)

  if (articlesToShow.length === 0) {
    return <p className="mt-8 text-sm text-slate-500">No published stories are available for this category yet.</p>
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {articlesToShow.map((article) => (
        <AppLink key={article.slug} to={`/news/${article.slug}`} className="group block">
          <article className="overflow-hidden rounded-none border border-primary/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={article.image} alt={article.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute left-4 top-4 rounded-sm bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-700">
                {article.tag}
              </span>
            </div>
            <div className="p-5">
              <h3 className="line-clamp-2 text-lg font-bold leading-tight text-slate-900 transition group-hover:text-primary">
                {article.title}
              </h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{article.excerpt}</p>
              <p className="mt-4 text-xs font-semibold text-slate-500">{article.time}</p>
            </div>
          </article>
        </AppLink>
      ))}
    </div>
  )
}

export default CategoryRelatedArticles
