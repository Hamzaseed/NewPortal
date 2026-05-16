import { useEffect } from 'react'
import { toast } from 'sonner'
import { useAuth } from '../context/AuthContext'

function AdminAuthorsPage() {
  const { authors, getAuthors } = useAuth()

  useEffect(() => {
    getAuthors().catch((error) => {
      toast.error(error?.message || 'Could not load authors')
    })
  }, [])

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-xl font-bold sm:text-2xl">Authors</h1>
        <p className="text-xs text-slate-500 sm:text-sm">Registered author accounts from your admin panel.</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              {['Author', 'Email', 'Role'].map((header) => (
                <th key={header} className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/5">
            {authors.length > 0 ? (
              authors.map((author) => (
                <tr key={author.id || author.email}>
                  <td className="px-5 py-4 font-medium">
                    {author.first_name} {author.last_name}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{author.email}</td>
                  <td className="px-5 py-4 text-sm font-bold">{author.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-5 py-6 text-sm text-slate-500">
                  No authors found yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AdminAuthorsPage
