import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import AuthDialog from '../components/auth/AuthDialog'
import AdSlot from '../components/ads/AdSlot'
import NetworkAdUnit from '../components/ads/NetworkAdUnit'
import Footer from '../components/layout/Footer'
import Icon from '../components/ui/Icon'
import { AppLink } from '../components/ui/AppLink'
import CommentsSection from '../components/ui/CommentsSection'
import ImageWithFallback from '../components/ui/ImageWithFallback'
import ProfileMenu from '../components/ui/ProfileMenu'
import ArticleTopStories from '../components/ui/ArticleTopStories'
import SocialLinksDisplay from '../components/socialsettings/socialLinksDisplay'
import { useAuth } from '../context/AuthContext'
import { useSearch } from '../context/SearchContext'
import CategoryRelatedArticles from '../components/ui/CategoryRelatedArticles'
import { fetchPublicAds } from '../../app/advertising/advertisingSlice'
import { clearArticle, fetchArticleBySlug, fetchArticles, likeArticle, saveArticle, unlikeArticle, unsaveArticle } from '../../app/articles/articleSlice'
import { fetchSettings } from '../../app/settings/settingSlice'
import { trackAnalyticsEvent } from '../../app/analytics/analyticsEventsSlice'
import { shareArticle } from '../../utils/shareArticle'

