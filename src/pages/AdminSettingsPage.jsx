import { useState } from 'react'
import { AppLink } from '../components/ui/AppLink'
import Icon from '../components/ui/Icon'

function ToggleRow({ title, description, enabled = false }) {
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <p className="font-bold">{title}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <label className="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" defaultChecked={enabled} className="peer sr-only" />
        <div className="cms-toggle-track h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full" />
      </label>
    </div>
  )
}

function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    authLoginImageUrl: '',
    authSignupImageUrl: '',
  })
  const [socialLinks, setSocialLinks] = useState([
    { id: 'twitter', platform: 'Twitter', url: 'https://twitter.com/dailyobserver' },
    { id: 'facebook', platform: 'Facebook', url: 'https://facebook.com/dailyobserver' },
    { id: 'instagram', platform: 'Instagram', url: '' },
  ])

  function handleImageUpload(field, file) {
    if (!file) return

    const previewUrl = URL.createObjectURL(file)
    setSettings((current) => ({
      ...current,
      [field]: previewUrl,
    }))
  }

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
    <div className="mx-auto w-full max-w-5xl space-y-10 pb-12">
      <section>
        <div className="mb-4">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Site Branding</h1>
          <p className="text-xs text-slate-500 sm:text-sm">Update your publication's visual identity.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            ['Site Logo', 'SVG, PNG or JPEG. Max size 2MB. Recommended 512x128px.', 'upload_file', 'Update Logo'],
            ['Favicon', 'ICO or PNG. Recommended 32x32px or 64x64px.', 'image', 'Update Favicon'],
          ].map(([title, text, icon, action]) => (
            <article key={title} className="flex items-start gap-6 rounded-xl border border-primary/5 bg-white p-6">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-primary/20 bg-slate-100">
                <Icon name={icon} className="h-6 w-6 text-slate-400" />
              </div>
              <div>
                <h4 className="mb-1 font-bold">{title}</h4>
                <p className="mb-4 text-xs text-slate-500">{text}</p>
                <button type="button" className="rounded border border-primary px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-white">
                  {action}
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <h4 className="mb-4 text-lg font-bold text-slate-900">Auth Dialog Images</h4>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="authLoginImageUrl" className="text-sm font-semibold text-slate-700">
                Login Image
              </label>
              <div className="relative mt-2 rounded-lg border-2 border-dashed border-primary/15 bg-white p-8 text-center">
                {settings.authLoginImageUrl ? (
                  <img
                    src={settings.authLoginImageUrl}
                    alt="Login Preview"
                    className="mx-auto h-28 w-full rounded-md object-cover"
                  />
                ) : (
                  <>
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/5">
                      <Icon name="upload_file" className="h-6 w-6 text-slate-500" />
                    </div>
                    <p className="text-sm text-slate-500">Upload or paste login image URL</p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 cursor-pointer opacity-0"
                  onChange={(event) => handleImageUpload('authLoginImageUrl', event.target.files?.[0])}
                />
              </div>
              <input
                id="authLoginImageUrl"
                type="url"
                className="admin-input mt-3 px-4 py-2"
                placeholder="https://..."
                value={settings.authLoginImageUrl}
                onChange={(event) =>
                  setSettings({ ...settings, authLoginImageUrl: event.target.value })
                }
              />
            </div>

            <div>
              <label htmlFor="authSignupImageUrl" className="text-sm font-semibold text-slate-700">
                Signup Image
              </label>
              <div className="relative mt-2 rounded-lg border-2 border-dashed border-primary/15 bg-white p-8 text-center">
                {settings.authSignupImageUrl ? (
                  <img
                    src={settings.authSignupImageUrl}
                    alt="Signup Preview"
                    className="mx-auto h-28 w-full rounded-md object-cover"
                  />
                ) : (
                  <>
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/5">
                      <Icon name="upload_file" className="h-6 w-6 text-slate-500" />
                    </div>
                    <p className="text-sm text-slate-500">Upload or paste signup image URL</p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 cursor-pointer opacity-0"
                  onChange={(event) => handleImageUpload('authSignupImageUrl', event.target.files?.[0])}
                />
              </div>
              <input
                id="authSignupImageUrl"
                type="url"
                className="admin-input mt-3 px-4 py-2"
                placeholder="https://..."
                value={settings.authSignupImageUrl}
                onChange={(event) =>
                  setSettings({ ...settings, authSignupImageUrl: event.target.value })
                }
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold sm:text-2xl">Homepage Layout</h2>
          <p className="text-xs text-slate-500 sm:text-sm">Control visibility of main page sections.</p>
        </div>

        <div className="divide-y divide-primary/5 rounded-xl border border-primary/5 bg-white">
          <ToggleRow title="Editor's Picks" description="Curated stories selected by the editorial team." enabled />
          <ToggleRow title="Trending Stories" description="Automated list of highest-traffic articles." enabled />
          <ToggleRow title="Newsletter Signup Banner" description="Floating or inline newsletter capture form." />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <article>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-xl font-bold">Social Media Links</h3>
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
                    onChange={(event) => handleSocialLinkChange(item.id, 'platform', event.target.value)}
                    placeholder="Platform Name"
                    className="admin-input px-4 py-2"
                  />
                  <input
                    type="text"
                    value={item.url}
                    onChange={(event) => handleSocialLinkChange(item.id, 'url', event.target.value)}
                    placeholder={item.platform ? `${item.platform} URL` : 'Platform URL'}
                    className="admin-input px-4 py-2"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSocialLink(item.id)}
                    className="inline-flex h-10 items-center justify-center rounded border border-primary/20 px-3 text-slate-500 transition-colors hover:bg-primary/5 hover:text-primary"
                    aria-label={`Remove ${item.platform || 'social media'} link`}
                    title="Remove platform"
                  >
                    <Icon name="delete" className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article>
          <div className="mb-4">
            <h3 className="text-xl font-bold">Service Providers</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase text-slate-500">Email Delivery (SMTP/API)</label>
              <select className="admin-select w-full px-4 py-2 text-sm">
                <option>SendGrid (API)</option>
                <option>Mailgun</option>
                <option>Amazon SES</option>
                <option>Custom SMTP</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase text-slate-500">Push Notifications</label>
              <div className="flex items-center justify-between rounded-lg border border-primary/10 bg-primary/5 p-3">
                <div className="flex items-center gap-2">
                  <Icon name="notifications_active" className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">OneSignal Connected</span>
                </div>
                <button type="button" className="text-xs font-bold text-primary">Configure</button>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section>
        <div className="mb-4">
          <h3 className="text-xl font-bold">User Roles and Permissions</h3>
          <p className="text-sm text-slate-500">Brief overview of global access levels.</p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-primary/5 bg-white">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-primary/10">
                {['Role', 'Admin Panel', 'Author Workspace', 'Premium Access', 'Saved Stories'].map((head) => (
                  <th key={head} className="px-4 py-3 text-xs font-bold uppercase text-slate-500">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                ['Super Admin', true, true, true, true],
                ['Author', false, true, false, true],
                ['User Unsubscribed', false, false, false, true],
                ['User Subscribed', false, false, true, true],
              ].map(([role, a, b, c, d]) => (
                <tr key={role} className="border-b border-primary/5">
                  <td className="px-4 py-3 font-bold">{role}</td>
                  {[a, b, c, d].map((allowed, idx) => (
                    <td key={`${role}-${idx}`} className="px-4 py-3">
                      <Icon name={allowed ? 'check_circle' : 'cancel'} className={allowed ? 'h-5 w-5 text-green-600' : 'h-5 w-5 text-slate-300'} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-right">
          <AppLink to="/admin/permissions" className="text-sm font-bold text-primary hover:underline">
            Manage Detailed Permissions {'->'}
          </AppLink>
        </div>
      </section>
    </div>
  )
}

export default AdminSettingsPage
