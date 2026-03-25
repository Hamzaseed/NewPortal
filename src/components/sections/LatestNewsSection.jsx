import { latestArticles } from '../../data/newsData'
import SectionTitle from '../ui/SectionTitle'
import NewsCard from '../ui/NewsCard'

function LatestNewsSection() {
  return (
    <section>
      <SectionTitle title="Latest News" actionLabel="View All" />
      <div className="space-y-16">
        {latestArticles.slice(0, 3).map((article) => (
          <NewsCard key={article.title} article={article} />
        ))}

        <div className="border-y border-slate-200 py-12">
          <h3 className="mb-6 text-center text-sm font-bold uppercase tracking-[0.24em] text-slate-400">
            Advertisement
          </h3>
          <div className="flex h-32 items-center justify-center rounded-2xl bg-slate-100">
            <span className="text-sm italic text-slate-400">Sponsored Content Space</span>
          </div>
        </div>

        {latestArticles.slice(3).map((article) => (
          <NewsCard key={article.title} article={article} />
        ))}
      </div>

      <button
        type="button"
        className="mt-12 w-full border-2 border-slate-900 py-4 text-sm font-bold uppercase tracking-[0.28em] transition hover:bg-slate-900 hover:text-white"
      >
        Load More Stories
      </button>
    </section>
  )
}

export default LatestNewsSection
