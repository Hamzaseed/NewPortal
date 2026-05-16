import { useEffect, useMemo, useState } from 'react'
import { Bell, Save, Shield, SlidersHorizontal, Tag, UserCog } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AuthorShell from '../../components/author/AuthorShell'
import SocialLinksDisplay from '../../components/socialsettings/socialLinksDisplay'
import SocialLinksEditor from '../../components/socialsettings/SocialLinksEditor'
import ImageWithFallback from '../../components/ui/ImageWithFallback'
import { useAuth } from '../../context/AuthContext'
import { fetchAuthorSettings, updateAuthorSettings } from '../../../app/settings/authorSettingSlice'
import { fetchPublicCategories } from '../../../app/categories/categoriesSlice'
import { fetchArticles } from '../../../app/articles/articleSlice'

function AuthorSettingsPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { author, settings, loading, error } = useSelector((state) => state.authorSettings)
  const categories = useSelector((state) => state.categories.categories)
  const articles = useSelector((state) => state.articles.articles)
  const [form, setForm] = useState(settings)
  const [avatarFile, setAvatarFile] = useState(null)
  const isAdmin = user?.role === 'admin'

  const displayName = form.display_name ?? form.name ?? author?.name ?? ''
  const bio = form.bio ?? author?.bio ?? ''
  const email = form.email ?? author?.email ?? ''
  const avatar = form.avatar ?? author?.avatar ?? ''

  const hasChanges = useMemo(() => {
    const currentDisplayName = settings.display_name ?? settings.name ?? author?.name ?? ''
    const currentBio = settings.bio ?? author?.bio ?? ''
    const currentEmail = author?.email ?? ''
    const currentAvatar = author?.avatar ?? ''

    return displayName !== currentDisplayName || bio !== currentBio || avatar !== currentAvatar || (isAdmin && email !== currentEmail)
  }, [author?.avatar, author?.bio, author?.email, author?.name, avatar, bio, displayName, email, isAdmin, settings.bio, settings.display_name, settings.name])

  useEffect(() => {
    dispatch(fetchAuthorSettings())
  }, [dispatch])

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchPublicCategories())
    }
  }, [categories.length, dispatch])

  useEffect(() => {
    if (!articles.length) {
      dispatch(fetchArticles({ page: 1, limit: 50 }))
    }
  }, [articles.length, dispatch])

  useEffect(() => {
    setForm(settings)
  }, [settings])

  const loggedInAuthorName = `${user?.first_name || ''} ${user?.last_name || ''}`.trim()

  const myArticles = useMemo(() => {
    return articles.filter((article) => {
      if (user?.id && article.created_by === user.id) {
        return true
      }

      if (loggedInAuthorName && article.author === loggedInAuthorName) {
        return true
      }

      return false
    })
  }, [articles, loggedInAuthorName, user?.id])

  const authorTags = useMemo(() => {
    const tags = []

    myArticles.forEach((article) => {
      if (Array.isArray(article.tags)) {
        article.tags.forEach((tag) => {
          if (tag && !tags.includes(tag)) {
            tags.push(tag)
          }
        })
      }
    })

    return tags
  }, [myArticles])

  function handleChange(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function handleSave() {
    if (!hasChanges || loading) return

    const formData = new FormData()
    formData.append('display_name', displayName)
    formData.append('bio', bio)
    formData.append('email', isAdmin ? email : author?.email || '')
    formData.append('avatar_url', avatarFile || avatar || '')

    if (isAdmin) {
      dispatch(updateAuthorSettings(formData))
      return
    }

    dispatch(updateAuthorSettings(formData))
  }

  return (
    <AuthorShell
      eyebrow="Workspace Settings"
      title="Author Settings"
      description="Manage your public persona, security posture, and publishing defaults from one coherent workspace."
      actions={
        <button
          type="button"
          onClick={handleSave}
          disabled={!hasChanges || loading}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-bold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:hover:bg-slate-300"
        >
          <Save className="h-4 w-4" />
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      }
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          <section className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8 flex items-center gap-4">
              <UserCog className="h-7 w-7 text-primary" />
              <h2 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
                Profile Settings
              </h2>
            </div>

            {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}

            <div className="mb-8 flex flex-col gap-8 md:flex-row">
              <div className="w-full max-w-xs">
                <label className="mb-2 block text-sm font-bold text-slate-700">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    setAvatarFile(file)
                    handleChange('avatar', URL.createObjectURL(file))
                  }}
                  className="w-full rounded-lg border border-primary/10 bg-background-light px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary/30"
                />
                {avatar ? <ImageWithFallback src={avatar} alt="Avatar Preview" className="mt-4 h-32 w-32 rounded-xl object-cover ring-4 ring-slate-100" /> : null}
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Display Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => handleChange('display_name', e.target.value)}
                    className="w-full rounded-lg border border-primary/10 bg-background-light px-4 py-3 text-slate-900 outline-none transition focus:border-primary/30"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Author Bio</label>
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    className="w-full resize-none rounded-lg border border-primary/10 bg-background-light px-4 py-3 text-slate-900 outline-none transition focus:border-primary/30"
                  />
                </div>
              </div>
            </div>

            <SocialLinksEditor title="Social Connectivity" variant="author" />

            <div className="mt-6">
              <p className="mb-3 text-sm font-bold text-slate-700">Preview</p>
              <SocialLinksDisplay variant="author" />
            </div>
          </section>

          <section className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8 flex items-center gap-4">
              <Bell className="h-7 w-7 text-primary" />
              <h2 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
                Notification Preferences
              </h2>
            </div>

            <div className="space-y-4">
              {[
                { title: 'Email Digests', desc: 'Weekly summary of top-performing articles.' },
                { title: 'New Comment Alerts', desc: 'Instant notification for community engagement.' },
                { title: 'Monthly Analytics Reports', desc: 'Detailed breakdown of growth and reach.' },
              ].map((item) => (
                <div key={item.title} className="flex items-center justify-between rounded-lg border border-primary/10 bg-background-light p-4">
                  <div>
                    <div className="font-bold text-slate-900">{item.title}</div>
                    <div className="mt-1 text-sm text-slate-500">{item.desc}</div>
                  </div>
                  <input type="checkbox" defaultChecked className="h-5 w-5 accent-primary" />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8 lg:col-span-4">
          <section className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-4">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
                Account Security
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    readOnly={!isAdmin}
                    className="w-full rounded-lg border border-primary/10 bg-background-light px-4 py-3 text-sm outline-none read-only:cursor-not-allowed read-only:text-slate-500"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/change-password')}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary/10 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-primary/30 hover:text-primary"
              >
                <Shield className="h-4 w-4" />
                Change Password
              </button>
            </div>
          </section>

          <section className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-4">
              <SlidersHorizontal className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
                Publishing Defaults
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Default Category</label>
                <select className="w-full rounded-lg border border-primary/10 bg-background-light px-4 py-3 text-sm outline-none">
                  {categories.length > 0 ? (
                    categories
                      .filter((category) => category.is_active)
                      .map((category) => (
                        <option key={category.id || category.slug || category.name} value={category.name}>
                          {category.name}
                        </option>
                      ))
                  ) : (
                    <option value="">No categories found</option>
                  )}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Author Tags</label>
                {authorTags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {authorTags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No tags added yet.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </AuthorShell>
  )
}

export default AuthorSettingsPage
