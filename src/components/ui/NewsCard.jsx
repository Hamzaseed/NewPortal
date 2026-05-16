import { AppLink } from './AppLink'

function NewsCard({ article }) {
  return (
    <AppLink
      to={`/news/${article.slug || String(article.title || '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')}`}
    >
      <article className="group grid grid-cols-1 gap-6 md:grid-cols-3">
        <figure className="h-52 bg-slate-50 p-2 md:h-48">
          <div className="h-full overflow-hidden">
            <img src={article.image} alt={article.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          </div>
        </figure>
        <div className="flex flex-col justify-center md:col-span-2">
          <span className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">{article.category}</span>
          <h3 className="mb-3 font-display text-2xl font-bold leading-tight text-slate-900 transition group-hover:text-primary">{article.title}</h3>
          <p className="mb-4 text-sm leading-6 text-slate-600">{article.excerpt}</p>
          <footer className="flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-slate-500">
            <span className="font-bold text-slate-900">By {article.author}</span>
            <span>|</span>
            <time>{article.time}</time>
          </footer>
        </div>
      </article>
    </AppLink>
  )
}

export default NewsCard
