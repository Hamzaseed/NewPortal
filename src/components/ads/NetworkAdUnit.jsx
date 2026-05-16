import { useEffect, useRef } from 'react'

function NetworkAdUnit({
  provider,
  slot,
  ezoicPlaceholderId,
  format = 'auto',
  responsive = true,
  minHeightClass = 'min-h-[120px]',
  containerClassName = '',
}) {
  const adRef = useRef(null)
  const providerName = String(provider || '').trim().toLowerCase()
  const adSenseClient = import.meta.env.VITE_ADSENSE_CLIENT_ID || ''

  useEffect(() => {
    if (providerName !== 'google') {
      return
    }

    if (!adSenseClient || !slot || !adRef.current) {
      return
    }

    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (_) {
      return
    }
  }, [adSenseClient, providerName, slot])

  if (providerName === 'google') {
    if (!adSenseClient || !slot) {
      return null
    }

    return (
      <section
        aria-label="Advertisement"
        className={['border-y border-slate-200 py-8', containerClassName].filter(Boolean).join(' ')}
      >
        <div className="mb-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.36em] text-slate-400">Advertisement</p>
        </div>
        <div className={['border border-slate-200 bg-white p-4', minHeightClass].filter(Boolean).join(' ')}>
          <ins
            ref={adRef}
            className="adsbygoogle block"
            style={{ display: 'block' }}
            data-ad-client={adSenseClient}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={responsive ? 'true' : 'false'}
          />
        </div>
      </section>
    )
  }

  if (providerName === 'ezoic') {
    if (!ezoicPlaceholderId) {
      return null
    }

    return (
      <section
        aria-label="Advertisement"
        className={['border-y border-slate-200 py-8', containerClassName].filter(Boolean).join(' ')}
      >
        <div className="mb-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.36em] text-slate-400">Advertisement</p>
        </div>
        <div className={['border border-slate-200 bg-white p-4', minHeightClass].filter(Boolean).join(' ')}>
          <div id={`ezoic-pub-ad-placeholder-${ezoicPlaceholderId}`} className="w-full" />
        </div>
      </section>
    )
  }

  return null
}

export default NetworkAdUnit
