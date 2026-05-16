import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSettings } from '../../../app/settings/settingSlice'

const DEFAULT_FAVICON = '/favicon.svg'

function SettingsHeadSync() {
  const dispatch = useDispatch()
  const faviconUrl = useSelector(
    (state) => state.settings.settings?.favicon_url
  )
  const apiBaseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

  // Fetch settings once
  useEffect(() => {
    dispatch(fetchSettings())
  }, [dispatch])

  // Update favicon
  useEffect(() => {
    const href = faviconUrl?.trim()
      ? faviconUrl.startsWith('/uploads/')
        ? `${apiBaseUrl}${faviconUrl}`
        : faviconUrl
      : DEFAULT_FAVICON

    let link = document.querySelector('link[rel="icon"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }

    link.href = href

    // Optional: set type based on extension
    if (href.endsWith('.svg')) link.type = 'image/svg+xml'
    else if (href.endsWith('.png')) link.type = 'image/png'
    else if (href.endsWith('.ico')) link.type = 'image/x-icon'
    else link.removeAttribute('type')
  }, [faviconUrl])

  return null
}

export default SettingsHeadSync
