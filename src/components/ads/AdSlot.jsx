import { useEffect, useState } from 'react'

function AdSlot({
  placement,
  previewMode = false,
  containerClassName = '',
  frameClassName = '',
  imageClassName = '',
  placeholderMinHeightClass = 'min-h-[180px]',
}) {
  const [imageFailed, setImageFailed] = useState(false)
  const isEnabled = placement?.enabled ?? placement?.is_active ?? false
  const imageUrl = placement?.image_url || placement?.imageUrl || ''
  const targetUrl = placement?.target_url || placement?.targetUrl || ''
  const placementName = placement?.name || 'Advertisement'

  useEffect(() => {
    setImageFailed(false)
  }, [imageUrl])

  if (!placement || (!isEnabled && !previewMode)) {
    return null
  }

  const hasBanner = Boolean(imageUrl.trim()) && !imageFailed
  const Wrapper = targetUrl.trim() ? 'a' : 'div'
  const wrapperProps =
    Wrapper === 'a'
      ? {
          href: targetUrl,
          target: '_blank',
          rel: 'noreferrer',
        }
      : {}

  return (
    <section
      aria-label="Advertisement"
      className={[
        'border-y border-slate-200 py-8',
        previewMode && !isEnabled ? 'opacity-60' : '',
        containerClassName,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="mb-4 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.36em] text-slate-400">Advertisement</p>
      </div>

      <Wrapper
        {...wrapperProps}
        className={[
          'block border border-slate-200 bg-[#f4f7fb] p-4 transition',
          targetUrl.trim() ? 'hover:border-primary/30' : '',
          frameClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {hasBanner ? (
          <img
            src={imageUrl}
            alt={`${placementName} advertisement`}
            className={['w-full object-cover', imageClassName].filter(Boolean).join(' ')}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div
            className={[
              'flex items-center justify-center bg-slate-50 px-6 text-center',
              placeholderMinHeightClass,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span className="text-sm italic text-slate-400">Sponsored Content Space</span>
          </div>
        )}
      </Wrapper>
    </section>
  )
}

export default AdSlot
