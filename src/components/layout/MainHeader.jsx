import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPublicCategories } from '../../../app/categories/categoriesSlice'
import { fetchSettings } from '../../../app/settings/settingSlice'
import { useAuth } from '../../context/AuthContext'
import AuthDialog from '../auth/AuthDialog'
import { AppLink, AppNavLink } from '../ui/AppLink'
import Icon from '../ui/Icon'
import ImageWithFallback from '../ui/ImageWithFallback'
import ProfileMenu from '../ui/ProfileMenu'

const DEFAULT_LINKS = [
  { label: 'Home', path: '/newsroom' },
  { label: 'Markets', path: '/markets' },
  { label: 'Videos', path: '/videos' },
]

const DEFAULT_CATEGORY_LINK = { label: 'Latest', slug: 'latest' }

function MainHeader() {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const settings = useSelector((state) => state.settings.settings)
  const categories = useSelector((state) => state.categories.categories)
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const apiBaseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
  const brand = settings?.site_name?.trim() || settings?.brand_name?.trim() || 'Daily Observer'
  const categoryLinks = [
    DEFAULT_CATEGORY_LINK,
    ...categories
      .filter((item) => item.is_public !== false && item.is_active !== false && item.is_featured)
      .map((item) => ({
        label: item.name,
        slug: (item.slug || '').replace(/^\//, ''),
      })),
  ].filter((item, index, items) => item.slug && items.findIndex((entry) => entry.slug === item.slug) === index)

  useEffect(() => {
    dispatch(fetchSettings())
    if (!categories.length) {
      dispatch(fetchPublicCategories())
    }
  }, [categories.length, dispatch])

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="container-shell py-6">
        <div className="flex flex-col items-center gap-6">
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex w-1/3 items-center gap-4 text-xl text-slate-700">
              <button type="button" aria-label="Open navigation" className="transition hover:text-primary">
                <Icon name="menu" />
              </button>
            </div>

            <div className="flex w-full justify-center md:w-1/3">
              <AppLink to="/newsroom" className="text-center font-display text-3xl font-extrabold tracking-[-0.08em] text-slate-900 sm:text-4xl md:text-5xl">
                {settings?.site_logo_url?.trim() ? (
                  <ImageWithFallback
                    src={
                      settings.site_logo_url.startsWith('/uploads/')
                        ? `${apiBaseUrl}${settings.site_logo_url}`
                        : settings.site_logo_url
                    }
                    alt={brand}
                    className="h-16 w-22 object-fill sm:h-14 md:h-16"
                    loading="eager"
                  />
                ) : (
                  (brand || 'Daily Observer').toUpperCase()
                )}
              </AppLink>
            </div>

            <div className="hidden w-1/3 justify-end md:flex md:items-center md:gap-4">
              {user ? (
                <ProfileMenu />
              ) : (
                <button
                  type="button"
                  onClick={() => setAuthDialogOpen(true)}
                  className="auth-login-button flex items-center gap-2"
                >
                  <Icon name="person" />
                  Login
                </button>
              )}
            </div>
          </div>

          <nav className="flex w-full justify-center border-t border-slate-100 pt-4">
            <div className="flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {DEFAULT_LINKS.map((item) => (
                <AppNavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      'nav-link flex shrink-0 items-center gap-1',
                      isActive ? 'border-primary text-slate-900' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')
                  }
                >
                  {item.icon ? <Icon name={item.icon} className="text-xs" /> : null}
                  {item.label}
                </AppNavLink>
              ))}

              {categoryLinks.map((item) => (
                <AppNavLink
                  key={item.slug}
                  to={item.slug === 'video' || item.slug === 'videos' ? '/videos' : `/category/${item.slug}`}
                  className={({ isActive }) =>
                    [
                      'nav-link flex shrink-0 items-center gap-1',
                      isActive ? 'border-primary text-slate-900' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')
                  }
                >
                  {item.label}
                </AppNavLink>
              ))}
            </div>
          </nav>
        </div>
      </div>
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} initialMode="login" />
    </header>
  )
}

export default MainHeader
