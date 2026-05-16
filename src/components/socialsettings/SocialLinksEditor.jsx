import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import {
  addSocialLink as addAdminSocialLink,
  deleteSocialLink as deleteAdminSocialLink,
} from '../../../app/settings/settingSlice'
import {
  addSocialLink as addAuthorSocialLink,
  deleteSocialLink as deleteAuthorSocialLink,
} from '../../../app/settings/authorSettingSlice'
import Icon from '../ui/Icon'

function SocialLinksEditor({ title = 'Social Media Links', variant = 'admin' }) {
  const dispatch = useDispatch()
  const adminSocialLinks = useSelector((state) => state.settings.socialLinks)
  const authorSocialLinks = useSelector((state) => state.authorSettings.socialLinks)
  const socialLinks = variant === 'author' ? authorSocialLinks : adminSocialLinks
  const [newLinks, setNewLinks] = useState([])

  function handleAdd() {
    setNewLinks((prev) => [
      ...prev,
      {
        id: `temp-${Date.now()}`,
        platform: '',
        url: '',
      },
    ])
  }

  function handleChange(id, field, value) {
    setNewLinks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    )
  }

  function handleSave(item) {
    if (!item.platform || !item.url) {
      toast.error('Please enter platform and URL')
      return
    }

    if (!item.url.startsWith('http')) {
      toast.error('URL must start with http or https')
      return
    }

    if (variant === 'author') {
      dispatch(addAuthorSocialLink(item))
    } else {
      dispatch(addAdminSocialLink(item))
    }

    toast.success('Social link saved', {
      description: `${item.platform} has been added successfully.`,
    })

    setNewLinks((prev) => prev.filter((link) => link.id !== item.id))
  }

  function handleDelete(id) {
    if (variant === 'author') {
      dispatch(deleteAuthorSocialLink(id))
    } else {
      dispatch(deleteAdminSocialLink(id))
    }
  }

  function handleRemoveNew(id) {
    setNewLinks((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-bold">{title}</h3>

        <button
          type="button"
          onClick={handleAdd}
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
                disabled
                className="admin-input px-4 py-2"
              />

              <input
                type="text"
                value={item.url}
                disabled
                className="admin-input px-4 py-2"
              />

              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="inline-flex h-10 items-center justify-center rounded border border-primary/20 px-3 text-slate-500 hover:bg-primary/5 hover:text-primary"
              >
                <Icon name="delete" className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {newLinks.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-slate-100">
              <Icon name="public" className="h-5 w-5 text-slate-600" />
            </div>

            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-[180px_minmax(0,1fr)_auto_auto]">
              <input
                type="text"
                placeholder="Platform Name"
                value={item.platform}
                onChange={(e) => handleChange(item.id, 'platform', e.target.value)}
                className="admin-input px-4 py-2"
              />

              <input
                type="text"
                placeholder="Platform URL"
                value={item.url}
                onChange={(e) => handleChange(item.id, 'url', e.target.value)}
                className="admin-input px-4 py-2"
              />

              <button
                type="button"
                onClick={() => handleSave(item)}
                className="inline-flex h-10 items-center justify-center rounded border border-primary/20 px-3 text-xs font-bold text-primary hover:bg-primary/5"
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => handleRemoveNew(item.id)}
                className="inline-flex h-10 items-center justify-center rounded border border-primary/20 px-3 text-slate-500 hover:bg-primary/5 hover:text-primary"
              >
                <Icon name="delete" className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SocialLinksEditor
