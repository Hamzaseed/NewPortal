import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { AppLink } from './AppLink'
import Icon from './Icon'

function ProfileMenu() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  useEffect(() => {
    function handleOutsideClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  useEffect(() => {
    if (open) {
      setMounted(true)
      return undefined
    }

    const timeoutId = window.setTimeout(() => setMounted(false), 180)
    return () => window.clearTimeout(timeoutId)
  }, [open])

  function handleLogout() {
    logout()
    setOpen(false)
    navigate('/newsroom')
  }

  const dashboardPath =
    user?.role === 'admin'
      ? '/admin/dashboard'
      : user?.role === 'author'
        ? '/author/dashboard'
        : null

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-primary"
        aria-label="Open profile menu"
        aria-expanded={open}
      >
        <Icon name="account_circle" className="h-5 w-5" />
      </button>

      {mounted ? (
        <div
          className={`absolute right-0 z-50 mt-2 w-56 origin-top-right overflow-hidden border border-primary/10 bg-white p-2 shadow-lg ring-1 ring-black/5 transition-all duration-200 ease-out ${
            open ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
          }`}
        >
          {dashboardPath ? (
            <AppLink
              to={dashboardPath}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              <Icon name="dashboard" className="h-4 w-4" />
              Dashboard
            </AppLink>
          ) : null}

          <AppLink
            to="/saved"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <Icon name="bookmark" className="h-4 w-4" />
            Saved
          </AppLink>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <Icon name="logout" className="h-4 w-4" />
            Logout
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default ProfileMenu
