import { useState } from 'react'
import { useParams } from 'react-router-dom'
import AuthDialog from '../components/auth/AuthDialog'
import { categoryPageContent, getCategoryArticles } from '../data/categoryData'
import { latestArticles, siteMeta, topStories } from '../data/newsData'
import { useAuth } from '../context/AuthContext'
import { useSearch } from '../context/SearchContext'
import Icon from '../components/ui/Icon'
import { AppLink, AppNavLink } from '../components/ui/AppLink'
import { toArticleSlug } from '../data/articleData'
import ProfileMenu from '../components/ui/ProfileMenu'
import Footer from '../components/layout/Footer'

const categoryTopNav = [
  { label: 'World', slug: 'world' },
  { label: 'Politics', slug: 'politics' },
  { label: 'Economy', slug: 'economy' },
  { label: 'Tech', slug: 'tech' },
  { label: 'Health', slug: 'health' },
]

const trendingTopics = [
  '#CLIMATEACTION',
  '#TECHREVOLUTION',
  '#EUROPEANUNION',
  '#FUTURECITIES',
  '#SPACEEXPLORATION',
  '#RENEWABLES',
]

const videos = [
  {
    title: 'The Digital Nomad Shift: How Cities are Adapting',
    duration: '04:20',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBjmbL3ak3bYhPRXVd0mfRKIy5tdOgynUXL37WPXesNxOCFCTeTfSCZgVWlNg9q3lOfS3klBvkhs69XbLCS4RdngFkExcFpa6XkyTSFlzJAH-GEWXt56B5lUWPoRdF45RNRhdnTWQMazCOx_mDc_tQI1Cl28f36mTa0nR-gag80nsKxyC0ORov-YA85UC18nFo_w_D74fCjVgdTsJOvm_tNmkJoL36GJA1HQrW-ASySUMy30SsPrTSbt12Et9_InH9O5IbJvY__z9k',
    alt: 'Digital workplace with laptop',
  },
  {
    title: 'AI in Medicine: The Next Great Leap',
    duration: '03:15',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBfMjIkvxughbGRwMXdz9TMuTJRl2pPrvB4r1YoyvqOpDBWxksKh2B7LED868IYN6cqLbAW52nTW2_sehRZ1u_ZUrGYy7v71C4UN04VGfpxBynqF_2lrS4W-CMLu8bXxCBA5iQcB-_zMEA1IFeu85XK6rrSUWhjBqF8G7fLfJWI4sAMzs-LOIXrOgNlH3lZuojC9lF1JfjX0_00j705KCquRZKuf_nbFFQfydMEXS0B9MVgpgY-cdMY8fkZB41GIQJHIbkWcHlKGCw',
    alt: 'Robotic arm in lab',
  },
]

const picks = [
  { rank: '01', title: 'Sustainable Architecture: Building for a 2050 Future', meta: 'Sustainability | 4 min' },
  { rank: '02', title: 'The Revival of Vinyl: Why Physical Media Matters', meta: 'Culture | 6 min' },
  { rank: '03', title: 'Urban Farming: Converting Concrete to Greenery', meta: 'Environment | 5 min' },
]

function toTitle(slug) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function mapRelatedArticles(slug) {
  const slugMap = {
    tech: ['Technology'],
    business: ['Finance', 'Business'],
    economy: ['Finance', 'Business'],
    health: ['Health'],
    world: ['Culture'],
    politics: ['Culture'],
    latest: ['Technology', 'Finance', 'Culture', 'Health'],
  }

  const wanted = slugMap[slug] ?? []
  const relatedFromLatest = latestArticles
    .filter((item) => wanted.length === 0 || wanted.includes(item.category))
    .map((item, index) => ({
      category: slug,
      tag: item.category,
      title: item.title,
      excerpt: item.excerpt,
      time: item.time,
      comments: 12 + index * 7,
      image: item.image,
      alt: item.alt,
    }))

  const relatedFromTop = topStories.map((item, index) => ({
    category: slug,
    tag: item.category,
    title: item.title,
    excerpt: 'Developing story with regional and global implications across policy, economy, and innovation sectors.',
    time: `${index + 3} Hours Ago`,
    comments: 10 + index * 5,
    image: item.image,
    alt: item.alt,
  }))

  return [...relatedFromLatest, ...relatedFromTop].slice(0, 8)
}

