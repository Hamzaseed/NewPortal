import Icon from '../components/ui/Icon'

const subscribers = [
  {
    initials: 'JD',
    initialsClass: 'bg-primary/20 text-primary',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    status: 'Active',
    statusClass: 'bg-green-100 text-green-800',
    preferences: ['Daily Digest', 'Product Updates'],
    joinDate: 'Oct 12, 2023',
    featured: false,
    faded: false,
  },
  {
    initials: 'MS',
    initialsClass: 'bg-primary text-white',
    name: 'Marcus Sterling',
    email: 'marcus.s@corporate.org',
    status: 'Premium',
    statusClass: 'bg-primary/20 text-primary',
    preferences: ['Weekly Insights', 'Exclusive'],
    joinDate: 'Jan 05, 2024',
    featured: true,
    faded: false,
  },
  {
    initials: 'RK',
    initialsClass: 'bg-slate-200 text-slate-500',
    name: 'Robert King',
    email: 'rking@webmail.com',
    status: 'Inactive',
    statusClass: 'bg-slate-100 text-slate-600',
    preferences: [],
    joinDate: 'Nov 22, 2022',
    featured: false,
    faded: true,
  },
  {
    initials: 'AL',
    initialsClass: 'bg-primary/20 text-primary',
    name: 'Anna Lee',
    email: 'anna.lee@media.com',
    status: 'Active',
    statusClass: 'bg-green-100 text-green-800',
    preferences: ['Daily Digest'],
    joinDate: 'Feb 18, 2024',
    featured: false,
    faded: false,
  },
]

function AdminSubscribersPage() {
  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl">Subscriber Management</h1>
          <p className="max-w-xl text-base font-normal text-slate-600">
            Manage your active mailing list, analyze growth trends, and configure subscription preferences for individual readers.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="flex h-11 items-center justify-center rounded border border-primary/20 bg-primary/10 px-6 text-sm font-bold tracking-wide text-primary transition-colors hover:bg-primary/20"
          >
            <Icon name="download" className="mr-2 h-5 w-5" />
            Export CSV
          </button>
          <button
            type="button"
            className="flex h-11 items-center justify-center rounded bg-primary px-6 text-sm font-bold tracking-wide text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
          >
            <Icon name="person_add" className="mr-2 h-5 w-5" />
            Add Subscriber
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-primary/10 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex h-11 min-w-[240px] flex-1 flex-col sm:min-w-[300px]">
            <div className="flex h-full w-full items-stretch rounded border border-primary/10 bg-primary/5">
              <div className="flex items-center justify-center pl-4 pr-2 text-primary">
                <Icon name="search" className="h-5 w-5" />
              </div>
              <input
                className="admin-input border-none bg-transparent text-sm font-medium placeholder:text-primary/40 focus:ring-0"
                placeholder="Search by email, name, or subscriber ID..."
              />
            </div>
          </label>

          <div className="flex flex-wrap gap-2">
            <button type="button" className="flex h-11 items-center justify-center gap-x-2 rounded border border-primary/10 bg-primary/5 px-4 text-slate-700 transition-colors hover:bg-primary/10">
              <span className="text-sm font-semibold">Status: All</span>
              <Icon name="expand_more" className="h-5 w-5" />
            </button>
            <button type="button" className="flex h-11 items-center justify-center gap-x-2 rounded border border-primary/10 bg-primary/5 px-4 text-slate-700 transition-colors hover:bg-primary/10">
              <span className="text-sm font-semibold">Tier: Any</span>
              <Icon name="expand_more" className="h-5 w-5" />
            </button>
            <button type="button" className="flex h-11 items-center justify-center gap-x-2 rounded bg-primary/10 px-4 font-bold text-primary transition-colors hover:bg-primary/20">
              <Icon name="filter_list" className="h-5 w-5" />
              <span className="text-sm">Advanced Filters</span>
            </button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto rounded border border-primary/10">
          <table className="w-full min-w-[780px] border-collapse bg-white text-left">
            <thead>
              <tr className="border-b border-primary/10 bg-primary/5">
                <th className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-primary">Subscriber</th>
                <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-widest text-primary">Status</th>
                <th className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-primary">Preferences</th>
                <th className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-primary">Join Date</th>
                <th className="px-4 py-4 text-right text-xs font-bold uppercase tracking-widest text-primary">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-primary/10">
              {subscribers.map((subscriber) => (
                <tr key={subscriber.email} className={`group transition-colors hover:bg-primary/5 ${subscriber.faded ? 'opacity-75' : ''}`}>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex size-10 items-center justify-center rounded-full font-bold ${subscriber.initialsClass}`}>{subscriber.initials}</div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-bold text-slate-900">{subscriber.name}</span>
                          {subscriber.featured ? <Icon name="stars" className="h-3.5 w-3.5 text-yellow-500" /> : null}
                        </div>
                        <span className="text-xs text-slate-500">{subscriber.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-center">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${subscriber.statusClass}`}>{subscriber.status}</span>
                  </td>

                  <td className="px-4 py-4">
                    {subscriber.preferences.length ? (
                      <div className="flex flex-wrap gap-1">
                        {subscriber.preferences.map((preference) => (
                          <span key={preference} className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                            {preference}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs italic text-slate-400">None selected</span>
                    )}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-600">{subscriber.joinDate}</td>
                  <td className="px-4 py-4 text-right">
                    <button type="button" className="text-slate-400 hover:text-primary">
                      <Icon name="more_horiz" className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-500">Showing 1 to 4 of 1,284 subscribers</p>
          <div className="flex gap-1">
            <button type="button" className="flex size-9 items-center justify-center rounded border border-primary/10 bg-white transition-colors hover:bg-primary hover:text-white">
              <Icon name="chevron_left" className="h-4 w-4" />
            </button>
            <button type="button" className="flex size-9 items-center justify-center rounded border border-primary bg-primary text-sm font-bold text-white">
              1
            </button>
            <button type="button" className="flex size-9 items-center justify-center rounded border border-primary/10 bg-white text-sm transition-colors hover:bg-primary/10">
              2
            </button>
            <button type="button" className="flex size-9 items-center justify-center rounded border border-primary/10 bg-white text-sm transition-colors hover:bg-primary/10">
              3
            </button>
            <span className="flex size-9 items-center justify-center text-slate-400">...</span>
            <button type="button" className="flex size-9 items-center justify-center rounded border border-primary/10 bg-white text-sm transition-colors hover:bg-primary/10">
              128
            </button>
            <button type="button" className="flex size-9 items-center justify-center rounded border border-primary/10 bg-white transition-colors hover:bg-primary hover:text-white">
              <Icon name="chevron_right" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminSubscribersPage
