import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { fetchArticles } from '../../app/articles/articleSlice'
import { fetchPublicCategories } from '../../app/categories/categoriesSlice'
import { fetchVideos } from '../../app/videos/videoSlice'
import AuthDialog from '../components/auth/AuthDialog'
import { useAuth } from '../context/AuthContext'
import { useSearch } from '../context/SearchContext'
import Icon from '../components/ui/Icon'
import { AppLink, AppNavLink } from '../components/ui/AppLink'
import ProfileMenu from '../components/ui/ProfileMenu'
import Footer from '../components/layout/Footer'
import AdSlot from '../components/ads/AdSlot'
import NetworkAdUnit from '../components/ads/NetworkAdUnit'
import CategoryArticleCard from '../components/ui/CategoryArticleCard'
import SecondaryArticleCard from '../components/ui/SecondaryArticleCard'
import { fetchPublicAds } from '../../app/advertising/advertisingSlice'
import { trackAnalyticsEvent } from '../../app/analytics/analyticsEventsSlice'
import { API_BASE_URL } from '../../utils/api'

const DEFAULT_CATEGORY_NAV = { label: 'Latest', slug: 'latest' }
const ARTICLES_PER_PAGE = 5

function CategoryPage() {
  const dispatch = useDispatch()
  const { slug = 'world' } = useParams()
  const { user } = useAuth()
  const { openSearch } = useSearch()
  const categories = useSelector((state) => state.categories.categories)
  const savedArticles = useSelector((state) => state.articles.articles)
  const savedVideos = useSelector((state) => state.videos.videos)
  const comments = useSelector((state) => state.comments.comments)
  const publicAds = useSelector((state) => state.advertising.publicAds)
  const categoryInlineBanner = publicAds.find((placement) =>
    placement.id === 'category-inline-banner' ||
    placement.id === 'category-page-banner' ||
    placement.id === 'category_banner' ||
    placement.name === 'Category Page Banner' ||
    (
      (placement.page_name === 'Category Page' || placement.pageName === 'Category Page' || placement.route === '/category/:slug' || placement.route === '/category') &&
      (placement.placement_area === 'Inline Banner' || placement.placementArea === 'Inline Banner' || placement.placement_area === 'Middle Banner' || placement.placementArea === 'Middle Banner')
    )
  )
  const adSenseClient = import.meta.env.VITE_ADSENSE_CLIENT_ID || ''
  const ezoicScriptUrl = import.meta.env.VITE_EZOIC_SCRIPT_URL || ''
  const googleCategoryInlineSlot = import.meta.env.VITE_GOOGLE_AD_SLOT_CATEGORY_INLINE || ''
  const ezoicCategoryInlinePlaceholder = import.meta.env.VITE_EZOIC_PLACEHOLDER_CATEGORY_INLINE || ''
  const userRole = String(user?.role || '').trim().toLowerCase()
  const shouldTrackAnalytics = userRole !== 'admin' && userRole !== 'super_admin' && userRole !== 'administrator'
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [sortBy, setSortBy] = useState('Latest')
  const [dateRange, setDateRange] = useState('Last 30 Days')
  const [currentPage, setCurrentPage] = useState(1)
  const pageTitle = String(slug || '')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

  if (slug === 'video' || slug === 'videos') {
    return <Navigate to="/videos" replace />
  }
  const categoryTopNav = [
    DEFAULT_CATEGORY_NAV,
    ...categories
      .filter((item) => item.is_public !== false && item.is_active !== false && item.is_featured)
      .map((item) => ({
        label: item.name,
        slug: (item.slug || '').replace(/^\//, ''),
      })),
  ].filter((item, index, items) => item.slug && items.findIndex((entry) => entry.slug === item.slug) === index)

  const publishedArticles = savedArticles.filter((article) => article.status === 'Published')
  const categoryVideos = useMemo(() => {
    if (slug === 'latest') {
      return savedVideos
        .filter((video) => String(video.category || '').trim().toLowerCase() === 'latest')
        .slice(0, 4)
    }

    const currentCategory = String(slug || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    return savedVideos
      .filter((video) => {
        const videoCategory = String(video.category || '')
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')

        return videoCategory === currentCategory
      })
      .slice(0, 4)
  }, [savedVideos, slug])

  const latestArticlesFromStore = publishedArticles
    .filter((article) => String(article.category || '').trim().toLowerCase() === 'latest')
    .map((article) => ({
      slug:
        article.slug ||
        String(article.title || '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, ''),
      category: 'latest',
      tag: article.category || 'Latest',
      title: article.title,
      excerpt: article.excerpt || 'In-depth coverage from The Daily Observer newsroom.',
      time: article.publish_date || article.publishDate || article.publishedAt || 'Latest update',
      image: article.hero_image || article.heroImage || article.image || '',
      alt: article.hero_alt || article.heroAlt || article.title,
      comments: comments.filter((item) => item.articleId === article.slug && item.status === 'approved').length,
    }))
  const categoryArticlesFromStore = publishedArticles
    .filter((article) => {
      const articleCategory = String(article.category || '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      const currentCategory = String(slug || '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
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
      category: slug,
      tag: article.category || pageTitle,
      title: article.title,
      excerpt: article.excerpt || 'In-depth coverage from The Daily Observer newsroom.',
      time: article.publish_date || article.publishDate || article.publishedAt || 'Latest update',
      image: article.hero_image || article.heroImage || article.image || '',
      alt: article.hero_alt || article.heroAlt || article.title,
      comments: comments.filter((item) => item.articleId === article.slug && item.status === 'approved').length,
    }))
  const filteredArticles = useMemo(() => {
    let items = slug === 'latest' ? [...latestArticlesFromStore] : [...categoryArticlesFromStore]

    if (slug !== 'latest' && dateRange !== 'Last 30 Days' && dateRange !== 'Custom') {
      items = items.filter((article) => {
        const text = `${article.time || ''} ${article.publishedAt || ''} ${article.publishDate || ''}`.toLowerCase()

        if (dateRange === 'Last 24 Hours') {
          if (text.includes('hour')) {
            return true
          }

          if (text.includes('day')) {
            return text.includes('1 day')
          }

          return false
        }

        if (dateRange === 'Last 7 Days') {
          if (text.includes('hour')) {
            return true
          }

          if (text.includes('day')) {
            const days = Number.parseInt(text, 10)
            return Number.isNaN(days) || days <= 7
          }
        }

        return true
      })
    }

    if (sortBy === 'Most Read' || sortBy === 'Featured') {
      items.sort((a, b) => (b.comments || 0) - (a.comments || 0))
    }

    return items
  }, [categoryArticlesFromStore, dateRange, latestArticlesFromStore, slug, sortBy])

  const title = `${pageTitle} | The Daily Observer`
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE))
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE
  const pageArticles = filteredArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE)
  const featuredArticle = pageArticles[0] || null
  const secondaryArticles = pageArticles.slice(1, 5)
  const displayedArticles = featuredArticle ? [featuredArticle, ...secondaryArticles] : []
  const description = featuredArticle?.excerpt || `Read the latest ${pageTitle} stories, analysis, and updates from The Daily Observer.`
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/category/${slug}` : `/category/${slug}`
  const image = featuredArticle?.image || ''

  useEffect(() => {
    setCurrentPage(1)
  }, [slug, sortBy, dateRange])

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchPublicCategories())
    }
  }, [categories.length, dispatch])

  useEffect(() => {
    if (!savedArticles.length) {
      dispatch(fetchArticles({ page: 1, limit: 50 }))
    }
  }, [dispatch, savedArticles.length])

  useEffect(() => {
    if (!savedVideos.length) {
      dispatch(fetchVideos({ page: 1, limit: 12 }))
    }
  }, [dispatch, savedVideos.length])

  useEffect(() => {
    if (!publicAds.length) {
      dispatch(fetchPublicAds())
    }
  }, [dispatch, publicAds.length])

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
      event_type: 'category_view',
      session_id: sessionId,
      category_slug: slug,
      path: window.location.pathname,
      device_type: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
      referrer: document.referrer || '',
      engaged_seconds: 0,
    }))
  }, [dispatch, shouldTrackAnalytics, slug])

  return (
    <div className="min-h-screen bg-background-light text-slate-900">
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

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">Category</p>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{pageTitle}</h1>
              <p className="mt-3 text-sm text-slate-600">Latest stories, reporting, and updates from the {pageTitle} desk.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openSearch('site')}
                className="relative w-full border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-left text-sm text-slate-500 transition hover:border-slate-400 focus:outline-none sm:w-64"
                aria-label="Open search"
              >
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <Icon name="search" className="h-3.5 w-3.5" />
                </span>
                Search this section
              </button>
              <div className="shrink-0">
                {user ? (
                  <ProfileMenu align="left" />
                ) : (
                  <button
                    type="button"
                    onClick={() => setAuthDialogOpen(true)}
                    className="auth-login-button"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>

          <nav className="mt-6 flex flex-wrap gap-2">
            {categoryTopNav.map((item, index) => (
              <AppNavLink
                key={item.slug}
                to={item.slug === 'video' || item.slug === 'videos' ? '/videos' : `/category/${item.slug}`}
                className={({ isActive }) =>
                  [
                    'border px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] transition',
                    isActive || (index === 0 && slug === 'latest')
                      ? 'border-slate-950 bg-slate-950 text-white'
                      : 'border-slate-300 bg-white text-slate-600 hover:border-slate-950 hover:text-slate-950',
                  ]
                    .filter(Boolean)
                    .join(' ')
                }
              >
                {item.label}
              </AppNavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-sm">
          <AppLink to="/newsroom" className="text-slate-500 transition hover:text-primary">
            Home
          </AppLink>
          <Icon name="chevron_right" className="h-3.5 w-3.5 text-slate-300" />
          <span className="font-semibold text-primary">{pageTitle}</span>
        </nav>

        <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-primary/10 pb-6 md:flex-row md:items-center">
          <h3 className="border-l-4 border-primary pl-4 text-xl font-bold uppercase tracking-wider">{pageTitle}</h3>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase text-slate-500">Sort By:</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded border-none bg-primary/5 py-1.5 pl-3 pr-8 text-sm font-medium focus:ring-primary"
              >
                <option>Latest</option>
                <option>Most Read</option>
                <option>Featured</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase text-slate-500">Date Range:</span>
              <select
                value={dateRange}
                onChange={(event) => setDateRange(event.target.value)}
                className="rounded border-none bg-primary/5 py-1.5 pl-3 pr-8 text-sm font-medium focus:ring-primary"
              >
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Custom</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="flex-1">
            {featuredArticle ? (
              <section className="mb-10">
                <CategoryArticleCard article={featuredArticle} />
              </section>
            ) : null}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {secondaryArticles.map((article) => (
                <SecondaryArticleCard key={`${article.title}-${article.time}`} article={article} />
              ))}
            </div>

            <NetworkAdUnit
              provider="google"
              slot={googleCategoryInlineSlot}
              containerClassName="pt-8 pb-6 md:pt-10 md:pb-8"
              minHeightClass="min-h-[180px]"
            />
            <NetworkAdUnit
              provider="ezoic"
              ezoicPlaceholderId={ezoicCategoryInlinePlaceholder}
              containerClassName="pt-4 pb-8 md:pt-6 md:pb-10"
              minHeightClass="min-h-[180px]"
            />

            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="flex size-10 items-center justify-center rounded border border-primary/20 transition hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Icon name="chevron_left" className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`size-10 rounded font-bold transition ${
                    currentPage === page
                      ? 'bg-primary text-white'
                      : 'border border-primary/20 hover:bg-primary/5'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className="flex size-10 items-center justify-center rounded border border-primary/20 transition hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Icon name="chevron_right" className="h-4 w-4" />
              </button>
            </div>

            {displayedArticles.length === 0 ? <p className="mt-8 text-sm text-slate-500">No published stories are available for this category yet.</p> : null}
          </div>

          <aside className="w-full lg:w-80">
            <div className="mb-10">
              <h5 className="mb-4 border-b border-primary/10 pb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">Videos</h5>
              <div className="space-y-4">
                {categoryVideos.length > 0 ? (
                  categoryVideos.map((video) => (
                    (() => {
                      const thumbRaw = video.thumbnail || video.thumbnail_url || video.thumbnailUrl || video.image || video.image_url || video.imageUrl || video.poster || video.poster_url || video.posterUrl || ''
                      const thumb = String(thumbRaw || '').trim().replace(/\\+/g, '/')
                      const thumbUrl = thumb.startsWith('/uploads/')
                        ? `${API_BASE_URL}${thumb}`
                        : thumb.startsWith('uploads/')
                          ? `${API_BASE_URL}/${thumb}`
                          : thumb
                      const videoRaw = video.videoUrl || video.video_url || ''
                      const videoSource = String(videoRaw || '').trim().replace(/\\+/g, '/')
                      const videoUrl = videoSource.startsWith('/uploads/')
                        ? `${API_BASE_URL}${videoSource}`
                        : videoSource.startsWith('uploads/')
                          ? `${API_BASE_URL}/${videoSource}`
                          : videoSource
                      const isDirectVideo = /^blob:/i.test(videoUrl) || /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(videoUrl)

                      return (
                    <AppLink key={video.slug} to={`/videos/${video.slug}`} className="group block">
                      <article className="cursor-pointer">
                        <div className="relative mb-2 aspect-video overflow-hidden">
                          {thumbUrl ? (
                            <img
                              src={thumbUrl}
                              alt={video.alt || video.title}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                              onError={(event) => {
                                event.currentTarget.style.display = 'none'
                              }}
                            />
                          ) : isDirectVideo ? (
                            <video
                              src={videoUrl}
                              preload="metadata"
                              muted
                              playsInline
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                            />
                          ) : null}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Icon name="play_circle" className="h-11 w-11 text-white" />
                          </div>
                          <span className="absolute bottom-2 right-2 bg-black px-1 text-[10px] text-white">{video.duration}</span>
                        </div>
                        <h6 className="line-clamp-2 text-sm font-bold leading-snug">{video.title}</h6>
                      </article>
                    </AppLink>
                      )
                    })()
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No videos found for this category.</p>
                )}
              </div>
            </div>

            <AdSlot
              placement={categoryInlineBanner}
              containerClassName="pt-0"
              imageClassName="h-[180px]"
            />
          </aside>
        </div>
      </main>

      <Footer />
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} initialMode="login" />
    </div>
  )
}

export default CategoryPage
