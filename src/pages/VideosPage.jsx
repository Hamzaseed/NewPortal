import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { AppLink } from '../components/ui/AppLink'
import Icon from '../components/ui/Icon'
import { fetchVideos } from '../../app/videos/videoSlice'
import { API_BASE_URL } from '../../utils/api'

const videoTabs = ['All Videos', 'Originals', 'Interviews', 'Documentaries', 'World News', 'Shorts']

function VideosPage() {
  const dispatch = useDispatch()
  const { videos, loading, error } = useSelector((state) => state.videos)

  useEffect(() => {
    dispatch(fetchVideos({ page: 1, limit: 12 }))
  }, [dispatch])

  const featured = videos[0]
  const trending = videos.slice(1, 4)
  const gridVideos = videos.slice(4)
  const featuredThumbnailRaw = featured?.thumbnail || featured?.thumbnail_url || featured?.thumbnailUrl || featured?.image || featured?.image_url || featured?.imageUrl || featured?.poster || featured?.poster_url || featured?.posterUrl || ''
  const featuredThumbnail = String(featuredThumbnailRaw || '').trim().replace(/\\+/g, '/')
  const featuredThumbnailUrl = featuredThumbnail.startsWith('/uploads/')
    ? `${API_BASE_URL}${featuredThumbnail}`
    : featuredThumbnail.startsWith('uploads/')
      ? `${API_BASE_URL}/${featuredThumbnail}`
      : featuredThumbnail
  const featuredVideoRaw = featured?.videoUrl || featured?.video_url || ''
  const featuredVideo = String(featuredVideoRaw || '').trim().replace(/\\+/g, '/')
  const featuredVideoUrl = featuredVideo.startsWith('/uploads/')
    ? `${API_BASE_URL}${featuredVideo}`
    : featuredVideo.startsWith('uploads/')
      ? `${API_BASE_URL}/${featuredVideo}`
      : featuredVideo
  const isFeaturedDirectVideo = /^blob:/i.test(featuredVideoUrl) || /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(featuredVideoUrl)
  const title = 'Videos | The Daily Observer'
  const description = featured?.description || 'Watch the latest news videos, explainers, and interviews from The Daily Observer.'
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/videos` : '/videos'
  const image = featuredThumbnailUrl || ''

  return (
    <div className="relative flex min-h-screen flex-col bg-background-light text-slate-900">
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
      </Helmet>

      <Header />

      <main className="mx-auto w-full max-w-[1400px] flex-1 px-6 py-8 md:px-20">
        {featured ? (
          <section className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <AppLink to={`/videos/${featured.slug || featured.id}`} className="group flex flex-col gap-4 lg:col-span-8">
              <div className="relative aspect-video w-full overflow-hidden border border-primary/5 bg-slate-200">
                {featuredThumbnailUrl ? (
                  <img
                    src={featuredThumbnailUrl}
                    alt={featured.alt || featured.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none'
                    }}
                  />
                ) : isFeaturedDirectVideo ? (
                  <video
                    src={featuredVideoUrl}
                    preload="metadata"
                    muted
                    playsInline
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 via-transparent to-transparent">
                  <span className="flex size-20 items-center justify-center rounded-full bg-primary text-white shadow-2xl transition-transform group-hover:scale-110">
                    <Icon name="play_circle" className="h-10 w-10" />
                  </span>
                </div>
                <div className="absolute left-4 top-4 bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                  {featured.badge || featured.status || 'Featured'}
                </div>
                <div className="absolute bottom-4 right-4 bg-black/60 px-2 py-1 text-xs text-white">
                  {featured.duration}
                </div>
              </div>

              <div>
                <h1 className="mb-2 text-3xl font-bold leading-tight tracking-tight md:text-4xl">{featured.title}</h1>
                <p className="max-w-2xl text-lg leading-relaxed text-slate-600">{featured.description}</p>
                <div className="mt-4 flex items-center gap-4 text-sm font-semibold uppercase tracking-wider text-primary">
                  <span>{featured.category}</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500">{featured.publishDate || featured.publish_date || featured.created_at || 'Recently published'}</span>
                </div>
              </div>
            </AppLink>

            <aside className="flex flex-col gap-6 lg:col-span-4">
              <div className="mb-2 border-l-4 border-primary pl-4">
                <h2 className="text-xl font-bold uppercase tracking-tight">Trending Now</h2>
              </div>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              {loading && videos.length === 0 ? <p className="text-sm text-slate-500">Loading videos...</p> : null}

              <div className="flex flex-col gap-6">
                {trending.map((item) => (
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
                  <AppLink key={item.slug || item.id} to={`/videos/${item.slug || item.id}`} className="group flex gap-4">
                    <div className="relative aspect-square w-32 flex-shrink-0 overflow-hidden bg-slate-200">
                      {thumbUrl ? (
                        <img
                          src={thumbUrl}
                          alt={item.alt || item.title}
                          className="h-full w-full object-cover"
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
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                        <Icon name="play_circle" className="h-6 w-6 text-white" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{item.category}</span>
                      <h3 className="text-md font-bold leading-snug transition-colors group-hover:text-primary">{item.title}</h3>
                      <p className="text-xs text-slate-500">{`${item.duration || '04:00'} | ${item.publishDate || item.publish_date || item.created_at || 'Latest update'}`}</p>
                    </div>
                  </AppLink>
                    )
                  })()
                ))}
              </div>
            </aside>
          </section>
        ) : (
          <section className="mb-12">
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            {loading ? <p className="text-sm text-slate-500">Loading videos...</p> : <p className="text-sm text-slate-500">No videos found.</p>}
          </section>
        )}

        <div className="mb-10 border-b border-primary/10">
          <div className="no-scrollbar flex gap-8 overflow-x-auto pb-4 text-sm font-bold uppercase tracking-widest">
            {videoTabs.map((tab, index) => (
              <span
                key={tab}
                className={[
                  'whitespace-nowrap pb-4 transition-colors',
                  index === 0 ? 'border-b-2 border-primary text-primary' : 'text-slate-400',
                ].join(' ')}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>

        <section className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {gridVideos.map((video) => (
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
            <AppLink key={video.slug || video.id} to={`/videos/${video.slug || video.id}`} className="group flex flex-col gap-3">
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-200">
                {thumbUrl ? (
                  <img
                    src={thumbUrl}
                    alt={video.alt || video.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute bottom-2 right-2 bg-black/70 px-1.5 py-0.5 text-[10px] text-white">
                  {video.duration}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 transition-opacity group-hover:opacity-100">
                  <Icon name="play_circle" className="h-10 w-10 text-white" />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{video.category}</span>
                <h3 className="text-lg font-bold leading-tight transition-colors group-hover:text-primary">{video.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-500">{video.description}</p>
              </div>
            </AppLink>
              )
            })()
          ))}
        </section>

        {gridVideos.length > 0 ? (
          <div className="mt-16 flex justify-center">
            <button className="bg-primary px-10 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary/90">
              Load More Videos
            </button>
          </div>
        ) : null}
      </main>

      <Footer />
    </div>
  )
}

export default VideosPage
