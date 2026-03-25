import { useState } from 'react'
import { useParams } from 'react-router-dom'
import AuthDialog from '../components/auth/AuthDialog'
import Footer from '../components/layout/Footer'
import Icon from '../components/ui/Icon'
import { AppLink } from '../components/ui/AppLink'
import CommentsSection from '../components/ui/CommentsSection'
import ProfileMenu from '../components/ui/ProfileMenu'
import { getArticleBySlug } from '../data/articleData'
import { useAuth } from '../context/AuthContext'
import { useSearch } from '../context/SearchContext'
import NewsletterCard from '../components/ui/NewsletterCard'

const mostRead = [
  { rank: '01', title: 'The Future of Green Energy in Sub-Saharan Africa', meta: 'World News | 5 min read' },
  { rank: '02', title: '5 Tech Shifts That Will Redefine 2024', meta: 'Technology | 8 min read' },
  { rank: '03', title: 'Revisiting the Art of Slow Living', meta: 'Lifestyle | 4 min read' },
]

const comments = [
  {
    initials: 'JD',
    name: 'Julianne Doe',
    time: '2 hours ago',
    text: 'This is exactly the kind of travel writing we need. Authentic storytelling about preservation instead of just consumption.',
    likes: 42,
  },
  {
    initials: 'MK',
    name: 'Marcus King',
    time: '1 hour ago',
    text: 'Totally agree. I visited a similar spot in Portugal last year and it changed my perspective on tourism entirely.',
    likes: 19,
  },
]

