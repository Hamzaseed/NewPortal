import { useEffect, useState } from 'react'
import { Captions, Clapperboard, Link2, Send, Upload, Video } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { fetchPublicCategories } from '../../../app/categories/categoriesSlice'
import { createVideo, updateVideo } from '../../../app/videos/videoSlice'
import { API_BASE_URL } from '../../../utils/api'

const defaultForm = {
  title: '',
  description: '',
  category: '',
  duration: '',
  thumbnail: '/mbl_logo.png',
  videoUrl: '',
  transcript: '',
  slug: '',
  seoDescription: '',
}

const MBL_LOGO_IMAGE = '/mbl_logo.png'

function VideoComposer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const { loading, error, videos } = useSelector((state) => state.videos)
  const categories = useSelector((state) => state.categories.categories)
  const [form, setForm] = useState({ ...defaultForm, category: 'Latest' })
  const [videoFileName, setVideoFileName] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [isFormReady, setIsFormReady] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const isEditMode = Boolean(id)

  const selectedVideoFromState = location.state?.video
  const selectedVideoFromList = videos.find((item) => String(item.id) === String(id))
  const selectedVideo = selectedVideoFromState || selectedVideoFromList || null

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchPublicCategories())
    }
  }, [categories.length, dispatch])

  useEffect(() => {
    if (isEditMode && selectedVideo && !isFormReady) {
      setForm({
        title: selectedVideo.title || '',
        description: selectedVideo.description || '',
        category: selectedVideo.category || '',
        duration: selectedVideo.duration || '',
        thumbnail: MBL_LOGO_IMAGE,
        videoUrl: selectedVideo.videoUrl || '',
        transcript: selectedVideo.transcript || '',
        slug: selectedVideo.slug || '',
        seoDescription: selectedVideo.seoDescription || '',
      })
      setIsFormReady(true)
      return
    }

    if (!isEditMode && !isFormReady) {
      setForm({ ...defaultForm, category: 'Latest', thumbnail: MBL_LOGO_IMAGE })
      setIsFormReady(true)
    }
  }, [isEditMode, isFormReady, selectedVideo])

  useEffect(() => {
    if (form.category) {
      return
    }

    const firstCategory = categories.find((category) => category.is_active && category.name)

    if (!firstCategory) {
      return
    }

    setForm((current) => ({
      ...current,
      category: firstCategory.name,
    }))
  }, [categories, form.category])

  const transcriptParagraphs = form.transcript
    .split('\n')
    .map((entry) => entry.trim())
    .filter(Boolean)
  const videoUrl = form.videoUrl.trim()
  const resolvedVideoUrl = videoUrl.startsWith('/uploads/') ? `${API_BASE_URL}${videoUrl}` : videoUrl
  const resolvedThumbnail = form.thumbnail.startsWith('/uploads/') ? `${API_BASE_URL}${form.thumbnail}` : form.thumbnail
  const isDirectVideo = /^blob:/i.test(resolvedVideoUrl) || /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(resolvedVideoUrl)
  let previewUrl = resolvedVideoUrl

  if (previewUrl.includes('youtube.com/watch?v=')) {
    const videoId = new URL(previewUrl).searchParams.get('v')
    previewUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : previewUrl
  } else if (previewUrl.includes('youtu.be/')) {
    const videoId = previewUrl.split('youtu.be/')[1]?.split(/[?#]/)[0]
    previewUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : previewUrl
  } else if (previewUrl.includes('vimeo.com/') && !previewUrl.includes('player.vimeo.com')) {
    const videoId = previewUrl.split('vimeo.com/')[1]?.split(/[?#/]/)[0]
    previewUrl = videoId ? `https://player.vimeo.com/video/${videoId}` : previewUrl
  }

  useEffect(() => {
    return () => {
      if (form.videoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(form.videoUrl)
      }
    }
  }, [form.videoUrl])

  async function handlePublish() {
    setSubmitError('')

    const thumbnail = MBL_LOGO_IMAGE
    const safeThumbnail = thumbnail.startsWith('data:') ? '' : thumbnail

    if (!videoUrl && !videoFile) {
      setSubmitError('Please add a video URL or upload a video file before publishing.')
      return
    }

    const payload = new FormData()
    payload.append('slug', form.slug.trim() || `video-${Date.now()}`)
    payload.append('title', form.title.trim() || 'Untitled video')
    payload.append('description', form.description.trim())
    payload.append('category', form.category)
    payload.append('duration', form.duration.trim())
    payload.append('transcript', form.transcript)
    payload.append('seoDescription', form.seoDescription.trim())

    if (safeThumbnail) {
      payload.append('thumbnail', safeThumbnail)
      payload.append('image', safeThumbnail)
    }

    if (videoFile) {
      payload.append('video', videoFile)
    } else if (videoUrl) {
      payload.append('videoUrl', videoUrl)
      payload.append('video_url', videoUrl)
    }
    if (isEditMode && id) {
      const result = await dispatch(updateVideo({
        id,
        data: payload,
      }))

      if (updateVideo.fulfilled.match(result)) {
        navigate('/admin/videos')
      }

      return
    }

    const result = await dispatch(createVideo(payload))

    if (createVideo.fulfilled.match(result)) {
      navigate(`/videos/${result.payload.slug}`)
    }
  }

  async function applyThumbnailFromVideo(videoUrl) {
    let youtubeThumbnail = ''

    try {
      if (videoUrl.includes('youtube.com/watch?v=')) {
        const videoId = new URL(videoUrl).searchParams.get('v')
        youtubeThumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : ''
      } else if (videoUrl.includes('youtu.be/')) {
        const videoId = videoUrl.split('youtu.be/')[1]?.split(/[?#]/)[0]
        youtubeThumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : ''
      }
    } catch {
      youtubeThumbnail = ''
    }

    if (youtubeThumbnail) {
      setForm((current) => ({
        ...current,
        thumbnail: youtubeThumbnail,
      }))
      return
    }

    if (!(/^blob:/i.test(videoUrl) || /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(videoUrl))) {
      try {
        const response = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(videoUrl)}`)
        const data = await response.json()

        if (data?.thumbnail_url) {
          setForm((current) => ({
            ...current,
            thumbnail: data.thumbnail_url,
          }))
        }
      } catch {
        // Keep the current thumbnail if the provider does not expose one.
      }
      return
    }

    try {
      const thumbnail = await new Promise((resolve, reject) => {
        const video = document.createElement('video')
        video.preload = 'metadata'
        video.muted = true
        video.playsInline = true
        video.crossOrigin = 'anonymous'

        const cleanup = () => {
          video.pause()
          video.removeAttribute('src')
          video.load()
        }

        video.onloadeddata = () => {
          const captureTime = Math.min(Math.max(video.duration * 0.2, 0.1), 2)
          video.currentTime = Number.isFinite(captureTime) ? captureTime : 0.1
        }

        video.onseeked = () => {
          try {
            const canvas = document.createElement('canvas')
            canvas.width = video.videoWidth || 1280
            canvas.height = video.videoHeight || 720
            const context = canvas.getContext('2d')

            if (!context) {
              cleanup()
              reject(new Error('Canvas is not available'))
              return
            }

            context.drawImage(video, 0, 0, canvas.width, canvas.height)
            cleanup()
            resolve(canvas.toDataURL('image/jpeg', 0.82))
          } catch (error) {
            cleanup()
            reject(error)
          }
        }

        video.onerror = () => {
          cleanup()
          reject(new Error('Unable to load video'))
        }

        video.src = videoUrl
      })

      setForm((current) => ({
        ...current,
        thumbnail,
      }))
    } catch {}
  }

  async function handleVideoFileChange(event) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const objectUrl = URL.createObjectURL(file)

    setForm((current) => {
      if (current.videoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(current.videoUrl)
      }

      return {
        ...current,
        videoUrl: objectUrl,
      }
    })
    setVideoFile(file)
    setVideoFileName(file.name)

    await applyThumbnailFromVideo(objectUrl)
  }

  function handleVideoUrlChange(event) {
    const value = event.target.value

    setForm((current) => {
      if (current.videoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(current.videoUrl)
      }

      return {
        ...current,
        videoUrl: value,
      }
    })
    setVideoFile(null)
    setVideoFileName('')
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_360px]">
      <div className="space-y-6">
        <section className="overflow-hidden rounded-[28px] border border-primary/10 bg-white shadow-sm">
          <div className="border-b border-primary/10 bg-[linear-gradient(135deg,rgba(107,20,33,0.07),rgba(15,23,42,0.02))] px-6 py-6 sm:px-8">
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
              <span className="rounded-full bg-white px-3 py-1 text-primary shadow-sm">Video Composer</span>
              <span>Shared workspace</span>
            </div>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
              Assemble a simple video package with the player, supporting link, and transcript in one place.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Add the video source, connect an external coverage link, and give readers the full transcript without switching tools.
            </p>
          </div>

          <div className="grid gap-6 p-6 sm:p-8">
            <div className="grid gap-5 lg:grid-cols-2">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Video Title</span>
                <input
                  type="text"
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-display text-2xl font-extrabold text-slate-950 outline-none transition focus:border-primary focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Description</span>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700 outline-none transition focus:border-primary focus:bg-white"
                />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Category</span>
                <select
                  value={form.category}
                  onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:bg-white"
                >
                  {categories.length > 0 ? (
                    [
                      { id: 'latest-default', name: 'Latest' },
                      ...categories.filter((category) => category.is_active && category.name !== ''),
                    ]
                      .map((category) => (
                        <option key={category.id || category.slug || category.name} value={category.name}>
                          {category.name}
                        </option>
                      ))
                  ) : (
                    <option value={form.category}>{form.category}</option>
                  )}
                </select>
              </label>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Duration</span>
                <input
                  type="text"
                  value={form.duration}
                  onChange={(event) => setForm((current) => ({ ...current, duration: event.target.value }))}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:bg-white"
                />
              </label>
            </div>

            <div className="grid gap-5">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Upload Video File</span>
                <div className="relative mt-3">
                  <Upload className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoFileChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition file:mr-3 file:rounded-full file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-primary focus:border-primary focus:bg-white"
                  />
                </div>
                {videoFileName ? <p className="mt-2 text-xs text-slate-500">{videoFileName}</p> : null}
              </label>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Video URL or Embed Link</span>
                <div className="relative mt-3">
                  <Video className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={form.videoUrl}
                    onChange={handleVideoUrlChange}
                    onBlur={async () => {
                      const videoUrl = form.videoUrl.trim()

                      if (!videoUrl) {
                        return
                      }

                      await applyThumbnailFromVideo(videoUrl)
                    }}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-primary focus:bg-white"
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">Paste a YouTube, Instagram, Facebook, TikTok, Vimeo, or direct video link to try auto-filling the thumbnail.</p>
              </label>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-primary/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <Captions className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Transcript</p>
              <h3 className="mt-1 text-2xl font-extrabold text-slate-950">Add readable transcript text</h3>
            </div>
          </div>

          <textarea
            rows={12}
            value={form.transcript}
            onChange={(event) => setForm((current) => ({ ...current, transcript: event.target.value }))}
            className="mt-6 w-full rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-5 text-sm leading-7 text-slate-700 outline-none transition focus:border-primary focus:bg-white"
          />
        </section>

        <section className="rounded-[28px] border border-primary/10 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Editorial Preview</p>
            <h3 className="mt-1 text-2xl font-extrabold text-slate-950">Live video preview</h3>
          </div>

          <article className="mt-8 overflow-hidden rounded-[28px] border border-slate-200 bg-background-light">
            <div className="aspect-video overflow-hidden bg-slate-950">
              {videoUrl && isDirectVideo ? (
                <video poster={resolvedThumbnail} controls className="h-full w-full bg-slate-950 object-cover">
                  <source src={resolvedVideoUrl || undefined} />
                  Your browser does not support the video tag.
                </video>
              ) : videoUrl ? (
                <iframe
                  title={form.title || 'Video preview'}
                  src={previewUrl}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-slate-950 text-sm font-bold uppercase tracking-[0.2em] text-white/60">
                  Add a video URL to preview
                </div>
              )}
            </div>
            <div className="space-y-8 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{form.category}</span>
                <span>{form.duration}</span>
              </div>

              <div className="space-y-4 border-b border-slate-200 pb-6">
                <h3 className="max-w-4xl font-display text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                  {form.title}
                </h3>
                <p className="max-w-3xl text-base leading-7 text-slate-600">{form.description}</p>
              </div>

              <div className="rounded-[24px] border border-primary/10 bg-white p-5">
                <div className="flex items-center gap-3">
                  <Captions className="h-4 w-4 text-primary" />
                  <h4 className="text-lg font-extrabold text-slate-950">Transcript preview</h4>
                </div>
                <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
                  {transcriptParagraphs.map((paragraph, index) => (
                    <p key={`${paragraph.slice(0, 20)}-${index}`}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="rounded-[28px] border border-primary/10 bg-slate-950 p-6 text-white shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Publishing Panel</p>
          <h3 className="mt-3 text-2xl font-extrabold">Keep the video package launch-ready.</h3>
          <div className="mt-6 space-y-4 text-sm text-white/80">
            <div className="flex items-start gap-3">
              <Clapperboard className="mt-0.5 h-4 w-4 text-primary" />
              <span>Add a local video or paste a public video link.</span>
            </div>
            <div className="flex items-start gap-3">
              <Captions className="mt-0.5 h-4 w-4 text-primary" />
              <span>Transcript and preview stay in the same composer.</span>
            </div>
          </div>

          <div className="mt-8">
            {submitError ? <p className="mb-4 text-sm text-red-300">{submitError}</p> : null}
            {error ? <p className="mb-4 text-sm text-red-300">{error}</p> : null}
            <button
              type="button"
              onClick={handlePublish}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
              {loading ? (isEditMode ? 'Updating...' : 'Publishing...') : (isEditMode ? 'Update Video' : 'Publish Video')}
            </button>
          </div>
        </section>

        <section className="rounded-[28px] border border-primary/10 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Link2 className="h-4 w-4 text-primary" />
            <h3 className="text-lg font-extrabold text-slate-950">SEO and routing</h3>
          </div>

          <div className="mt-5 space-y-5">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Slug</span>
              <input
                type="text"
                value={form.slug}
                onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:bg-white"
              />
            </label>

            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Meta Description</span>
              <textarea
                rows={5}
                value={form.seoDescription}
                onChange={(event) => setForm((current) => ({ ...current, seoDescription: event.target.value }))}
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700 outline-none transition focus:border-primary focus:bg-white"
              />
            </label>
          </div>
        </section>
      </aside>
    </div>
  )
}

export default VideoComposer
