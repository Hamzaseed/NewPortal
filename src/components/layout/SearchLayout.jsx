import { useEffect, useMemo, useState } from 'react'
import { Search, Sparkles, X } from 'lucide-react'
import { articleIndex } from '../../data/articleData'
import { adminNavItems, recentArticles } from '../../data/adminData'
import { allVideos } from '../../data/videoData'
import { AppLink } from '../ui/AppLink'

const authorWorkspaceItems = [
  {
    id: 'author-draft-1',
    type: 'Draft',
    title: 'The Future of AI in Modern Newsrooms',
    subtitle: 'Needs headline review and SEO polish',
    path: '/author/articles',
  },
  {
    id: 'author-articles-1',
    type: 'Articles',
    title: 'My Articles',
    subtitle: 'Manage drafts, scheduled stories and published work',
    path: '/author/articles',
  },
  {
    id: 'author-analytics-1',
    type: 'Analytics',
    title: 'Audience Intelligence',
    subtitle: 'Top engagement trends from the last 30 days',
    path: '/author/analytics',
  },
  {
    id: 'author-settings-1',
    type: 'Settings',
    title: 'Author Settings',
    subtitle: 'Profile, publishing defaults and security',
    path: '/author/settings',
  },
  {
    id: 'author-feedback-1',
    type: 'Feedback',
    title: 'Recent Feedback',
    subtitle: 'Community responses on your latest stories',
    path: '/author/dashboard',
  },
]

const authorShortcuts = ['Drafts', 'Articles', 'Analytics', 'Comments', 'Publishing']
const siteTopics = ['Politics', 'Tech', 'World', 'Business', 'Opinion', 'Videos']

function buildResults(mode) {
  const articleResults = articleIndex.slice(0, 6).map((item) => ({
    id: `article-${item.slug}`,
    type: 'Article',
    title: item.title,
    subtitle: item.category,
    path: `/news/${item.slug}`,
  }))

  const videoResults = allVideos.slice(0, 4).map((item) => ({
    id: `video-${item.slug}`,
    type: 'Video',
    title: item.title,
    subtitle: item.category || 'News',
    path: `/videos/${item.slug}`,
  }))

  if (mode === 'admin') {
    const adminSections = adminNavItems.slice(0, 6).map((item) => ({
      id: `admin-nav-${item.label}`,
      type: 'Section',
      title: item.label,
      subtitle: 'Admin workspace',
      path: item.path,
    }))

    const adminArticles = recentArticles.map((item) => ({
      id: `admin-article-${item.slug}`,
      type: 'Article',
      title: item.title,
      subtitle: `${item.category} | ${item.status}`,
      path: '/admin/articles',
    }))

    return [...adminSections, ...adminArticles]
  }

  if (mode === 'author') {
    return [...authorWorkspaceItems, ...articleResults.slice(0, 3)]
  }

  return [...articleResults, ...videoResults]
}

function getModeCopy(mode) {
  if (mode === 'admin') {
    return {
      panelClass: 'w-[min(96%,1100px)] border-slate-200 bg-white text-slate-900',
      inputClass: 'border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-primary',
      closeClass: 'border-slate-200 text-slate-600 hover:bg-slate-100',
      resultClass: 'border-slate-200 bg-white hover:border-primary/40 hover:bg-primary/5',
      chipClass: 'bg-slate-100 text-slate-600',
      emptyClass: 'border-slate-200 bg-slate-50 text-slate-500',
      eyebrow: 'Admin Search',
      title: 'Search dashboard areas, articles, authors and workflows',
      placeholder: 'Search articles, authors, sections or logs...',
      helper: 'Quick access for newsroom operations and publishing control.',
    }
  }

  if (mode === 'author') {
    return {
      panelClass: 'w-[min(96%,1040px)] border-primary/10 bg-white text-slate-900',
      inputClass: 'border-primary/10 bg-background-light text-slate-900 placeholder:text-slate-400 focus:border-primary',
      closeClass: 'border-slate-200 text-slate-600 hover:bg-slate-100',
      resultClass: 'border-primary/10 bg-white hover:border-primary/30 hover:bg-primary/[0.03]',
      chipClass: 'bg-primary/10 text-primary',
      emptyClass: 'border-primary/10 bg-background-light text-slate-500',
      eyebrow: 'Author Search',
      title: 'Search your drafts, analytics and writing workspace',
      placeholder: 'Search drafts, analytics or comments...',
      helper: 'Built for editorial flow, personal performance and publishing tools.',
    }
  }

  return {
    panelClass: 'w-[min(96%,1000px)] border-slate-200 bg-white text-slate-900',
    inputClass: 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary',
    closeClass: 'border-slate-200 text-slate-600 hover:bg-slate-100',
    resultClass: 'border-slate-200 bg-white hover:border-primary/40 hover:bg-primary/5',
    chipClass: 'bg-slate-100 text-slate-600',
    emptyClass: 'border-slate-200 bg-white text-slate-500',
    eyebrow: 'Site Search',
    title: 'Search news, videos and topics across the site',
    placeholder: 'Search news, videos, and topics...',
    helper: 'Explore the newsroom quickly with a clean reader-friendly layout.',
  }
}

function filterResults(items, query) {
  const normalized = query.trim().toLowerCase()

  if (!normalized) {
    return items.slice(0, 8)
  }

  return items
    .filter((item) => item.title.toLowerCase().includes(normalized) || item.subtitle.toLowerCase().includes(normalized))
    .slice(0, 10)
}

function SiteSidebar() {
  return (
    <div className="space-y-4 border-l border-slate-200 pl-6">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Trending Topics</p>
        <div className="flex flex-wrap gap-2">
          {siteTopics.map((topic) => (
            <span key={topic} className="border border-slate-200 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600">
              {topic}
            </span>
          ))}
        </div>
      </div>
      <div className="border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Suggested</p>
        <p className="mt-2 font-display text-xl font-bold text-slate-900">Start with the day&apos;s lead stories and latest videos.</p>
      </div>
    </div>
  )
}

function AuthorSidebar() {
  return (
    <div className="space-y-4 border-l border-primary/10 pl-6">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Workspace Shortcuts</p>
        <div className="flex flex-wrap gap-2">
          {authorShortcuts.map((topic) => (
            <span key={topic} className="bg-primary/8 border border-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
              {topic}
            </span>
          ))}
        </div>
      </div>
      <div className="border border-primary/10 bg-background-light p-4">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="h-4 w-4" />
          <p className="text-xs font-bold uppercase tracking-[0.16em]">Focus Mode</p>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600">Jump into drafts, performance views and publishing controls without leaving your writing flow.</p>
      </div>
    </div>
  )
}

function AdminSidebar() {
  return (
    <div className="space-y-4 border-l border-slate-200 pl-6">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Quick Areas</p>
        <div className="grid gap-2">
          {['Dashboard', 'Articles', 'Authors', 'Comments', 'Analytics'].map((item) => (
            <div key={item} className="border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Ops Note</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">Use this search to move between editorial operations, active stories and admin tools faster.</p>
      </div>
    </div>
  )
}

function SearchLayout({ open, onClose, mode = 'site' }) {
  const [query, setQuery] = useState('')
  const copy = getModeCopy(mode)

  useEffect(() => {
    if (!open) return undefined

    function handleEsc(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setQuery('')
    }
  }, [open])

  const results = useMemo(() => filterResults(buildResults(mode), query), [mode, query])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[90] bg-black/55 backdrop-blur-[2px]">
      <div className={`mx-auto mt-10 border shadow-2xl ${copy.panelClass}`}>
        <div className="border-b border-slate-200 px-5 py-4">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{copy.eyebrow}</p>
              <h2 className="mt-2 font-display text-2xl font-bold">{copy.title}</h2>
              <p className="mt-1 text-sm text-slate-500">{copy.helper}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className={`inline-flex h-11 w-11 items-center justify-center border transition ${copy.closeClass}`}
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className={`flex items-center gap-3 border px-4 py-3 ${mode === 'admin' ? 'border-slate-200 bg-slate-50' : mode === 'author' ? 'border-primary/10 bg-background-light' : 'border-slate-200 bg-white'}`}>
            <Search className="h-4 w-4 text-slate-400" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.placeholder}
              className={`h-10 w-full border px-3 text-sm outline-none transition ${copy.inputClass}`}
            />
          </div>
        </div>

        <div className="grid max-h-[70vh] grid-cols-1 overflow-y-auto p-5 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="pr-0 lg:pr-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Results</p>
            <div className="space-y-2">
              {results.length ? (
                results.map((item) => (
                  <AppLink
                    key={item.id}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center justify-between border px-4 py-4 transition ${copy.resultClass}`}
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.title}</p>
                      <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{item.subtitle}</p>
                    </div>
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${copy.chipClass}`}>
                      {item.type}
                    </span>
                  </AppLink>
                ))
              ) : (
                <p className={`border px-4 py-5 text-sm ${copy.emptyClass}`}>No results found. Try a different keyword.</p>
              )}
            </div>
          </div>

          <div className="mt-6 lg:mt-0">
            {mode === 'admin' ? <AdminSidebar /> : mode === 'author' ? <AuthorSidebar /> : <SiteSidebar />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchLayout
