import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { AppLink } from '../components/ui/AppLink'
import Icon from '../components/ui/Icon'
import { featuredVideo, trendingVideos, videoGrid, videoTabs } from '../data/videoData'

function VideosPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background-light text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-[1400px] flex-1 px-6 py-8 md:px-20">
        <section className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <AppLink to={`/videos/${featuredVideo.slug}`} className="group flex flex-col gap-4 lg:col-span-8">
            <div className="relative aspect-video w-full overflow-hidden border border-primary/5 bg-slate-200">
              <img
                src={featuredVideo.image}
                alt={featuredVideo.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 via-transparent to-transparent">
                <span className="flex size-20 items-center justify-center rounded-full bg-primary text-white shadow-2xl transition-transform group-hover:scale-110">
                  <Icon name="play_circle" className="h-10 w-10" />
                </span>
              </div>
              <div className="absolute left-4 top-4 bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                {featuredVideo.badge}
              </div>
              <div className="absolute bottom-4 right-4 bg-black/60 px-2 py-1 text-xs text-white">
                {featuredVideo.duration}
              </div>
            </div>

            <div>
              <h1 className="mb-2 text-3xl font-bold leading-tight tracking-tight md:text-4xl">{featuredVideo.title}</h1>
              <p className="max-w-2xl text-lg leading-relaxed text-slate-600">{featuredVideo.description}</p>
              <div className="mt-4 flex items-center gap-4 text-sm font-semibold uppercase tracking-wider text-primary">
                <span>{featuredVideo.category}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{featuredVideo.timeAgo}</span>
              </div>
            </div>
          </AppLink>

          <aside className="flex flex-col gap-6 lg:col-span-4">
            <div className="mb-2 border-l-4 border-primary pl-4">
              <h2 className="text-xl font-bold uppercase tracking-tight">Trending Now</h2>
            </div>

            <div className="flex flex-col gap-6">
              {trendingVideos.map((item) => (
                <AppLink key={item.slug} to={`/videos/${item.slug}`} className="group flex gap-4">
                  <div className="relative aspect-square w-32 flex-shrink-0 overflow-hidden bg-slate-200">
                    <img src={item.image} alt={item.alt} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <Icon name="play_circle" className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{item.category}</span>
                    <h3 className="text-md font-bold leading-snug transition-colors group-hover:text-primary">{item.title}</h3>
                    <p className="text-xs text-slate-500">{item.meta}</p>
                  </div>
                </AppLink>
              ))}
            </div>
          </aside>
        </section>

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
          {videoGrid.map((video) => (
            <AppLink key={video.slug} to={`/videos/${video.slug}`} className="group flex flex-col gap-3">
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-200">
                <img
                  src={video.image}
                  alt={video.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
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
          ))}
        </section>

        <div className="mt-16 flex justify-center">
          <button className="bg-primary px-10 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary/90">
            Load More Videos
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default VideosPage
