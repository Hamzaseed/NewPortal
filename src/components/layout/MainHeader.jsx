import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import AuthDialog from '../auth/AuthDialog'
import { navigation, siteMeta } from '../../data/newsData'
import { AppLink, AppNavLink } from '../ui/AppLink'
import Icon from '../ui/Icon'
import ProfileMenu from '../ui/ProfileMenu'

function MainHeader() {
  const { user } = useAuth()
  const [authDialogOpen, setAuthDialogOpen] = useState(false)

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
                {siteMeta.brand.toUpperCase()}
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

          <nav className="flex w-full flex-wrap justify-center gap-x-6 gap-y-2 border-t border-slate-100 pt-4">
            {navigation.map((item) => (
              <AppNavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  [
                    'nav-link flex items-center gap-1',
                    isActive ? 'border-primary text-slate-900' : '',
                    item.label === 'Videos' ? 'text-primary' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')
                }
              >
                {item.icon ? <Icon name={item.icon} className="text-xs" /> : null}
                {item.label}
              </AppNavLink>
            ))}
          </nav>
        </div>
      </div>
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} initialMode="login" />
    </header>
  )
}

export default MainHeader
