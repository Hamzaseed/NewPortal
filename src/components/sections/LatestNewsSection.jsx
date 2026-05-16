import { useSelector } from 'react-redux'
import AdSlot from '../ads/AdSlot'
import SectionTitle from '../ui/SectionTitle'
import NewsCard from '../ui/NewsCard'

function LatestNewsSection({ articles = [] }) {
  const homepageMidBanner = useSelector((state) =>
    state.advertising.publicAds.find((placement) =>
      placement.id === 'homepage-mid-banner' ||
      placement.id === 'homepage-banner-mid' ||
      placement.id === 'home_mid_banner' ||
      placement.name === 'Homepage Mid Banner' ||
      (
        (placement.page_name === 'Homepage' || placement.pageName === 'Homepage' || placement.route === '/newsroom' || placement.route === '/') &&
        (placement.placement_area === 'Middle Banner' || placement.placementArea === 'Middle Banner' || placement.placement_area === 'Mid Banner' || placement.placementArea === 'Mid Banner')
      )
    )
  )

  return (
    <section>
      <SectionTitle title="Latest News" actionLabel="View All" />
      <div className="space-y-16">
        {articles.slice(0, 3).map((article) => (
          <NewsCard key={article.title} article={article} />
        ))}

        <AdSlot placement={homepageMidBanner} containerClassName="py-12" imageClassName="h-[180px]" />

        {articles.slice(3).map((article) => (
          <NewsCard key={article.title} article={article} />
        ))}
      </div>

      {articles.length === 0 ? <p className="mt-8 text-sm text-slate-500">No published stories are available yet.</p> : null}
    </section>
  )
}

export default LatestNewsSection