function ArticlePage() {
  const dispatch = useDispatch()
  const { slug = '' } = useParams()
  const savedArticles = useSelector((state) => state.articles.articles)
  const currentArticle = useSelector((state) => state.articles.article)
  const publicAds = useSelector((state) => state.advertising.publicAds)
  const settings = useSelector((state) => state.settings.settings)
  const articleTopBanner = publicAds.find((placement) =>
    placement.id === 'article-top-banner' ||
    placement.id === 'article-banner-top' ||
    placement.id === 'article_banner_top' ||
    placement.name === 'Article Top Banner' ||
    (
      (placement.page_name === 'Article Page' || placement.pageName === 'Article Page' || placement.route === '/news/:slug') &&
      (placement.placement_area === 'Top Banner' || placement.placementArea === 'Top Banner')
    )
  )
  const articleSidebarBanner = publicAds.find((placement) =>
    placement.id === 'article-sidebar-banner' ||
    placement.id === 'article-banner-sidebar' ||
    placement.id === 'article_sidebar_banner' ||
    placement.name === 'Article Sidebar Banner' ||
    (
      (placement.page_name === 'Article Page' || placement.pageName === 'Article Page' || placement.route === '/news/:slug') &&
      (placement.placement_area === 'Sidebar' || placement.placementArea === 'Sidebar')
    )
  )
  const adSenseClient = import.meta.env.VITE_ADSENSE_CLIENT_ID || ''
  const ezoicScriptUrl = import.meta.env.VITE_EZOIC_SCRIPT_URL || ''
  const googleArticleTopSlot = import.meta.env.VITE_GOOGLE_AD_SLOT_ARTICLE_TOP || ''
  const ezoicArticleSidebarPlaceholder = import.meta.env.VITE_EZOIC_PLACEHOLDER_ARTICLE_SIDEBAR || ''
  const { user } = useAuth()
  const { openSearch } = useSearch()
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [likeLoading, setLikeLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const apiBaseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
  const userRole = String(user?.role || '').trim().toLowerCase()
  const shouldTrackAnalytics = userRole !== 'admin' && userRole !== 'super_admin' && userRole !== 'administrator'

  useEffect(() => {
    dispatch(fetchSettings())

    if (!savedArticles.length) {
      dispatch(fetchArticles({ page: 1, limit: 50 }))
    }

    dispatch(fetchArticleBySlug(slug))

    return () => {
      dispatch(clearArticle())
    }
  }, [dispatch, savedArticles.length, slug])

  useEffect(() => {
    if (!publicAds.length) {
      dispatch(fetchPublicAds())
    }
  }, [dispatch, publicAds.length])

  const article =
    currentArticle?.slug === slug
      ? currentArticle
      : savedArticles.find((item) => item.slug === slug) || null

  const contentBlocks = Array.isArray(article?.content_blocks) ? article.content_blocks : []

  const tags =
    Array.isArray(article?.tags)
      ? article.tags
      : typeof article?.tags === 'string'
        ? article.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
        : []

  const articleTitle = article?.title || 'Untitled Article'
  const articleCategory = article?.category || 'News'

  const categorySlug = String(articleCategory || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  const heroImage = article?.hero_image?.startsWith('/uploads/')
    ? `${apiBaseUrl}${article.hero_image}`
    : article?.hero_image || ''
  const heroAlt = articleTitle
  const publishedTime = article?.publish_date || article?.publishDate || article?.publishedAt || ''
  const authorName = article?.author || 'Editorial Desk'
  const authorImage = article?.authorimage?.startsWith('/uploads/')
    ? `${apiBaseUrl}${article.authorimage}`
    : article?.authorimage || ''
  const readTime = article?.read_time || article?.readTime || ''
  const showAdminSocialLinks = article?.created_by === "Editorial Desk" || article?.created_by === "Admin"
  const likesCount = Number(article?.likes_count || 0)
  const isLiked = Boolean(article?.is_liked)

  const brand = settings?.site_name?.trim() || settings?.brand_name?.trim() || 'Daily Observer'
  const articlePageLogo = settings?.site_logo_url?.trim()
    ? settings.site_logo_url.startsWith('/uploads/')
      ? `${apiBaseUrl}${settings.site_logo_url}`
      : settings.site_logo_url
    : ''
  const title = `${articleTitle} | ${brand}`

  const description =
    article?.seo_description ||
    article?.excerpt ||
    contentBlocks.find((block) => block.type === 'paragraph')?.content || ''

  const canonicalUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/news/${slug}`
      : `/news/${slug}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: articleTitle,
    description,
    image: heroImage ? [heroImage] : [],
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: brand,
    },
    mainEntityOfPage: canonicalUrl,
    datePublished: publishedTime,
    dateModified: publishedTime,
  }

  const relatedArticles = savedArticles.filter(
    (item) => item.status === 'Published' && item.slug !== slug
  )
  const isSaved = Boolean(article?.is_saved)

  useEffect(() => {
    if (!article?.slug || !shouldTrackAnalytics) {
      return
    }

    let sessionId = localStorage.getItem('session_id')

    if (!sessionId) {
      sessionId = `session_${Date.now()}`
      localStorage.setItem('session_id', sessionId)
    }

    dispatch(trackAnalyticsEvent({
      event_type: 'article_view',
      session_id: sessionId,
      article_id: article?.id || null,
      article_slug: article.slug,
      category_slug: categorySlug,
      path: window.location.pathname,
      device_type: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
      referrer: document.referrer || '',
      engaged_seconds: 0,
    }))
  }, [article?.id, article?.slug, categorySlug, dispatch, shouldTrackAnalytics])

  if (!article && !savedArticles.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-light px-4 text-slate-500">
        Loading article...
      </div>
    )
  }

  const handleLikeClick = async () => {
    if (!user) {
      setAuthDialogOpen(true)
      return
    }

    if (!article?.id || likeLoading) {
      return
    }

    setLikeLoading(true)

    try {
      if (isLiked) {
        await dispatch(unlikeArticle(article.id)).unwrap()
      } else {
        await dispatch(likeArticle(article.id)).unwrap()
      }
    } finally {
      setLikeLoading(false)
    }
  }

  const handleCommentClick = () => {
    const commentsSection = document.getElementById('article-comments')

    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleShareClick = async () => {
    if (!article?.slug) {
      return
    }

    const shareUrl = typeof window !== 'undefined' ? window.location.href : canonicalUrl

    try {
      await shareArticle({
        title: articleTitle,
        text: description,
        url: shareUrl,
      })

      if (!shouldTrackAnalytics) {
        return
      }

      let sessionId = localStorage.getItem('session_id')

      if (!sessionId) {
        sessionId = `session_${Date.now()}`
        localStorage.setItem('session_id', sessionId)
      }

      dispatch(trackAnalyticsEvent({
        event_type: 'share',
        session_id: sessionId,
        article_id: article?.id || null,
        article_slug: article.slug,
        category_slug: categorySlug,
        path: window.location.pathname,
        device_type: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
        referrer: document.referrer || '',
        engaged_seconds: 0,
      }))
    } catch (error) {
      return
    }
  }

  const handleBookmarkClick = async () => {
    if (!user) {
      setAuthDialogOpen(true)
      return
    }

    if (!article?.id || saveLoading) {
      return
    }

    setSaveLoading(true)

    try {
      if (isSaved) {
        await dispatch(unsaveArticle(article.id)).unwrap()
      } else {
        await dispatch(saveArticle(article.id)).unwrap()
      }
    } finally {
      setSaveLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background-light text-slate-900">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={heroImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={heroImage} />
        {adSenseClient ? (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseClient}`}
            crossOrigin="anonymous"
          />
        ) : null}
        {ezoicScriptUrl ? <script async src={ezoicScriptUrl} /> : null}
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <header className="w-full border-b border-slate-200 bg-background-light">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-5">
            <div className="flex min-h-[40px] items-center">
              {articlePageLogo ? (
                <ImageWithFallback
                  src={articlePageLogo}
                  alt={brand}
                  className="h-16 w-22 object-fill"
                />
              ) : (
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                  {brand}
                </span>
              )}
            </div>

            <div className="flex items-center justify-start gap-3 lg:justify-end">
              <button
                type="button"
                onClick={() => openSearch('site')}
                className="relative hidden rounded-none border border-slate-300 bg-background-light py-2.5 pl-10 pr-4 text-left text-sm text-slate-500 transition hover:border-slate-900 focus:outline-none sm:block sm:w-56"
                aria-label="Open search"
              >
                <Icon
                  name="search"
                  className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                />
                Search news
              </button>

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

              <button
                type="button"
                className="rounded-full bg-slate-950 px-5 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-grow px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
          <AppLink to="/newsroom" className="transition hover:text-primary">
            Home
          </AppLink>
          <Icon name="chevron_right" className="h-3.5 w-3.5 text-slate-300" />
          <AppLink
            to={categorySlug === 'video' || categorySlug === 'videos' ? '/videos' : `/category/${categorySlug}`}
            className="transition hover:text-primary"
          >
            {articleCategory}
          </AppLink>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <article className="lg:col-span-8">
            <header className="mb-10">
              <h1 className="font-display text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
                {articleTitle}
              </h1>

              <div className="mt-6 flex items-center justify-between gap-4 border-y border-slate-200 py-6">
                <div className="h-14 w-14 overflow-hidden rounded-full bg-slate-200">
                  {authorImage ? <img src={authorImage} alt={authorName} className="h-full w-full object-cover" /> : null}
                </div>
                <div className="flex flex-1 items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-bold text-slate-900">{authorName}</p>
                    <p className="text-sm text-slate-500">{readTime || '-'} read</p>
                  </div>

                  {showAdminSocialLinks ? (
                    <SocialLinksDisplay variant="admin" />
                  ) : (
                    <SocialLinksDisplay variant="author" />
                  )}
                </div>
              </div>
            </header>

            <div className="group relative mb-10 aspect-video overflow-hidden rounded-sm">
              <img
                src={heroImage}
                alt={heroAlt}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 rounded bg-black/50 px-2 py-1 text-xs text-white">
                {article?.image_credit || brand}
              </div>
            </div>

            <NetworkAdUnit
              provider="google"
              slot={googleArticleTopSlot}
              containerClassName="mb-8 pt-0 md:mb-10"
              minHeightClass="min-h-[180px]"
            />
            <AdSlot placement={articleTopBanner} containerClassName="mb-12 pt-0 md:mb-14" imageClassName="h-[180px]" />

            <div className="relative flex gap-8">
              <aside className="sticky top-24 hidden h-fit flex-col gap-4 xl:flex">
                <button
                  type="button"
                  onClick={handleLikeClick}
                  disabled={likeLoading}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
                    isLiked
                      ? 'border-slate-950 bg-slate-950 text-white'
                      : 'border-slate-200 hover:border-primary hover:text-primary'
                  } ${likeLoading ? 'cursor-not-allowed opacity-70' : ''}`}
                >
                  <Icon name="thumb_up" className="h-4 w-4" />
                </button>

                <div className="text-center text-xs font-bold text-slate-500">{likesCount}</div>

                <button
                  type="button"
                  onClick={handleCommentClick}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition-all hover:border-primary hover:text-primary"
                >
                  <Icon name="chat_bubble" className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={handleShareClick}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition-all hover:border-primary hover:text-primary"
                >
                  <Icon name="share" className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={handleBookmarkClick}
                  disabled={saveLoading}
                  aria-pressed={isSaved}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all hover:border-primary hover:text-primary ${
                    isSaved ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200'
                  } ${saveLoading ? 'cursor-not-allowed opacity-70' : ''}`}
                >
                  <Icon name="bookmark" className="h-4 w-4" />
                </button>
              </aside>

              <div className="mx-auto w-full max-w-[820px] space-y-8">
                {contentBlocks.map((block, index) => {
                  if (block.type === 'paragraph') {
                    return (
                      <p
                        key={index}
                        className={`text-base leading-8 text-slate-800 md:text-[1.05rem] ${
                          block.bold ? 'font-bold text-slate-950' : ''
                        }`}
                      >
                        {block.content}
                      </p>
                    )
                  }

                  if (block.type === 'heading') {
                    const HeadingTag = block.level || 'h2'
                    const sizeClassMap = {
                      h1: 'text-5xl md:text-6xl',
                      h2: 'text-3xl md:text-4xl',
                      h3: 'text-2xl md:text-3xl',
                      h4: 'text-xl md:text-2xl',
                      h5: 'text-lg md:text-xl',
                      h6: 'text-base md:text-lg',
                    }

                    return (
                      <HeadingTag
                        key={index}
                        className={`pt-6 font-display leading-tight text-slate-950 ${
                          sizeClassMap[HeadingTag]
                        } ${block.bold ? 'font-extrabold' : 'font-bold'}`}
                      >
                        {block.content}
                      </HeadingTag>
                    )
                  }

                  if (block.type === 'image') {
                    return (
                      <figure key={index} className="mx-auto w-full max-w-md space-y-3">
                        <img
                          src={block.src?.startsWith('/uploads/') ? `${apiBaseUrl}${block.src}` : block.src}
                          alt={block.alt}
                          className="w-full rounded-sm object-cover"
                        />
                        
                        {block.caption ? (
                          <figcaption className="border-b border-slate-200 pb-4 text-sm leading-6 text-slate-500">
                            {block.caption}
                          </figcaption>
                        ) : null}
                      </figure>
                    )
                  }

                  if (block.type === 'quote') {
                    return (
                      <blockquote
                        key={index}
                        className={`border-l-4 border-primary bg-primary/5 px-6 py-6 font-display text-2xl italic leading-relaxed text-slate-900 md:px-8 md:text-3xl ${
                          block.bold ? 'font-bold' : ''
                        }`}
                      >
                        "{block.content}"
                      </blockquote>
                    )
                  }

                  if (block.type === 'list') {
                    return (
                      <ul
                        key={index}
                        className="list-disc space-y-3 pl-6 text-[1.1rem] leading-8 text-slate-800 marker:text-primary"
                      >
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )
                  }

                  if (block.type === 'tweet') {
                    return (
                      <div key={index} className="overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
                        {block.url ? (
                          <iframe
                            src={`https://twitframe.com/show?url=${encodeURIComponent(block.url)}`}
                            title="Embedded X post"
                            className="min-h-[720px] w-full"
                            frameBorder="0"
                          />
                        ) : (
                          <div className="p-5">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Tweet</p>
                            <p className="mt-3 text-base leading-7 text-slate-800">Tweet embed</p>
                          </div>
                        )}
                        {block.url ? (
                          <div className="border-t border-slate-200 px-5 py-3">
                            <a
                              href={block.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex text-sm font-bold text-primary hover:underline"
                            >
                              Open post on X
                            </a>
                          </div>
                        ) : null}
                      </div>
                    )
                  }

                  if (block.type === 'link') {
                    return (
                      <p key={index}>
                        <a
                          href={block.href}
                          className="text-lg font-bold text-primary underline underline-offset-4 hover:text-slate-900"
                        >
                          {block.label || block.href}
                        </a>
                      </p>
                    )
                  }

                  return null
                })}
              </div>
            </div>

            <div id="article-comments" className="mt-16 border-t border-slate-200 pt-8">
              <div className="mb-12 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded bg-slate-100 px-3 py-1 text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <CommentsSection
                articleId={article?.slug || slug}
                articleTitle={articleTitle}
              />
            </div>
          </article>

          <aside className="space-y-12 lg:col-span-4">
            <NetworkAdUnit
              provider="ezoic"
              ezoicPlaceholderId={ezoicArticleSidebarPlaceholder}
              containerClassName="pt-0 pb-2"
              minHeightClass="min-h-[250px]"
            />
            <ArticleTopStories articles={savedArticles} currentSlug={slug} />
            <AdSlot
              placement={articleSidebarBanner}
              containerClassName="pt-0"
              imageClassName="h-[250px]"
              placeholderMinHeightClass="min-h-[250px]"
            />
          </aside>
        </div>

        <section className="mt-20 border-t border-slate-200 pt-12">
          <h2 className="mb-6 font-display text-2xl font-bold">Related Stories</h2>
          <CategoryRelatedArticles
            slug={categorySlug}
            detailsTitle={articleCategory}
            publishedArticles={relatedArticles}
          />
        </section>
      </main>

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} initialMode="login" />
      <Footer />
    </div>
  )
}

export default ArticlePage
