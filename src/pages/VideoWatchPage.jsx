import {
  Bookmark,
  Expand,
  Play,
  Settings,
  Share2,
  ThumbsDown,
  ThumbsUp,
  Volume2,
} from 'lucide-react'
import { Navigate, useParams } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import CommentsSection from '../components/ui/CommentsSection'
import NewsletterCard from '../components/ui/NewsletterCard'
import { AppLink } from '../components/ui/AppLink'
import { featuredVideo, findVideoBySlug, trendingVideos, videoGrid } from '../data/videoData'

function VideoWatchPage() {
  const { slug } = useParams()
  const currentVideo = findVideoBySlug(slug)

  if (!currentVideo) {
    return <Navigate to="/videos" replace />
  }

  const relatedVideos = [featuredVideo, ...trendingVideos, ...videoGrid]
    .filter((item) => item.slug !== currentVideo.slug)
    .slice(0, 8)
  const comments = [
    {
      name: 'David Richardson',
      time: '2 hours ago',
      text:
        "Excellent breakdown of the inflationary pressures. I'd love to see a follow-up video specifically on the impact for small-scale manufacturers in Southeast Asia.",
      likes: 84,
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDjPUwObs0eYTWEpRWM1LmdE7Hkk5e4A1AUPCj_POSMyqKUjmV6NWuGSW0w79Vcg1z8eJBvJ25Bzy-aPV6RHubJS4N3ThM0fm5_yF0B4jCJveJmAN4aUtb1bi07AJe8bXkzDqX0bX3wzmVRb84_X-KmTxV6vfoabLoyg8AQRZDzyjh5xBCYYSTt4WsqB9CehXL7vLk3UN2mZwMh7SZdgIe3klwk0CZFctBILjDWdGTkfnMx1BX3CEeEbGVAKc5-8TgL4e6Ha3KCBm8',
    },
    {
      name: 'Sarah Jenkins',
      time: '5 hours ago',
      text:
        'Julian Vance always provides the most balanced perspective on these issues. The visualization of the currency fluctuations was particularly helpful.',
      likes: 126,
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAigT4Td6MTueTK68LulIsngV5qGs0UB2Ab1HjR0L8Gd73x7GOJGDt7u2Luh3oK5ac4K0USA3gOtAcV2yZfqEsGELiPvgYbdksGfjy6k_l_66ueHuTft84rw67bleiz_XiiwxFjpp9QRP6U84TcT7i_Hrl9hZZEXTqBq32VcFFUwv8vIxqrPKWEWuSkMb_Pq4vWHlgvPxMm63MjtfM_JqlhnEJkRmxN57mVjponybZg92ZMDNiRnR4SQNJCGtjiX71zzEaHPE-ZWtE',
    },
  ]

  return (
    <div className="relative flex min-h-screen flex-col bg-background-light text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-[1400px] flex-1 px-6 py-8 md:px-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="group relative aspect-video w-full overflow-hidden bg-slate-950 shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-80"
                style={{ backgroundImage: `url('${currentVideo.image}')` }}
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
                  <p className="text-sm text-slate-500">Oct 24, 2023</p>
                  <span className="text-slate-400">•</span>
                  <p className="text-sm text-slate-500">1.2M views</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/20">
                    <ThumbsUp className="h-4 w-4" />
                    12.4K
                  </button>
                  <button className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-bold transition-colors hover:bg-slate-200">
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                  <button className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-bold transition-colors hover:bg-slate-200">
                    <Bookmark className="h-4 w-4" />
                    Save
                  </button>
                </div>
              </div>

              <div className="mt-8 flex items-start gap-4">
                <div className="size-12 shrink-0 overflow-hidden rounded-full bg-slate-200">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCvvopW8JCibP8UuFYzds1lYvUCb0RDdVSAJIDB42WgWg7pLZWnBxm1-p40XuRfOLk6I7A1obQOFXhX5QyrJyj8OqtGh-e3bqXu1jXkr5kKx4663-14T42PVmGqirR_MX9hEb-sVusY-86iIbYRCVFGtB2IbsMAbf7PJs-aU6fHe0M7YOtw8Dl0Lj3NgEH_YUbYU1GKoQjJL_H0w5YDf1XkTTp9Po_y1CJEcPc7Rws-dENx5Mk6NNVu9EA5B3hFMXOgoz5Cv0K0Tg"
                    alt="Reporter"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold">Julian Vance</h3>
                  <p className="mb-4 text-sm text-slate-500">Senior Economic Correspondent</p>
                  <p className="max-w-3xl leading-relaxed text-slate-700">
                    As central banks worldwide adjust their interest rate policies, we explore the cascading effects on
                    international trade, emerging markets, and the everyday consumer. This deep-dive investigation
                    looks at the structural changes occurring in the post-pandemic global economy and what experts
                    predict for the coming fiscal year.
                  </p>
                  <button className="mt-4 text-sm font-bold text-primary hover:underline">
                    Read full transcript
                  </button>
                </div>
              </div>
            </section>

            <CommentsSection count={450} comments={comments} />
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24">
              <h3 className="mb-6 w-fit border-b-2 border-primary pb-1 text-xl font-bold">Up Next</h3>

              <div className="space-y-6">
                {relatedVideos.slice(0, 4).map((item) => (
                  <AppLink key={item.slug} to={`/videos/${item.slug}`} className="group flex cursor-pointer gap-4">
                    <div className="relative aspect-video w-40 shrink-0 overflow-hidden bg-slate-200">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
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
    </div>
  )
}

export default VideoWatchPage
