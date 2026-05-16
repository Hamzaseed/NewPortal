import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { useAuth } from '../context/AuthContext'
import { AppLink } from '../components/ui/AppLink'
import Icon from '../components/ui/Icon'

function AdminCmsPage() {
  const { createManagedAccount, getAuthors, authors, deleteManagedAccount } = useAuth()
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })
  const authorList = Array.isArray(authors) ? authors : []

  useEffect(() => {
    getAuthors().catch((error) => {
      toast.error(error?.message || 'Could not load authors')
    })
  }, [])

  const sortedAuthors = useMemo(
    () =>
      [...authorList].sort((left, right) =>
        (left.first_name || '').localeCompare(right.first_name || ''),
      ),
    [authorList],
  )

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function resetForm() {
    setForm({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      if (typeof createManagedAccount !== 'function') {
        throw new Error('Author account creation is not available yet')
      }

      await createManagedAccount(
        form.first_name,
        form.last_name,
        form.email,
        form.password,
        'author',
      )

      toast.success('Author account created', {
        description: `${form.email} can now log in with the saved password.`,
      })
      resetForm()
    } catch (error) {
      toast.error(error?.message || 'Could not create author account')
    }
  }

  async function handleDeleteAuthor(author) {
    const confirmed = window.confirm(`Delete author ${author.email}?`)

    if (!confirmed) {
      return
    }

    try {
      await deleteManagedAccount(author.id)
      toast.success('Author account deleted')
    } catch (error) {
      toast.error(error?.message || 'Could not delete author account')
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Admin CMS</p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Register Author Access</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Create author credentials here. Once saved, the author can use that email and password in the same login dialog used on the public site.
            </p>
          </div>

          <AppLink
            to="/admin/articles/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary/90"
          >
            <Icon name="add" className="h-4 w-4" />
            Add Article
          </AppLink>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">New Author</p>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-950">Create login credentials</h2>
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-600">
              Role: Author
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-600">First name</span>
                <input
                  type="text"
                  value={form.first_name}
                  onChange={(event) => updateField('first_name', event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Last name</span>
                <input
                  type="text"
                  value={form.last_name}
                  onChange={(event) => updateField('last_name', event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                  required
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Email address</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                placeholder="author@dailyobserver.com"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Temporary password</span>
              <input
                type="text"
                value={form.password}
                onChange={(event) => updateField('password', event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                placeholder="Set a starter password"
                required
              />
            </label>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600">
              The author will sign in with these exact credentials. You can later let them reset or change the password from the existing auth flow.
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-950 px-6 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-black"
              >
                Register Author
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-bold uppercase tracking-[0.18em] text-slate-700 transition hover:bg-slate-50"
              >
                Clear
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Author Accounts</p>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-950">Current registered authors</h2>
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-600">
              {sortedAuthors.length} Total
            </div>
          </div>

          <div className="space-y-4">
            {sortedAuthors.length ? (
              sortedAuthors.map((author) => (
                <article key={author.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {[author.first_name, author.last_name].filter(Boolean).join(' ')}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">{author.email}</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      {author.role}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleDeleteAuthor(author)}
                      className="rounded-xl border border-red-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-red-600 transition hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm leading-7 text-slate-500">
                No author accounts found yet. Register your first author from the form on the left.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default AdminCmsPage
