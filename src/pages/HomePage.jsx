import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import AdSlot from '../components/ads/AdSlot'
import NetworkAdUnit from '../components/ads/NetworkAdUnit'
import BreakingTicker from '../components/sections/BreakingTicker'
import CategoryHighlightsSection from '../components/sections/CategoryHighlightsSection'
import HeroSection from '../components/sections/HeroSection'
import HomeMarketsSection from '../components/sections/HomeMarketsSection'
import LatestNewsSection from '../components/sections/LatestNewsSection'
import QuickBriefsSection from '../components/sections/QuickBriefsSection'
import Sidebar from '../components/sections/Sidebar'
import { fetchPublicAds } from '../../app/advertising/advertisingSlice'
import { fetchArticles } from '../../app/articles/articleSlice'
import { fetchPublicCategories } from '../../app/categories/categoriesSlice'
import { fetchSettings } from '../../app/settings/settingSlice'
import { fetchVideos } from '../../app/videos/videoSlice'
import { trackAnalyticsEvent } from '../../app/analytics/analyticsEventsSlice'
import { useAuth } from '../context/AuthContext'

function HomePage() {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const { articles } = useSelector((state) => state.articles)
  const { categories } = useSelector((state) => state.categories)
  const { videos } = useSelector((state) => state.videos)
  const publicAds = useSelector((state) => state.advertising.publicAds)
  const settings = useSelector((state) => state.settings.settings)
  const homepageTopBanner = publicAds.find((placement) =>
    placement.id === 'homepage-top-banner' ||
    placement.id === 'homepage-hero-banner' ||
    placement.id === 'homepage-banner' ||
    placement.id === 'home-top-banner' ||
    placement.id === 'home-hero-banner' ||
    placement.name === 'Homepage Top Banner' ||
    placement.name === 'Homepage Hero Banner' ||
    placement.name === 'Hero Banner' ||
    (
      (placement.page_name === 'Homepage' || placement.pageName === 'Homepage' || placement.route === '/newsroom' || placement.route === '/') &&
      (
        placement.placement_area === 'Top Banner' ||
        placement.placementArea === 'Top Banner' ||
        placement.placement_area === 'Hero Banner' ||
        placement.placementArea === 'Hero Banner'
      )
    )
  )
  const homepageCategoryBanner = publicAds.find((placement) =>
    placement.id === 'homepage-category-banner' ||
    placement.id === 'home-category-banner' ||
    placement.id === 'homepage-category-highlight-banner' ||
    placement.name === 'Homepage Category Banner' ||
    placement.name === 'Homepage Category Highlights Banner' ||
    placement.name === 'Category Banner' ||
    (
      (placement.page_name === 'Homepage' || placement.pageName === 'Homepage' || placement.route === '/newsroom' || placement.route === '/') &&
      (
        placement.placement_area === 'Category Banner' ||
        placement.placementArea === 'Category Banner' ||
        placement.placement_area === 'Category Highlights Banner' ||
        placement.placementArea === 'Category Highlights Banner'
      )
    )
  )
  const adSenseClient = import.meta.env.VITE_ADSENSE_CLIENT_ID || ''
  const ezoicScriptUrl = import.meta.env.VITE_EZOIC_SCRIPT_URL || ''
  const googleHomeTopSlot = import.meta.env.VITE_GOOGLE_AD_SLOT_HOME_TOP || ''
  const ezoicHomeMidPlaceholder = import.meta.env.VITE_EZOIC_PLACEHOLDER_HOME_MID || ''
  const userRole = String(user?.role || '').trim().toLowerCase()
  const shouldTrackAnalytics = userRole !== 'admin' && userRole !== 'super_admin' && userRole !== 'administrator'

  useEffect(() => {
    if (!articles.length) {
      dispatch(fetchArticles({ page: 1, limit: 50 }))
    }
    if (!categories.length) {
      dispatch(fetchPublicCategories())
    }
    if (!videos.length) {
      dispatch(fetchVideos({ page: 1, limit: 8 }))
    }
    if (!publicAds.length) {
      dispatch(fetchPublicAds())
    }
    dispatch(fetchSettings())
  }, [articles.length, categories.length, dispatch, publicAds.length, videos.length])

  useEffect(() => {
    if (!shouldTrackAnalytics) {
      return
    }

    let sessionId = localStorage.getItem('session_id')

    if (!sessionId) {
      sessionId = `session_${Date.now()}`
      localStorage.setItem('session_id', sessionId)
    }

    dispatch(trackAnalyticsEvent({
      event_type: 'page_view',
      session_id: sessionId,
      path: window.location.pathname,
      device_type: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
      referrer: document.referrer || '',
      engaged_seconds: 0,
    }))
  }, [dispatch, shouldTrackAnalytics])

  const publishedArticles = useMemo(
    () =>
      articles
        .filter((article) => article.status === 'Published')
        .map((article, index) => {
          const title = article?.title || 'Untitled Article'
          const publishDate = article?.publish_date ? new Date(article.publish_date) : null
          const publishDateText = publishDate && !Number.isNaN(publishDate.getTime())
            ? publishDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : ''

          return {
            id:
              article?.id ||
              article?.slug ||
              `${String(title)
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')}-${index}`,
            slug:
              article?.slug ||
              String(title)
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, ''),
            title,
            excerpt: article?.excerpt || article?.seo_description || article?.seoDescription || '',
            image: article?.hero_image || article?.heroImage || article?.image || '',
            alt: article?.hero_alt || article?.heroAlt || article?.title || 'Article image',
            category: article?.category || 'News',
            author: article?.author || 'Editorial Desk',
            time: publishDateText || article?.publishDate || article?.publishedAt || 'Latest update',
            status: article?.status || '',
            views: article?.views ?? 0,
            likes: article?.likes ?? 0,
            readTime: article?.read_time || article?.readTime || '',
            raw: article,
          }
        }),
    [articles]
  )
  const latestCategoryArticles = publishedArticles.filter(
    (article) => (article.category || '').toLowerCase() === 'latest'
  )
  const heroStory = latestCategoryArticles[0]
    ? {
        ...latestCategoryArticles[0],
        summary: latestCategoryArticles[0].excerpt,
      }
    : null
  const topStories = latestCategoryArticles.slice(1, 5)
  const latestArticles = latestCategoryArticles.slice(0, 6)
  const breakingItems = latestCategoryArticles.slice(0, 6).map((article) => article.title)
  const mostRead = publishedArticles.slice(0, 5).map((article, index) => ({
    rank: `0${index + 1}`.slice(-2),
    title: article.title,
    section: article.category,
    slug: article.slug,
  }))
  const opinionArticles = publishedArticles.filter((article) => article.category.toLowerCase() === 'opinion').slice(0, 3)
  const opinions = opinionArticles.map((article) => ({
    author: article.author,
    quote: article.excerpt || article.title,
  }))
  const categoryHighlights = categories
    .filter((category) => category.is_public !== false && category.is_active !== false)
    .filter((category) => (category.name || '').toLowerCase() !== 'latest')
    .slice(0, 6)
    .map((category) => {
      const categoryArticles = publishedArticles.filter(
        (article) =>
          String(article.category || '')
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') ===
          String(category.name || '')
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
      )

      if (categoryArticles.length === 0) {
        return null
      }

      return {
        slug: (category.slug || '').replace(/^\//, ''),
        title: category.name,
        lead: {
          slug: categoryArticles[0].slug,
          title: categoryArticles[0].title,
          image: categoryArticles[0].image,
          alt: categoryArticles[0].alt,
          excerpt: categoryArticles[0].excerpt,
          author: categoryArticles[0].author,
          time: categoryArticles[0].time,
        },
        stories: categoryArticles.slice(1, 4).map((article) => ({
          slug: article.slug,
          title: article.title,
        })),
      }
    })
    .filter(Boolean)
  const briefs = [
    {
      label: 'Published Stories',
      value: String(publishedArticles.length),
      detail: 'Stories currently available to readers.',
    },
    {
      label: 'Categories Live',
      value: String(categories.filter((category) => category.is_public !== false && category.is_active !== false).length),
      detail: 'Public sections visible across the newsroom.',
    },
    {
      label: 'Videos Published',
      value: String(videos.length),
      detail: 'Videos currently available in the watch experience.',
    },
    {
      label: 'Opinion Pieces',
      value: String(opinionArticles.length),
      detail: 'Published opinion stories available right now.',
    },
  ]

  const brand = settings?.site_name?.trim() || settings?.brand_name?.trim() || 'Daily Observer'
  const title = `${brand} | Latest News, Videos and Analysis`
  const description = heroStory?.summary || 'Latest published coverage, videos, and analysis.'
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/newsroom` : '/newsroom'
  const image = heroStory ? heroStory.hero_image || heroStory.heroImage || heroStory.image || '' : ''

  return (
    <div className="relative flex min-h-screen flex-col">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        {adSenseClient ? (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseClient}`}
            crossOrigin="anonymous"
          />
        ) : null}
        {ezoicScriptUrl ? <script async src={ezoicScriptUrl} /> : null}
      </Helmet>

      <Header />
      <BreakingTicker items={breakingItems} />

      <main className="container-shell flex-1 py-8">
        <NetworkAdUnit
          provider="google"
          slot={googleHomeTopSlot}
          containerClassName="mb-8 pt-0 md:mb-10"
          minHeightClass="min-h-[180px]"
        />
        <HeroSection heroStory={heroStory} topStories={topStories} />
        <AdSlot placement={homepageTopBanner} containerClassName="mb-12 pt-0 md:mb-14" imageClassName="h-[180px]" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <LatestNewsSection articles={latestArticles} />
          </div>
          <Sidebar mostRead={mostRead} opinions={opinions} />
        </div>

        <CategoryHighlightsSection sections={categoryHighlights} />
        <NetworkAdUnit
          provider="ezoic"
          ezoicPlaceholderId={ezoicHomeMidPlaceholder}
          containerClassName="py-8 md:py-10"
          minHeightClass="min-h-[180px]"
        />
        <AdSlot placement={homepageCategoryBanner} containerClassName="pt-8 md:pt-10" imageClassName="h-[180px]" />
        <HomeMarketsSection />
        <QuickBriefsSection briefs={briefs} />
      </main>

      <Footer />
    </div>
  )
}

export default HomePage
