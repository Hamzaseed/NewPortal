import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPublicCategories } from '../../../app/categories/categoriesSlice'
import { fetchSettings } from '../../../app/settings/settingSlice'
import { AppLink } from '../ui/AppLink'
import SocialLinksDisplay from '../socialsettings/socialLinksDisplay'
import ImageWithFallback from '../ui/ImageWithFallback'

const FOOTER_COLUMNS = [
  { title: 'News', links: [] },
  { title: 'Life', links: [] },
  { title: 'Company', links: ['About', 'Contact', 'Careers', 'Advertise'] },
  { title: 'Resources', links: ['Newsletters', 'RSS', 'Terms', 'Privacy'] },
]

function Footer() {
  const dispatch = useDispatch()
  const settings = useSelector((state) => state.settings.settings)
  const socialLinks = useSelector((state) => state.settings.socialLinks)
  const categories = useSelector((state) => state.categories.categories)
  const apiBaseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
  const activeCategories = categories
    .filter((item) => item.is_public !== false && item.is_active !== false)
  const newsCategories = activeCategories.slice(0, 4)
  const lifeCategories = activeCategories.slice(4, 8)
  const brand = settings?.site_name?.trim() || settings?.brand_name?.trim() || 'Daily Observer'
  const logoUrl = settings?.site_logo_url?.trim()
    ? settings.site_logo_url.startsWith('/uploads/')
      ? `${apiBaseUrl}${settings.site_logo_url}`
      : settings.site_logo_url
    : ''

  useEffect(() => {
    if (!socialLinks.length) {
      dispatch(fetchSettings())
    }
    if (!categories.length) {
      dispatch(fetchPublicCategories())
    }
  }, [categories.length, dispatch, socialLinks.length])

  return (
    <footer className="mt-20 border-t border-slate-200 bg-[#111111] text-slate-300">
      <div className="container-shell">
        <div className="border-b border-white/10 py-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-slate-500">Daily Edition</p>
              <div className="mt-2">
                {logoUrl ? (
                  <AppLink to="/newsroom" aria-label={brand}>
                    <ImageWithFallback
                      src={logoUrl}
                      alt={brand}
                      className="h-14 w-auto max-w-[240px] object-contain"
                    />
                  </AppLink>
                ) : (
                  <h2 className="font-display text-3xl font-bold uppercase tracking-[0.1em] text-white">{brand}</h2>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-10 py-12 lg:grid-cols-[1.5fr_2fr]">
          <section className="space-y-8" aria-label="Newsletter and social">
            <div>
              <p className="max-w-md text-slate-400">
                Reporting with clarity, context, and depth across politics, business, culture, technology, and the stories shaping everyday life.
              </p>
            </div>

            <section aria-label="Newsletter signup">
              <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-white">Stay In The Loop</h4>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-white/30 focus:outline-none"
                />
                <button type="button" className="border border-white bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-transparent hover:text-white">
                  Subscribe
                </button>
              </div>
            </section>

            <nav aria-label="Social media">
              <SocialLinksDisplay links={socialLinks} />
            </nav>
          </section>

          <nav className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" aria-label="Footer links">
            {FOOTER_COLUMNS.map((column) => (
              <section key={column.title}>
                <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-white">{column.title}</h4>
                <ul className="space-y-3 text-sm text-slate-400">
                  {column.title === 'News'
                    ? newsCategories.map((item) => (
                        <li key={item.id}>
                          <AppLink
                            to={
                              (item.slug || '').replace(/^\//, '') === 'video' || (item.slug || '').replace(/^\//, '') === 'videos'
                                ? '/videos'
                                : `/category/${(item.slug || '').replace(/^\//, '')}`
                            }
                            className="transition hover:text-white"
                          >
                            {item.name}
                          </AppLink>
                        </li>
                      ))
                    : column.title === 'Life'
                      ? lifeCategories.map((item) => (
                        <li key={item.id}>
                          <AppLink
                            to={
                              (item.slug || '').replace(/^\//, '') === 'video' || (item.slug || '').replace(/^\//, '') === 'videos'
                                ? '/videos'
                                : `/category/${(item.slug || '').replace(/^\//, '')}`
                            }
                            className="transition hover:text-white"
                          >
                            {item.name}
                          </AppLink>
                        </li>
                      ))
                      : column.links.map((link) => (
                        <li key={link}>
                          <a href="#" className="transition hover:text-white">
                            {link}
                          </a>
                        </li>
                      ))}
                </ul>
              </section>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} {brand}. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-5">
            {['Site Map', 'Accessibility', 'Archived Content', 'Editorial Standards'].map((link) => (
              <a key={link} href="#" className="transition hover:text-white">
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em]">
            <span className="h-2 w-2 rounded-full bg-white/70" />
            Live News Desk
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
