import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SocialLinksEditor from '../components/socialsettings/SocialLinksEditor'
import { AppLink } from '../components/ui/AppLink'
import Icon from '../components/ui/Icon'
import {
  fetchSettings,
  updateSettings,
} from '../../app/settings/settingSlice'

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

function ImageUploadField({
  field,
  label,
  alt,
  placeholder,
  emptyText,
  icon = 'upload_file',
  inputType = 'url',
  accept = 'image/*',
  previewClassName = 'mx-auto h-28 w-full rounded-md object-cover',
  previewValue,
  value,
  onUpload,
  onChange,
}) {
  return (
    <div>
      <label htmlFor={field} className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative mt-2 rounded-lg border-2 border-dashed border-primary/15 bg-white p-8 text-center">
        {previewValue ? (
          <img src={previewValue} alt={alt} className={previewClassName} />
        ) : (
          <>
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/5">
              <Icon name={icon} className="h-6 w-6 text-slate-500" />
            </div>
            <p className="text-sm text-slate-500">{emptyText}</p>
          </>
        )}
        <input
          type="file"
          accept={accept}
          className="absolute inset-0 cursor-pointer opacity-0"
          onChange={(event) => onUpload(field, event.target.files?.[0])}
        />
      </div>
      <input
        id={field}
        type={inputType}
        className="admin-input mt-3 px-4 py-2"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(field, event.target.value)}
      />
    </div>
  )
}

function AdminSettingsPage() {
  const dispatch = useDispatch()
  const { settings: storeSettings, loading, error } = useSelector((state) => state.settings)
  const [settings, setSettings] = useState(storeSettings)
  const [files, setFiles] = useState({})
  const apiBaseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

  useEffect(() => {
    dispatch(fetchSettings())
  }, [dispatch])

  useEffect(() => {
    setSettings(storeSettings)
  }, [storeSettings])

  function handleImageUpload(field, file) {
    if (!file) return

    const previewUrl = URL.createObjectURL(file)
    setFiles((current) => ({
      ...current,
      [field]: file,
    }))
    setSettings((current) => ({
      ...current,
      [field]: previewUrl,
    }))
  }

  function handleSettingChange(field, value) {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function handleSaveSettings() {
    const formData = new FormData()

    formData.append('site_logo_url', files.site_logo_url || settings.site_logo_url || '')
    formData.append('favicon_url', files.favicon_url || settings.favicon_url || '')
    formData.append('auth_login_image_url', files.auth_login_image_url || settings.auth_login_image_url || '')
    formData.append('auth_signup_image_url', files.auth_signup_image_url || settings.auth_signup_image_url || '')

    dispatch(updateSettings(formData))
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-10 pb-12">
      <section>
        <div className="mb-4">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Site Branding</h1>
          <p className="text-xs text-slate-500 sm:text-sm">Update your publication's visual identity.</p>
        </div>

        {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ImageUploadField
            field="site_logo_url"
            label="Site Logo"
            alt="Site Logo Preview"
            placeholder="https://..."
            emptyText="Upload or paste site logo URL"
            icon="upload_file"
            accept=".svg,.png,.jpg,.jpeg,image/svg+xml,image/png,image/jpeg"
            previewClassName="mx-auto h-28 w-full rounded-md object-contain"
            previewValue={
              settings.site_logo_url?.startsWith('/uploads/')
                ? `${apiBaseUrl}${settings.site_logo_url}`
                : settings.site_logo_url
            }
            value={settings.site_logo_url}
            onUpload={handleImageUpload}
            onChange={handleSettingChange}
          />
          <ImageUploadField
            field="favicon_url"
            label="Favicon"
            alt="Favicon Preview"
            placeholder="https://..."
            emptyText="Upload or paste favicon URL"
            icon="image"
            inputType="url"
            accept=".ico,.png,image/x-icon,image/vnd.microsoft.icon,image/png"
            previewClassName="mx-auto h-20 w-20 rounded-md object-contain"
            previewValue={
              settings.favicon_url?.startsWith('/uploads/')
                ? `${apiBaseUrl}${settings.favicon_url}`
                : settings.favicon_url
            }
            value={settings.favicon_url}
            onUpload={handleImageUpload}
            onChange={handleSettingChange}
          />
        </div>

        <div className="mt-8">
          <h4 className="mb-4 text-lg font-bold text-slate-900">Auth Dialog Images</h4>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ImageUploadField
              field="auth_login_image_url"
              label="Login Image"
              alt="Login Preview"
              placeholder="https://..."
              emptyText="Upload or paste login image URL"
              previewValue={
                settings.auth_login_image_url?.startsWith('/uploads/')
                  ? `${apiBaseUrl}${settings.auth_login_image_url}`
                  : settings.auth_login_image_url
              }
              value={settings.auth_login_image_url}
              onUpload={handleImageUpload}
              onChange={handleSettingChange}
            />

            <ImageUploadField
              field="auth_signup_image_url"
              label="Signup Image"
              alt="Signup Preview"
              placeholder="https://..."
              emptyText="Upload or paste signup image URL"
              previewValue={
                settings.auth_signup_image_url?.startsWith('/uploads/')
                  ? `${apiBaseUrl}${settings.auth_signup_image_url}`
                  : settings.auth_signup_image_url
              }
              value={settings.auth_signup_image_url}
              onUpload={handleImageUpload}
              onChange={handleSettingChange}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleSaveSettings}
            disabled={loading}
            className="rounded bg-primary px-4 py-2 text-sm font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Saving...' : 'Save Branding'}
          </button>
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
          <SocialLinksEditor variant="admin" />
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