function ArticleCard({ article }) {
  return (
    <AppLink to={`/news/${toArticleSlug(article.title)}`}>
      <article className="group">
        <div className="relative mb-4 aspect-video overflow-hidden">
          <img src={article.image} alt={article.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <span className="absolute left-4 top-4 rounded-sm bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-700">
            {article.tag}
          </span>
        </div>
        <h4 className="mb-2 font-display text-2xl font-bold leading-tight transition group-hover:text-primary">{article.title}</h4>
        <p className="mb-4 line-clamp-3 text-sm leading-6 text-slate-600">{article.excerpt}</p>
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>{article.time}</span>
          <span className="flex items-center gap-1">
            <Icon name="chat_bubble" className="h-3.5 w-3.5" />
            {article.comments}
          </span>
        </div>
      </article>
    </AppLink>
  )
}

function CategoryPage() {
  const { slug = 'world' } = useParams()
  const { user } = useAuth()
  const { openSearch } = useSearch()
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const details = categoryPageContent[slug] ?? {
    title: toTitle(slug),
    sectionTitle: `${toTitle(slug)} News`,
    hero: categoryPageContent.world.hero,
  }

  const articles = getCategoryArticles(slug)
  const relatedArticles = articles.length > 0 ? articles : mapRelatedArticles(slug)

  return (
    <div className="min-h-screen bg-background-light text-slate-900">
      <header className="z-50 border-b border-slate-900/10 bg-background-light/90 backdrop-blur-xl">
        <div className="bg-background-light text-slate-900">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{details.title}</h1>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => openSearch('site')}
                  className="relative w-full rounded-full border border-slate-900/10 bg-background-light py-2.5 pl-10 pr-4 text-left text-sm text-slate-500 transition hover:border-primary/30 hover:bg-white focus:outline-none sm:w-64"
                  aria-label="Open search"
                >
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <Icon name="search" className="h-3.5 w-3.5" />
                  </span>
                  Search this section
                </button>
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-900/10 bg-background-light text-slate-600 transition hover:border-primary/30 hover:text-primary"
                  aria-label="Notifications"
                >
                  <Icon name="notifications" className="h-5 w-5" />
                </button>
                <div className="shrink-0">
                  {user ? (
                    <ProfileMenu />
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

              <nav className="flex flex-wrap gap-2">
                {categoryTopNav.map((item, index) => (
                  <AppNavLink
                    key={item.slug}
                    to={`/category/${item.slug}`}
                    className={({ isActive }) =>
                      [
                        'rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] transition',
                        isActive || (index === 0 && slug === 'latest')
                          ? 'border-primary bg-primary text-white'
                          : 'border-slate-900/10 bg-background-light text-slate-600 hover:border-primary/30 hover:text-slate-900',
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
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-sm">
          <AppLink to="/newsroom" className="text-slate-500 transition hover:text-primary">
            Home
          </AppLink>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-primary">{details.title}</span>
        </nav>

        <section className="mb-12">
          <div className="group relative aspect-[21/9] cursor-pointer overflow-hidden">
            <img
              src={details.hero.image}
              alt={details.hero.alt}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 sm:p-12">
              <span className="mb-4 inline-block w-fit rounded-sm bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {details.hero.tag}
              </span>
              <h2 className="mb-4 max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-5xl">{details.hero.title}</h2>
              <p className="mb-6 max-w-2xl text-base text-slate-200 sm:text-xl">{details.hero.summary}</p>
              <div className="flex items-center gap-4 text-sm text-white/80">
                <span>By {details.hero.author}</span>
                <span className="h-1 w-1 rounded-full bg-white/40" />
                <span>{details.hero.readTime}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-primary/10 pb-6 md:flex-row md:items-center">
          <h3 className="border-l-4 border-primary pl-4 text-xl font-bold uppercase tracking-wider">{details.sectionTitle}</h3>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase text-slate-500">Sort By:</span>
              <select className="rounded border-none bg-primary/5 py-1.5 pl-3 pr-8 text-sm font-medium focus:ring-primary">
                <option>Latest</option>
                <option>Most Read</option>
                <option>Featured</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase text-slate-500">Date Range:</span>
              <select className="rounded border-none bg-primary/5 py-1.5 pl-3 pr-8 text-sm font-medium focus:ring-primary">
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
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {relatedArticles.map((article) => (
                <ArticleCard key={`${article.title}-${article.time}`} article={article} />
              ))}
            </div>

            <div className="mt-12 border-y border-slate-200 py-10">
              <p className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                Advertisement
              </p>
              <div className="flex min-h-[180px] items-center justify-center border border-slate-200 bg-slate-100 px-6 text-center">
                <div>
                  <p className="text-lg font-display font-bold text-slate-700">Premium Brand Placement</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Reserved space for category sponsors, partner campaigns, or featured promotions.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex items-center justify-center gap-2">
              <button type="button" className="flex size-10 items-center justify-center rounded border border-primary/20 transition hover:bg-primary/5">
                <Icon name="chevron_left" className="h-4 w-4" />
              </button>
              <button type="button" className="size-10 rounded bg-primary font-bold text-white">
                1
              </button>
              <button type="button" className="size-10 rounded border border-primary/20 transition hover:bg-primary/5">
                2
              </button>
              <button type="button" className="size-10 rounded border border-primary/20 transition hover:bg-primary/5">
                3
              </button>
              <span className="px-2">...</span>
              <button type="button" className="size-10 rounded border border-primary/20 transition hover:bg-primary/5">
                12
              </button>
              <button type="button" className="flex size-10 items-center justify-center rounded border border-primary/20 transition hover:bg-primary/5">
                <Icon name="chevron_right" className="h-4 w-4" />
              </button>
            </div>
          </div>

          <aside className="w-full lg:w-80">
            <div className="mb-10">
              <h5 className="mb-4 border-b border-primary/10 pb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">Trending Topics</h5>
              <div className="flex flex-wrap gap-2">
                {trendingTopics.map((topic) => (
                  <a key={topic} href="#" className="rounded bg-primary/5 px-3 py-1.5 text-xs font-bold transition-colors hover:bg-primary/10">
                    {topic}
                  </a>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h5 className="mb-4 border-b border-primary/10 pb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">Latest Videos</h5>
              <div className="space-y-4">
                {videos.map((video) => (
                  <article key={video.title} className="group cursor-pointer">
                    <div className="relative mb-2 aspect-video overflow-hidden">
                      <img src={video.image} alt={video.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Icon name="play_circle" className="h-11 w-11 text-white" />
                      </div>
                      <span className="absolute bottom-2 right-2 bg-black px-1 text-[10px] text-white">{video.duration}</span>
                    </div>
                    <h6 className="line-clamp-2 text-sm font-bold leading-snug">{video.title}</h6>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <h5 className="mb-4 border-b border-primary/10 pb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">Editor's Picks</h5>
              <div className="space-y-6">
                {picks.map((pick) => (
                  <div key={pick.rank} className="group flex items-start gap-4">
                    <span className="font-display text-3xl italic text-primary/20 transition-colors group-hover:text-primary">{pick.rank}</span>
                    <div>
                      <h6 className="mb-1 text-sm font-bold leading-tight">{pick.title}</h6>
                      <p className="text-[10px] font-bold uppercase text-slate-500">{pick.meta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} initialMode="login" />
    </div>
  )
}

export default CategoryPage
