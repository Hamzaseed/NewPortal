import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { AppLink } from './AppLink'
import Icon from './Icon'

function ProfileMenu({ align = 'right' }) {
  const [open, setOpen] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 12 })
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
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

  function updatePosition() {
    if (!buttonRef.current) {
      return
    }

    const dropdownWidth = Math.min(224, window.innerWidth - 24)
    const gutter = 12
    const rect = buttonRef.current.getBoundingClientRect()
    const idealLeft = align === 'left' ? rect.left : rect.right - dropdownWidth
    const maxLeft = Math.max(gutter, window.innerWidth - dropdownWidth - gutter)
    const left = Math.min(Math.max(idealLeft, gutter), maxLeft)

    setMenuPosition({
      top: rect.bottom + 8,
      left,
    })
  }

  useLayoutEffect(() => {
    if (!open) {
      return undefined
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [open, align])

  function handleToggleMenu() {
    if (!open) {
      updatePosition()
    }

    setOpen((current) => !current)
  }

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
        ref={buttonRef}
        type="button"
        onClick={handleToggleMenu}
        className="p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-primary"
        aria-label="Open profile menu"
        aria-expanded={open}
      >
        <Icon name="account_circle" className="h-5 w-5" />
      </button>

      {open ? (
        <div
          className="fixed z-[100] overflow-hidden border border-primary/10 bg-white p-2 shadow-lg ring-1 ring-black/5"
          style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px`, width: 'min(14rem, calc(100vw - 24px))' }}
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