function ArticlePage() {
  const { slug = '' } = useParams()
  const { user } = useAuth()
  const { openSearch } = useSearch()
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const article = getArticleBySlug(slug)

  return (
    <div className="flex min-h-screen flex-col bg-background-light text-slate-900">
      <header className="w-full border-b border-slate-200 bg-background-light">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 py-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
              <span className="flex items-center gap-1">
                <Icon name="calendar_today" className="h-3.5 w-3.5" />
                Oct 24, 2023
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />
              <span className="flex items-center gap-1">
                <Icon name="cloud" className="h-3.5 w-3.5" />
                72 F
              </span>
            </div>

            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-slate-500">Article Edition</p>
              <AppLink to="/newsroom" className="font-display text-2xl font-extrabold uppercase tracking-[0.12em] text-slate-950 sm:text-3xl">
                The Daily Observer
              </AppLink>
            </div>

            <div className="flex items-center justify-start gap-3 lg:justify-end">
              <button
                type="button"
                onClick={() => openSearch('site')}
                className="relative hidden rounded-full border border-slate-300 bg-background-light py-2.5 pl-10 pr-4 text-left text-sm text-slate-500 transition hover:border-slate-900 focus:outline-none sm:block sm:w-56"
                aria-label="Open search"
              >
                <Icon name="search" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                Search news
              </button>
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
              <button type="button" className="rounded-full bg-slate-950 px-5 py-2 text-sm font-bold text-white transition hover:bg-slate-800">
                Subscribe
              </button>
            </div>
          </div>

        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-grow px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500">
          <AppLink to="/newsroom" className="transition hover:text-primary">Home</AppLink>
          <Icon name="chevron_right" className="h-3.5 w-3.5" />
          <AppLink to="/category/world" className="transition hover:text-primary">World</AppLink>
          <Icon name="chevron_right" className="h-3.5 w-3.5" />
          <span className="text-primary">{article.category}</span>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <article className="lg:col-span-8">
            <header className="mb-10">
              <h1 className="font-display text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">{article.title}</h1>
              <div className="mt-6 flex items-center gap-4 border-y border-slate-200 py-6">
                <div className="h-14 w-14 overflow-hidden rounded-full bg-slate-200">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNil3cdzcJj2rxQxqpNluHMPkXMR8fIkFy8MGnc3_7msONbaJSB4gdHYagYKWpnpYeIdG448S27Z9oTLHehUbXAQzCIvGNPgzlNhASiafTjIhzNvB1PePLQMVTfg-Idp2UuMUvY-Oo5pGvl00eYVigfMY9Lx-tAoYHqCx2aunxWH1XdCvEE60hpHrrMqHAgpTpuzfCEsbHGCezQeorDeQpRiadnRb4nHy-ehipWEMqriF7lJGmgYotqZqoyNxG3WUqqyDKnUv1L3k"
                    alt={article.author}
                  />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900">{article.author}</p>
                  <p className="text-sm text-slate-500">{article.role} | {article.publishedAt}</p>
                </div>
                <div className="ml-auto flex gap-2">
                  <button type="button" className="rounded-full p-2 transition-colors hover:bg-slate-100">
                    <Icon name="bookmark" className="h-5 w-5" />
                  </button>
                  <button type="button" className="rounded-full p-2 transition-colors hover:bg-slate-100">
                    <Icon name="share" className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </header>

            <div className="group relative mb-10 aspect-video overflow-hidden">
              <img src={article.heroImage} alt={article.heroAlt} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute bottom-4 left-4 rounded bg-black/50 px-2 py-1 text-xs text-white">{article.imageCredit}</div>
            </div>

            <div className="relative flex gap-8">
              <aside className="sticky top-24 hidden h-fit flex-col gap-4 md:flex">
                <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition-all hover:border-primary hover:text-primary">
                  <Icon name="thumb_up" className="h-4 w-4" />
                </button>
                <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition-all hover:border-primary hover:text-primary">
                  <Icon name="chat_bubble" className="h-4 w-4" />
                </button>
                <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition-all hover:border-primary hover:text-primary">
                  <Icon name="share" className="h-4 w-4" />
                </button>
              </aside>

              <div className="max-w-none space-y-6 text-lg leading-relaxed text-slate-700">
                <p className="float-left mr-3 font-display text-7xl font-bold text-primary first-letter:leading-none">{article.intro.charAt(0)}</p>
                <p>{article.intro.slice(1)}</p>
                {article.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <blockquote className="my-12 border-l-4 border-primary bg-primary/5 py-4 pl-8 font-display text-3xl italic text-slate-900">
                  "{article.quote}"
                </blockquote>
                <div className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {article.gallery.map((item) => (
                    <img key={item.image} src={item.image} alt={item.alt} className="h-64 w-full object-cover" />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-slate-200 pt-8">
              <div className="mb-12 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded bg-slate-100 px-3 py-1 text-sm font-medium">{tag}</span>
                ))}
              </div>
              <CommentsSection title="Discussion" count={24} comments={comments} />
            </div>
          </article>

          <aside className="space-y-12 lg:col-span-4">
            <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="mb-6 border-b border-primary/20 pb-2 font-display text-xl font-bold">Most Read</h3>
              <div className="space-y-6">
                {mostRead.map((item) => (
                  <div key={item.rank} className="group flex cursor-pointer gap-4">
                    <span className="font-display text-3xl font-black text-slate-200 transition-colors group-hover:text-primary">{item.rank}</span>
                    <div>
                      <h4 className="font-bold leading-tight group-hover:underline">{item.title}</h4>
                      <p className="mt-1 text-xs text-slate-500">{item.meta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <NewsletterCard
              title="The Morning Dispatch"
              description="Join 50,000+ readers for our daily briefing on global affairs and culture."
              placeholder="Your email address"
              buttonLabel="Sign Up Now"
              inputClassName="border-[#6b1421] bg-[#6b1421] text-white placeholder:text-white/60 focus:ring-white"
              buttonClassName="bg-white text-primary hover:bg-slate-100"
            />

            <div className="flex flex-col items-center">
              <span className="mb-2 text-[10px] uppercase tracking-widest text-slate-400">Advertisement</span>
              <div className="flex h-[250px] w-[300px] items-center justify-center rounded border border-slate-300 bg-slate-200 shadow-inner">
                <p className="text-sm italic text-slate-400">Premium Sponsored Content</p>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-20 border-t border-slate-200 pt-12">
          <h2 className="mb-8 font-display text-3xl font-bold">Related Stories</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {article.relatedStories.map((story) => (
              <article key={story.title} className="group">
                <div className="mb-4 aspect-video overflow-hidden">
                  <img src={story.image} alt={story.alt} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold leading-tight transition-colors group-hover:text-primary">{story.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{story.meta}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} initialMode="login" />

      <Footer />
    </div>
  )
}

export default ArticlePage
