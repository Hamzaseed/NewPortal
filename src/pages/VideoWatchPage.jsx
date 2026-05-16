import { useEffect, useState } from 'react'
import {
  Bookmark,
  Expand,
  Play,
  Settings,
  Share2,
  ThumbsUp,
  Volume2,
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import CommentsSection from '../components/ui/CommentsSection'
import NewsletterCard from '../components/ui/NewsletterCard'
import { AppLink } from '../components/ui/AppLink'
import AuthDialog from '../components/auth/AuthDialog'
import { clearVideo, fetchVideoBySlug, fetchVideos, likeVideo, saveVideo, unlikeVideo, unsaveVideo } from '../../app/videos/videoSlice'
import { trackAnalyticsEvent } from '../../app/analytics/analyticsEventsSlice'
import { useAuth } from '../context/AuthContext'
import { API_BASE_URL } from '../../utils/api'
import { shareVideo } from '../../utils/shareVideo'

function VideoWatchPage() {
  const dispatch = useDispatch()
  const { slug } = useParams()
  const { user } = useAuth()
  const { video, videos, loading } = useSelector((state) => state.videos)
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [transcriptOpen, setTranscriptOpen] = useState(false)
  const [localViews, setLocalViews] = useState(0)
  const [likeLoading, setLikeLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const userRole = String(user?.role || '').trim().toLowerCase()
  const shouldTrackAnalytics = userRole !== 'admin' && userRole !== 'super_admin' && userRole !== 'administrator'

  useEffect(() => {
    if (slug) {
      dispatch(fetchVideoBySlug(slug))
    }

    if (videos.length === 0) {
      dispatch(fetchVideos({ page: 1, limit: 12 }))
    }

    return () => {
      dispatch(clearVideo())
    }
  }, [dispatch, slug, videos.length])

  const currentVideo =
    video && (video.slug === slug || String(video.id || '') === String(slug || ''))
      ? video
      : videos.find((item) => item.slug === slug || String(item.id || '') === String(slug || ''))

  const currentVideoSlug = currentVideo?.slug || String(currentVideo?.id || '')
  const currentVideoUrl = (currentVideo?.videoUrl || currentVideo?.video_url || '').startsWith('/uploads/')
    ? `${API_BASE_URL}${currentVideo.videoUrl || currentVideo.video_url}`
    : currentVideo?.videoUrl || currentVideo?.video_url || ''
  const isBlobVideoUrl = /^blob:/i.test(currentVideoUrl)
  const isDirectVideoUrl = /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(currentVideoUrl)
  let embedVideoUrl = currentVideoUrl

  if (embedVideoUrl.includes('youtube.com/watch?v=')) {
    const videoId = new URL(embedVideoUrl).searchParams.get('v')
    embedVideoUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : embedVideoUrl
  } else if (embedVideoUrl.includes('youtu.be/')) {
    const videoId = embedVideoUrl.split('youtu.be/')[1]?.split(/[?#]/)[0]
    embedVideoUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : embedVideoUrl
  } else if (embedVideoUrl.includes('vimeo.com/') && !embedVideoUrl.includes('player.vimeo.com')) {
    const videoId = embedVideoUrl.split('vimeo.com/')[1]?.split(/[?#/]/)[0]
    embedVideoUrl = videoId ? `https://player.vimeo.com/video/${videoId}` : embedVideoUrl
  }

  useEffect(() => {
    if (!currentVideoSlug || !shouldTrackAnalytics) {
      return
    }

    let sessionId = localStorage.getItem('session_id')

    if (!sessionId) {
      sessionId = `session_${Date.now()}`
      localStorage.setItem('session_id', sessionId)
    }

    dispatch(trackAnalyticsEvent({
      event_type: 'video_view',
      session_id: sessionId,
      video_slug: currentVideoSlug,
      path: window.location.pathname,
      device_type: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
      referrer: document.referrer || '',
      engaged_seconds: 0,
    }))

    const viewStorageKey = `video_views_${currentVideoSlug}`
    const currentCount = Number(localStorage.getItem(viewStorageKey) || '0')
    const nextCount = currentCount + 1
    localStorage.setItem(viewStorageKey, String(nextCount))
    setLocalViews(nextCount)
  }, [currentVideoSlug, dispatch, shouldTrackAnalytics])

  useEffect(() => {
    if (!currentVideoSlug) {
      setLocalViews(0)
      return
    }

    const viewStorageKey = `video_views_${currentVideoSlug}`
    const currentCount = Number(localStorage.getItem(viewStorageKey) || '0')
    setLocalViews(currentCount)
  }, [currentVideoSlug])

  if (!loading && !currentVideo) {
    return <Navigate to="/videos" replace />
  }

  if (!currentVideo) {
    return (
      <div className="relative flex min-h-screen flex-col bg-background-light text-slate-900">
        <Header />
        <main className="mx-auto flex w-full max-w-[1400px] flex-1 items-center justify-center px-6 py-8 md:px-20">
          <p className="text-sm text-slate-500">Loading video...</p>
        </main>
        <Footer />
      </div>
    )
  }

  const relatedVideos = videos
    .filter((item) => (item.slug || String(item.id || '')) !== currentVideoSlug)
    .filter((item, index, array) => array.findIndex((entry) => (entry.slug || String(entry.id || '')) === (item.slug || String(item.id || ''))) === index)
    .slice(0, 8)
  const likesCount = Number(currentVideo.likes_count || 0)
  const isLiked = Boolean(currentVideo.is_liked)
  const isSaved = Boolean(currentVideo.is_saved)
  const videoViews = Number(currentVideo.views_count || currentVideo.view_count || currentVideo.views || 0)
  const transcriptText = String(currentVideo.transcript || '').trim()

  async function handleLikeClick() {
    if (!user) {
      setAuthDialogOpen(true)
      return
    }

    if (!currentVideo?.id || likeLoading) {
      return
    }

    setLikeLoading(true)

    try {
      if (isLiked) {
        await dispatch(unlikeVideo(currentVideo.id)).unwrap()
      } else {
        await dispatch(likeVideo(currentVideo.id)).unwrap()
      }
    } finally {
      setLikeLoading(false)
    }
  }

  async function handleSaveClick() {
    if (!user) {
      setAuthDialogOpen(true)
      return
    }

    if (!currentVideo?.id || saveLoading) {
      return
    }

    setSaveLoading(true)

    try {
      if (isSaved) {
        await dispatch(unsaveVideo(currentVideo.id)).unwrap()
      } else {
        await dispatch(saveVideo(currentVideo.id)).unwrap()
      }
    } finally {
      setSaveLoading(false)
    }
  }

  async function handleShareClick() {
    if (!currentVideoSlug) {
      return
    }

    const shareUrl = typeof window !== 'undefined' ? window.location.href : canonicalUrl

    try {
      await shareVideo({
        title: currentVideo.title,
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
        video_slug: currentVideoSlug,
        path: window.location.pathname,
        device_type: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
        referrer: document.referrer || '',
        engaged_seconds: 0,
      }))
    } catch {
      return
    }
  }

  const heroImageRaw = currentVideo.thumbnail || currentVideo.thumbnail_url || currentVideo.thumbnailUrl || currentVideo.image || currentVideo.image_url || currentVideo.imageUrl || currentVideo.poster || currentVideo.poster_url || currentVideo.posterUrl || ''
  const heroImageValue = String(heroImageRaw || '').trim().replace(/\\+/g, '/')
  const heroImage = heroImageValue.startsWith('/uploads/')
    ? `${API_BASE_URL}${heroImageValue}`
    : heroImageValue.startsWith('uploads/')
      ? `${API_BASE_URL}/${heroImageValue}`
      : heroImageValue
  const title = `${currentVideo.title} | The Daily Observer`
  const description = currentVideo.seoDescription || currentVideo.seo_description || currentVideo.description || ''
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/videos/${currentVideoSlug}` : `/videos/${currentVideoSlug}`
  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: currentVideo.title,
    description,
    thumbnailUrl: heroImage ? [heroImage] : [],
    uploadDate: currentVideo.publishDate || currentVideo.publish_date || '',
    duration: currentVideo.duration || '',
    embedUrl: currentVideoUrl ? embedVideoUrl : '',
    contentUrl: currentVideoUrl,
    publisher: {
      '@type': 'Organization',
      name: 'The Daily Observer',
    },
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background-light text-slate-900">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="video.other" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={heroImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={heroImage} />
        <script type="application/ld+json">{JSON.stringify(videoSchema)}</script>
      </Helmet>

      <Header />

      <main className="mx-auto w-full max-w-[1400px] flex-1 px-6 py-8 md:px-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="group relative aspect-video w-full overflow-hidden bg-slate-950 shadow-2xl">
              {isBlobVideoUrl ? (
                <div className="flex h-full w-full items-center justify-center p-6 text-center text-sm text-white/80">
                  This video source is temporary and cannot be played here. Update the video with a public video URL.
                </div>
              ) : currentVideoUrl ? (
                isDirectVideoUrl ? (
                  <video poster={heroImage} controls className="h-full w-full object-cover">
                    <source src={currentVideoUrl || undefined} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <iframe
                    title={currentVideo.title}
                    src={embedVideoUrl}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )
              ) : (
                <>
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-80"
                    style={{ backgroundImage: `url('${heroImage}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <button
                    type="button"
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                  >
                    <div className="flex size-20 items-center justify-center rounded-full bg-primary text-white shadow-xl">
                      <Play className="ml-1 h-10 w-10" />
                    </div>
                  </button>
                </>
              )}

              {!currentVideoUrl ? (
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="mb-2 h-1.5 w-full rounded-full bg-white/20">
                    <div className="relative h-full w-1/3 rounded-full bg-primary">
                      <div className="absolute right-0 top-1/2 size-4 -translate-y-1/2 rounded-full border-2 border-primary bg-white shadow-lg" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm font-medium text-white">
                    <div className="flex items-center gap-4">
                      <Play className="h-5 w-5" />
                      <Volume2 className="h-5 w-5" />
                      <span>04:12 / {currentVideo.duration || '12:45'}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Settings className="h-5 w-5" />
                      <Expand className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <section className="mt-8 border-b border-primary/10 pb-8">
              <h1 className="text-[1.7rem] font-bold leading-tight tracking-tight text-slate-900 md:text-[2.1rem]">
                {currentVideo.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                    {currentVideo.category || 'Business Analysis'}
                  </p>
                  <span className="text-slate-400">•</span>
                  <p className="text-sm text-slate-500">{videoViews > 0 ? videoViews : localViews} views</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleLikeClick}
                    disabled={likeLoading}
                    className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/20 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    {likesCount}
                  </button>
                  <button
                    type="button"
                    onClick={handleShareClick}
                    className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-bold transition-colors hover:bg-slate-200"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveClick}
                    disabled={saveLoading}
                    className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-bold transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Bookmark className="h-4 w-4" />
                    {isSaved ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <div>
                  {currentVideo.presenter ? <h3 className="text-lg font-bold">{currentVideo.presenter}</h3> : null}
                  {currentVideo.presenter ? <p className="mb-4 text-sm text-slate-500">Senior Economic Correspondent</p> : null}
                  {currentVideo.description ? <p className="max-w-3xl leading-relaxed text-slate-700">{currentVideo.description}</p> : null}
                  {transcriptText ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setTranscriptOpen(!transcriptOpen)}
                        className="mt-4 text-sm font-bold text-primary hover:underline"
                      >
                        {transcriptOpen ? 'Hide transcript' : 'Read full transcript'}
                      </button>
                      {transcriptOpen ? (
                        <pre className="mt-4 whitespace-pre-wrap rounded-lg border border-primary/10 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                          {transcriptText}
                        </pre>
                      ) : null}
                    </>
                  ) : null}
                </div>
              </div>
            </section>

            <CommentsSection
              articleId={`video:${currentVideoSlug}`}
              articleTitle={`Video: ${currentVideo.title}`}
            />
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24">
              <h3 className="mb-6 w-fit border-b-2 border-primary pb-1 text-xl font-bold">Up Next</h3>

              <div className="space-y-6">
                {relatedVideos.slice(0, 4).map((item) => (
                  (() => {
                    const thumbRaw = item.thumbnail || item.thumbnail_url || item.thumbnailUrl || item.image || item.image_url || item.imageUrl || item.poster || item.poster_url || item.posterUrl || ''
                    const thumb = String(thumbRaw || '').trim().replace(/\\+/g, '/')
                    const thumbUrl = thumb.startsWith('/uploads/')
                      ? `${API_BASE_URL}${thumb}`
                      : thumb.startsWith('uploads/')
                        ? `${API_BASE_URL}/${thumb}`
                        : thumb
                    const videoRaw = item.videoUrl || item.video_url || ''
                    const video = String(videoRaw || '').trim().replace(/\\+/g, '/')
                    const videoUrl = video.startsWith('/uploads/')
                      ? `${API_BASE_URL}${video}`
                      : video.startsWith('uploads/')
                        ? `${API_BASE_URL}/${video}`
                        : video
                    const isDirectVideo = /^blob:/i.test(videoUrl) || /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(videoUrl)

                    return (
                  <AppLink key={item.slug || item.id} to={`/videos/${item.slug || item.id}`} className="group flex cursor-pointer gap-4">
                    <div className="relative aspect-video w-40 shrink-0 overflow-hidden bg-slate-200">
                      {thumbUrl ? (
                        <img
                          src={thumbUrl}
                          alt={item.alt || item.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : null}
                      <span className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 text-[10px] font-bold text-white">
                        {item.duration || '09:30'}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="line-clamp-2 font-bold leading-tight text-slate-900 transition-colors group-hover:text-primary">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {item.category || 'Markets'}
                      </p>
                      <p className="text-xs text-slate-400">124K views • 2 days ago</p>
                    </div>
                  </AppLink>
                    )
                  })()
                ))}
              </div>

              <NewsletterCard
                className="mt-10 p-6"
                title="Morning Intelligence"
                titleClassName="text-xl leading-tight"
                description="Get the daily briefing that top executives read every morning."
                descriptionClassName="italic"
                placeholder="Your work email"
                buttonLabel="Subscribe"
                inputClassName="bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-white"
                buttonClassName="bg-white py-2 tracking-widest text-primary hover:bg-white/90"
              />
            </div>
          </aside>
        </div>
      </main>

      <Footer />

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} initialMode="login" />
    </div>
  )
}

export default VideoWatchPage
