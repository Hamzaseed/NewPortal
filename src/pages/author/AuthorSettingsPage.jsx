import { useState } from 'react'
import { Bell, Paintbrush, Save, Shield, SlidersHorizontal, UserCog, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AuthorShell from '../../components/author/AuthorShell'
import Icon from '../../components/ui/Icon'
import { authorProfile } from '../../data/authorData'

function AuthorSettingsPage() {
  const navigate = useNavigate()
  const [socialLinks, setSocialLinks] = useState([
    { id: 'twitter', platform: 'Twitter', url: 'https://x.com/alexriver' },
    { id: 'linkedin', platform: 'LinkedIn', url: 'https://linkedin.com/in/alexriver' },
    { id: 'website', platform: 'Website', url: 'https://alexriver.press' },
  ])

  function handleAddSocialLink() {
    setSocialLinks((current) => [
      ...current,
      {
        id: `social-${Date.now()}-${current.length}`,
        platform: '',
        url: '',
      },
    ])
  }

  function handleSocialLinkChange(id, field, value) {
    setSocialLinks((current) =>
      current.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    )
  }

  function handleRemoveSocialLink(id) {
    setSocialLinks((current) => current.filter((item) => item.id !== id))
  }

  return (
    <AuthorShell
      eyebrow="Workspace Settings"
      title="Author Settings"
      description="Manage your public persona, security posture, and publishing defaults from one coherent workspace."
      actions={
        <>
          <button type="button" className="rounded-lg px-5 py-2 text-sm font-bold text-slate-500 transition hover:bg-white hover:text-slate-900">
            Discard Changes
          </button>
          <button type="button" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-bold text-white transition hover:bg-primary/90">
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </>
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

            <div className="mb-8 flex flex-col gap-8 md:flex-row">
              <div className="group relative cursor-pointer">
                <img src={authorProfile.avatar} alt="Avatar" className="h-32 w-32 rounded-xl object-cover ring-4 ring-slate-100 transition group-hover:opacity-85" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                  <Paintbrush className="h-5 w-5 text-white" />
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Display Name</label>
                  <input type="text" defaultValue={authorProfile.name} className="w-full rounded-lg border border-primary/10 bg-background-light px-4 py-3 text-slate-900 outline-none transition focus:border-primary/30" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Author Bio</label>
                  <textarea rows={4} defaultValue={authorProfile.bio} className="w-full resize-none rounded-lg border border-primary/10 bg-background-light px-4 py-3 text-slate-900 outline-none transition focus:border-primary/30" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                  Social Connectivity
                </h3>
                <button
                  type="button"
                  onClick={handleAddSocialLink}
                  className="inline-flex items-center gap-2 rounded border border-primary/20 px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/5"
                >
                  <Icon name="add" className="h-4 w-4" />
                  Add Platform
                </button>
              </div>
              <div className="space-y-3">
                {socialLinks.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-slate-100">
                      <Icon name="public" className="h-5 w-5 text-slate-600" />
                    </div>
                    <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-[180px_minmax(0,1fr)_auto]">
                      <input
                        type="text"
                        value={item.platform}
                        onChange={(event) =>
                          handleSocialLinkChange(item.id, 'platform', event.target.value)
                        }
                        placeholder="Platform Name"
                        className="w-full rounded-lg border border-primary/10 bg-background-light px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary/30"
                      />
                      <input
                        type="text"
                        value={item.url}
                        onChange={(event) =>
                          handleSocialLinkChange(item.id, 'url', event.target.value)
                        }
                        placeholder={item.platform ? `${item.platform} URL` : 'Platform URL'}
                        className="w-full rounded-lg border border-primary/10 bg-background-light px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary/30"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSocialLink(item.id)}
                        className="inline-flex h-12 items-center justify-center rounded-lg border border-primary/20 px-3 text-slate-500 transition-colors hover:bg-primary/5 hover:text-primary"
                        aria-label={`Remove ${item.platform || 'social media'} link`}
                        title="Remove platform"
                      >
                        <Icon name="delete" className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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
                  <input type="email" defaultValue={authorProfile.email} className="w-full rounded-lg border border-primary/10 bg-background-light px-4 py-3 text-sm outline-none" />
                  <button type="button" className="absolute right-3 top-2 rounded bg-white px-2.5 py-1.5 text-xs font-bold text-primary shadow-sm">
                    Update
                  </button>
                </div>
              </div>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-900">Two-Factor Auth</span>
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Enabled</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/reset-password')}
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
                  <option>Tech & Innovation</option>
                  <option>Global Politics</option>
                  <option>Environmental Policy</option>
                  <option>AI & Ethics</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Global Tags</label>
                <div className="mb-3 flex flex-wrap gap-2">
                  {['#journalism', '#digital_future'].map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
                      {tag}
                      <X className="h-3 w-3" />
                    </span>
                  ))}
                </div>
                <input type="text" placeholder="Add default tags..." className="w-full rounded-lg border border-primary/10 bg-background-light px-4 py-3 text-sm outline-none" />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Workspace Status</p>
            <h3 className="mt-3 text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>Verified author workspace</h3>
            <p className="mt-3 text-sm leading-6 text-slate-500">Extended media storage, priority analytics exports, and advanced draft history are enabled on this account.</p>
            <div className="mt-5 h-2 w-full rounded-full bg-slate-200">
              <div className="h-full w-2/3 rounded-full bg-primary" />
            </div>
            <div className="mt-2 text-[11px] font-semibold text-slate-500">4.2 GB of 10 GB used</div>
          </section>
        </div>
      </div>
    </AuthorShell>
  )
}

export default AuthorSettingsPage
