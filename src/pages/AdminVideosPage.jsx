import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteVideo, fetchVideos } from '../../app/videos/videoSlice'
import { AppLink } from '../components/ui/AppLink'
import Icon from '../components/ui/Icon'

function AdminVideosPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { videos, pagination, loading, error } = useSelector((state) => state.videos)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(fetchVideos({ page, limit: 10 }))
  }, [dispatch, page])

  async function handleDelete(id) {
    if (!id) {
      return
    }

    const shouldDelete = window.confirm('Delete this video?')

    if (!shouldDelete) {
      return
    }

    await dispatch(deleteVideo(id))
  }

  function handleUpdate(video) {
    if (!video?.id) {
      return
    }

    navigate(`/admin/videos/${video.id}/edit`, {
      state: {
        video,
      },
    })
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">Videos</h1>
          <p className="text-xs text-slate-500 sm:text-sm">Manage uploaded videos and keep titles updated.</p>
        </div>

        <AppLink to="/admin/videos/new" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">
          <Icon name="add" className="h-4 w-4" /> New Video
        </AppLink>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-slate-50">
              <tr>
                {['Title', 'Category', 'Duration', 'Action'].map((header) => (
                  <th key={header} className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {videos.map((item) => (
                <tr key={item.id || item.slug}>
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold">{item.title}</p>
                    <p className="text-xs text-slate-500">/{item.slug}</p>
                  </td>
                  <td className="px-5 py-4 text-sm">{item.category || '-'}</td>
                  <td className="px-5 py-4 text-sm">{item.duration || '-'}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdate(item)}
                        disabled={!item.id || loading}
                        className="rounded-lg border border-primary/20 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-primary transition hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        disabled={!item.id || loading}
                        className="rounded-lg border border-rose-200 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!loading && videos.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-sm text-slate-500">
                    No videos found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-primary/10 bg-slate-50 px-5 py-4">
          <span className="text-xs font-medium text-slate-500">
            {loading
              ? 'Loading videos...'
              : `Showing ${videos.length} of ${pagination?.total_videos || videos.length} videos`}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded border border-primary/10 transition-colors hover:bg-white disabled:opacity-50"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1 || loading}
            >
              <Icon name="chevron_left" className="h-4 w-4" />
            </button>
            <button type="button" className="flex size-8 items-center justify-center rounded bg-primary text-xs font-bold text-white">
              {page}
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded border border-primary/10 transition-colors hover:bg-white disabled:opacity-50"
              onClick={() => setPage((current) => current + 1)}
              disabled={page >= (pagination?.total_pages || 1) || loading}
            >
              <Icon name="chevron_right" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminVideosPage
