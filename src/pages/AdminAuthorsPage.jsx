function AdminAuthorsPage() {
  const authors = [
    ['Sarah Jenkins', 'Politics', 142],
    ['Michael Chen', 'Technology', 128],
    ['Elena Rodriguez', 'Economy', 96],
    ['Amina Khan', 'Culture', 77],
  ]

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-xl font-bold sm:text-2xl">Authors</h1>
        <p className="text-xs text-slate-500 sm:text-sm">Editorial contributors and output performance.</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              {['Author', 'Primary Beat', 'Articles'].map((header) => (
                <th key={header} className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/5">
            {authors.map(([name, beat, count]) => (
              <tr key={name}>
                <td className="px-5 py-4 font-medium">{name}</td>
                <td className="px-5 py-4 text-sm text-slate-600">{beat}</td>
                <td className="px-5 py-4 text-sm font-bold">{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AdminAuthorsPage
