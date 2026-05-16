import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdminAds, updateAd } from '../../app/advertising/advertisingSlice'
import AdSlot from '../components/ads/AdSlot'
import Icon from '../components/ui/Icon'

function AdvertisingImageField({ placement, onUpload, onChange }) {
  return (
    <div>
      <label htmlFor={`image-url-${placement.id}`} className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
        Banner Image
      </label>
      <div className="relative rounded-2xl border-2 border-dashed border-primary/15 bg-white p-6 text-center">
        {placement.image_url || placement.imageUrl ? (
          <img
            src={placement.image_url || placement.imageUrl}
            alt={`${placement.name} preview`}
            className="mx-auto h-32 w-full rounded-xl object-cover"
          />
        ) : (
          <>
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/5">
              <Icon name="upload_file" className="h-6 w-6 text-slate-500" />
            </div>
            <p className="text-sm text-slate-500">Upload from your computer or paste an ad image URL below</p>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 cursor-pointer opacity-0"
          onChange={(event) => onUpload(placement.id, event.target.files?.[0])}
        />
      </div>
      <input
        id={`image-url-${placement.id}`}
        type="url"
        value={placement.image_url || placement.imageUrl || ''}
        onChange={(event) => onChange(placement.id, event.target.value)}
        className="admin-input mt-3 px-4 py-3"
        placeholder="https://your-banner-image.com/ad.jpg"
      />
    </div>
  )
}

function AdminAdvertisingPage() {
  const dispatch = useDispatch()
  const { adminAds, loading, error } = useSelector((state) => state.advertising)
  const placements = adminAds
  const visibleCount = placements.filter((placement) => placement.enabled ?? placement.is_active ?? false).length

  useEffect(() => {
    dispatch(fetchAdminAds(localStorage.getItem('auth_token') || ''))
  }, [dispatch])

  function updatePlacementField(id, changes) {
    const placement = placements.find((item) => item.id === id)

    if (!placement) {
      return
    }

    dispatch(
      updateAd({
        id,
        payload: {
          name: placement.name || '',
          page_name: placement.page_name || placement.pageName || '',
          placement_area: placement.placement_area || placement.placementArea || '',
          route: placement.route || '',
          source: placement.source || '',
          enabled: changes.enabled ?? placement.enabled ?? placement.is_active ?? false,
          image_url:
            changes.image_url ??
            changes.imageUrl ??
            placement.image_url ??
            placement.imageUrl ??
            '',
          target_url:
            changes.target_url ??
            changes.targetUrl ??
            placement.target_url ??
            placement.targetUrl ??
            '',
        },
        token: localStorage.getItem('auth_token') || '',
      })
    )
  }

  function handleImageUrlChange(id, imageUrl) {
    updatePlacementField(id, { imageUrl })
  }

  function handleImageUpload(id, file) {
    if (!file) return

    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updatePlacementField(id, { imageUrl: reader.result })
      }
    }

    reader.readAsDataURL(file)
  }

  return (
    <section className="space-y-6">
      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Advertising</p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Custom ad banners for homepage, category, and article pages</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              These slots are for custom uploaded banners only. They are separate from Google AdSense or Ezoic placements. Turn slots on or off, upload a banner from your computer or paste an image URL, and optionally set the click destination.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:w-auto">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Slots</p>
              <p className="mt-1 text-2xl font-extrabold text-slate-950">{placements.length}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Visible</p>
              <p className="mt-1 text-2xl font-extrabold text-slate-950">{visibleCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {placements.map((placement) => (
          <article key={placement.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-5 border-b border-slate-200 pb-5 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
                    {placement.source || 'Custom Banner'}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${
                      (placement.enabled ?? placement.is_active ?? false) ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {(placement.enabled ?? placement.is_active ?? false) ? 'Visible' : 'Hidden'}
                  </span>
                </div>

                <h2 className="mt-3 text-xl font-bold text-slate-950">{placement.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{placement.page_name || placement.pageName}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{placement.placement_area || placement.placementArea}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{placement.route}</p>
              </div>

              <label className="inline-flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <input
                  type="checkbox"
                  checked={placement.enabled ?? placement.is_active ?? false}
                  onChange={(event) =>
                    updatePlacementField(placement.id, { enabled: event.target.checked })
                  }
                  className="peer sr-only"
                />
                <div className="cms-toggle-track h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Visibility</p>
                  <p className="text-sm font-semibold text-slate-900">{(placement.enabled ?? placement.is_active ?? false) ? 'Shown to users' : 'Hidden from users'}</p>
                </div>
              </label>
            </div>

            <div className="mt-5 grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
              <div className="grid gap-4">
                <AdvertisingImageField placement={placement} onUpload={handleImageUpload} onChange={handleImageUrlChange} />

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                    Destination URL
                  </label>
                  <input
                    type="url"
                    value={placement.target_url || placement.targetUrl || ''}
                    onChange={(event) =>
                      updatePlacementField(placement.id, { targetUrl: event.target.value })
                    }
                    className="admin-input px-4 py-3"
                    placeholder="https://advertiser-site.com"
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Preview</p>
                <AdSlot
                  placement={placement}
                  previewMode
                  containerClassName="border-none py-0"
                  frameClassName="bg-white"
                  imageClassName={placement.id === 'article-sidebar-banner' ? 'h-[250px]' : 'h-[180px]'}
                  placeholderMinHeightClass={placement.id === 'article-sidebar-banner' ? 'min-h-[250px]' : 'min-h-[180px]'}
                />
              </div>
            </div>
          </article>
        ))}

        {!loading && placements.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
            No advertising placements found.
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default AdminAdvertisingPage
