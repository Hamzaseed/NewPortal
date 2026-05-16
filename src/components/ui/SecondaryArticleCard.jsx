import { AppLink } from './AppLink'
import Icon from './Icon'

function SecondaryArticleCard({ article }) {
  return (
    <AppLink
      to={`/news/${article.slug || String(article.title || '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')}`}
      className="group block"
    >
      <article className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img src={article.image} alt={article.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <span className="absolute left-4 top-4 rounded-sm bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-700">
            {article.tag}
          </span>
        </div>
        <div className="p-5">
          <h4 className="line-clamp-2 text-lg font-bold leading-tight text-slate-900 transition group-hover:text-primary">{article.title}</h4>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{article.excerpt}</p>
          <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>{article.time}</span>
            <span className="flex items-center gap-1">
              <Icon name="chat_bubble" className="h-3.5 w-3.5" />
              {article.comments}
            </span>
          </div>
        </div>
      </article>
    </AppLink>
  )
}

export default SecondaryArticleCard
