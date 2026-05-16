import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../context/AuthContext'
import AuthDialog from '../components/auth/AuthDialog'
import { AppLink } from '../components/ui/AppLink'
import Icon from '../components/ui/Icon'
import { API_BASE_URL } from '../../utils/api'
import { fetchSavedVideos, unsaveVideo } from '../../app/videos/videoSlice'
import { fetchSavedArticles, unsaveArticle } from '../../app/articles/articleSlice'

function SavedPage() {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const { savedVideos } = useSelector((state) => state.videos)
  const { savedArticles } = useSelector((state) => state.articles)

  async function handleRemoveVideo(id) {
    if (!id) {
      return
    }

    await dispatch(unsaveVideo(id))
  }

  async function handleRemoveArticle(id) {
    if (!id) {
      return
    }

    await dispatch(unsaveArticle(id))
  }

  useEffect(() => {
    if (!user) {
      return
    }

    dispatch(fetchSavedArticles())
    dispatch(fetchSavedVideos())
  }, [dispatch, user])

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background-light px-4">
        <section className="w-full max-w-xl rounded-xl border border-primary/10 bg-white p-8 text-center shadow-sm">
          <h1 className="mb-2 font-display text-3xl font-bold text-slate-900">Saved Articles</h1>
          <p className="text-sm text-slate-600">Sign in to view the articles you bookmarked.</p>
          <button
            type="button"
            onClick={() => setAuthDialogOpen(true)}
            className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary/90"
          >
            Sign In
          </button>

          <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} initialMode="login" />
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background-light px-4 py-8">
      <section className="mx-auto w-full max-w-5xl">
        <div className="mb-6">
          <h1 className="mb-2 font-display text-3xl font-bold text-slate-900">Saved Items</h1>
          <p className="text-sm text-slate-600">Your saved articles and videos for this account.</p>
        </div>

        {savedArticles.length === 0 && savedVideos.length === 0 ? (
          <section className="rounded-xl border border-primary/10 bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-slate-600">No saved items yet. Tap the bookmark icon on an article or video to save it here.</p>
          </section>
        ) : (
          <div className="space-y-8">
            {savedVideos.length > 0 ? (
              <section>
                <h2 className="mb-4 text-xl font-bold text-slate-900">Saved Videos</h2>
                <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
                  {savedVideos.map((video) => (
                    <article key={video.id || video.slug} className="flex gap-4 border-b border-slate-100 p-4 last:border-b-0">
                      <AppLink to={`/videos/${video.slug || video.id}`} className="relative block h-24 w-36 shrink-0 overflow-hidden bg-slate-950 sm:h-28 sm:w-44">
                        {video.thumbnail || video.image ? (
                          <img
                            src={(video.thumbnail || video.image || '').startsWith('/uploads/')
                              ? `${API_BASE_URL}${video.thumbnail || video.image}`
                              : video.thumbnail || video.image}
                            alt={video.title}
                            className="h-full w-full object-cover"
                          />
                        ) : /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(video.videoUrl || video.video_url || '') ? (
                          <video
                            src={(video.videoUrl || video.video_url || '').startsWith('/uploads/')
                              ? `${API_BASE_URL}${video.videoUrl || video.video_url}`
                              : video.videoUrl || video.video_url}
                            preload="metadata"
                            muted
                            playsInline
                            className="h-full w-full bg-slate-950 object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-slate-950 text-xs font-bold uppercase tracking-[0.18em] text-white/60">
                            Video
                          </div>
                        )}
                      </AppLink>

                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{video.category || 'Video'}</p>
                          <button
                            type="button"
                            onClick={() => handleRemoveVideo(video.id)}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary bg-primary text-white transition hover:bg-primary/90"
                            title="Remove from saved"
                            aria-label={`Remove ${video.title || 'video'} from saved`}
                          >
                            <Icon name="bookmark" className="h-4 w-4" />
                          </button>
                        </div>
                        <AppLink to={`/videos/${video.slug || video.id}`} className="block">
                          <h2 className="line-clamp-2 text-lg font-bold text-slate-900 transition hover:text-primary">{video.title}</h2>
                        </AppLink>
                        <p className="line-clamp-2 text-sm leading-6 text-slate-600">
                          {video.description || 'Open the video to continue watching.'}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {savedArticles.length > 0 ? (
              <section>
                <h2 className="mb-4 text-xl font-bold text-slate-900">Saved Articles</h2>
                <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
                  {savedArticles.map((article) => (
                    <article key={article.slug} className="flex gap-4 border-b border-slate-100 p-4 last:border-b-0">
                      <AppLink to={`/news/${article.slug}`} className="block h-24 w-36 shrink-0 overflow-hidden bg-slate-100 sm:h-28 sm:w-44">
                        <img
                          src={(article.hero_image || '').startsWith('/uploads/')
                            ? `${API_BASE_URL}${article.hero_image}`
                            : article.hero_image || 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80'}
                          alt={article.title}
                          className="h-full w-full object-cover"
                        />
                      </AppLink>

                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{article.category}</p>
                          <button
                            type="button"
                            onClick={() => handleRemoveArticle(article.id)}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary bg-primary text-white transition hover:bg-primary/90"
                            title="Remove from saved"
                            aria-label={`Remove ${article.title || 'article'} from saved`}
                          >
                            <Icon name="bookmark" className="h-4 w-4" />
                          </button>
                        </div>
                        <AppLink to={`/news/${article.slug}`} className="block">
                          <h2 className="line-clamp-2 text-lg font-bold text-slate-900 transition hover:text-primary">{article.title}</h2>
                        </AppLink>
                        <p className="line-clamp-2 text-sm leading-6 text-slate-600">
                          {article.excerpt || 'Open the article to continue reading.'}
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{article.author}</span>
                          <span>{article.publish_date || ''}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        )}
      </section>
    </main>
  )
}

export default SavedPage
