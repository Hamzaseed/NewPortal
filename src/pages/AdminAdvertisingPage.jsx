import { useState } from 'react'
import Icon from '../components/ui/Icon'

const placementDetails = [
  {
    id: 'homepage-banner',
    title: 'Homepage Feed Banner',
    description: 'Main sponsored banner placed inside the latest news stream.',
    appearsOn: 'Homepage',
    route: '/newsroom',
    component: 'LatestNewsSection',
    size: 'Responsive horizontal banner',
    defaultImage:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'category-inline',
    title: 'Category Page Sponsor Block',
    description: 'Inline promotion shown between category article cards and pagination.',
    appearsOn: 'Category pages',
    route: '/category/:slug',
    component: 'CategoryPage',
    size: 'Wide content block',
    defaultImage:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'article-sidebar',
    title: 'Article Sidebar Ad',
    description: 'Sidebar advertisement displayed next to article content.',
    appearsOn: 'Article pages',
    route: '/news/:slug',
    component: 'ArticlePage',
    size: '300 x 250 sidebar unit',
    defaultImage:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
  },
]

const campaignCards = [
  ['Q4 Finance Spotlight', 'Active', 'Homepage and article sidebars'],
  ['Election Coverage Partner', 'Scheduled', 'Category page sponsorship begins Friday'],
  ['Tech Week Sponsor', 'Paused', 'Article page unit temporarily disabled'],
]

function AdminAdvertisingPage() {
  const [placements, setPlacements] = useState({
    'homepage-banner': {
      headline: 'Daily briefing brought to you by Northstar Capital',
      imageUrl: placementDetails[0].defaultImage,
      targetUrl: 'https://example.com/home-campaign',
      ctaLabel: 'Learn More',
    },
    'category-inline': {
      headline: 'Sponsor this category takeover for premium visibility',
      imageUrl: placementDetails[1].defaultImage,
      targetUrl: 'https://example.com/category-campaign',
      ctaLabel: 'View Offer',
    },
    'article-sidebar': {
      headline: 'Premium sponsored content for engaged readers',
      imageUrl: placementDetails[2].defaultImage,
      targetUrl: 'https://example.com/article-campaign',
      ctaLabel: 'Explore',
    },
  })

  function updatePlacement(id, field, value) {
    setPlacements((current) => ({
      ...current,
      [id]: {
        ...current[id],
        [field]: value,
      },
    }))
  }

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-xl font-bold sm:text-2xl">Advertising</h1>
        <p className="text-xs text-slate-500 sm:text-sm">
          Manage ad creatives and clearly see which page each advertisement appears on.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {campaignCards.map(([name, status, detail]) => (
          <article key={name} className="rounded-xl border border-primary/10 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-900">{name}</h3>
            <p className="mt-1 text-sm font-semibold text-primary">{status}</p>
            <p className="mt-3 text-sm text-slate-500">{detail}</p>
          </article>
        ))}
      </div>

      <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Ad Placement Manager</h2>
            <p className="mt-1 text-sm text-slate-500">
              Every placement below includes the exact page where the ad will be shown.
            </p>
          </div>
          <div className="rounded-full bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            3 Live Slots
          </div>
        </div>

        <div className="space-y-8">
          {placementDetails.map((placement) => {
            const current = placements[placement.id]

            return (
              <article key={placement.id} className="rounded-2xl border border-primary/10 bg-slate-50 p-5">
                <div className="mb-5 flex flex-col gap-4 border-b border-primary/10 pb-5 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{placement.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{placement.description}</p>
                  </div>
                  <div className="grid gap-2 text-xs sm:grid-cols-2">
                    <div className="rounded-lg bg-white px-3 py-2 shadow-sm">
                      <p className="font-bold uppercase tracking-[0.16em] text-slate-400">Shows On</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{placement.appearsOn}</p>
                    </div>
                    <div className="rounded-lg bg-white px-3 py-2 shadow-sm">
                      <p className="font-bold uppercase tracking-[0.16em] text-slate-400">Route</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{placement.route}</p>
                    </div>
                    <div className="rounded-lg bg-white px-3 py-2 shadow-sm">
                      <p className="font-bold uppercase tracking-[0.16em] text-slate-400">Rendered In</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{placement.component}</p>
                    </div>
                    <div className="rounded-lg bg-white px-3 py-2 shadow-sm">
                      <p className="font-bold uppercase tracking-[0.16em] text-slate-400">Ad Size</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{placement.size}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-xs font-bold uppercase text-slate-500">
                        Ad Headline
                      </label>
                      <input
                        type="text"
                        value={current.headline}
                        onChange={(event) =>
                          updatePlacement(placement.id, 'headline', event.target.value)
                        }
                        className="admin-input px-4 py-2"
                        placeholder="Enter ad headline"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="mb-2 block text-xs font-bold uppercase text-slate-500">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={current.imageUrl}
                        onChange={(event) =>
                          updatePlacement(placement.id, 'imageUrl', event.target.value)
                        }
                        className="admin-input px-4 py-2"
                        placeholder="https://..."
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase text-slate-500">
                        Destination URL
                      </label>
                      <input
                        type="url"
                        value={current.targetUrl}
                        onChange={(event) =>
                          updatePlacement(placement.id, 'targetUrl', event.target.value)
                        }
                        className="admin-input px-4 py-2"
                        placeholder="https://advertiser-site.com"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase text-slate-500">
                        CTA Label
                      </label>
                      <input
                        type="text"
                        value={current.ctaLabel}
                        onChange={(event) =>
                          updatePlacement(placement.id, 'ctaLabel', event.target.value)
                        }
                        className="admin-input px-4 py-2"
                        placeholder="Learn more"
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-primary/10 bg-white p-4 shadow-sm">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                      Preview
                    </p>
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      <img
                        src={current.imageUrl}
                        alt={placement.title}
                        className={`w-full object-cover ${
                          placement.id === 'article-sidebar' ? 'h-52' : 'h-40'
                        }`}
                      />
                    </div>
                    <p className="mt-4 text-sm font-bold text-slate-900">{current.headline}</p>
                    <a
                      href={current.targetUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-primary/90"
                    >
                      {current.ctaLabel}
                      <Icon name="open_in_new" className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AdminAdvertisingPage
