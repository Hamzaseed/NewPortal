import Icon from '../components/ui/Icon'

const comments = [
  {
    initials: 'AR',
    name: 'Alex Rivera',
    email: 'alex.r@email.com',
    article: 'Local Election Results 2024',
    content:
      'The reporting here is very thorough. I appreciate the focus on down-ballot races which often get ignored. When will the full precinct data be available for download?',
    date: 'OCT 24, 2024',
    time: '10:42 AM',
  },
  {
    initials: 'SS',
    name: 'Sam Smith',
    email: 'sammy99@provider.net',
    article: 'Climate Policy 2025: A Deep Dive',
    content:
      "I strongly disagree with the premise of the third paragraph. The economic data from the UN report contradicts the author's claim about carbon taxing impacts.",
    date: 'OCT 24, 2024',
    time: '09:15 AM',
  },
  {
    initials: 'JL',
    name: 'Jordan Lee',
    email: 'jordan.lee@workmail.com',
    article: 'New Transit Lines Announced',
    content:
      "When will the construction actually begin in the north? The map shows a station on 5th and Main, but that's currently a historic landmark.",
    date: 'OCT 23, 2024',
    time: '05:30 PM',
  },
]

function AdminCommentsPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Comment Moderation</h1>
          <span className="rounded bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-white">Live</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Icon name="search" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/40" />
            <input type="text" placeholder="Search comments..." className="admin-search w-64 py-1.5 pl-10 pr-4" />
          </div>
          <button type="button" className="relative p-2 text-slate-600 transition-colors hover:text-primary">
            <Icon name="notifications" className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary ring-2 ring-background-light" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <article className="rounded-xl border border-primary/10 bg-background-light p-4 shadow-sm">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary/60">Queue Size</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-black italic">142</h3>
            <span className="text-xs font-bold text-primary">+12 today</span>
          </div>
        </article>
        <article className="rounded-xl border border-primary/10 bg-background-light p-4 shadow-sm">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary/60">Response Time</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-black italic">4.2m</h3>
            <span className="text-xs font-bold text-emerald-600">↓ 0.8m</span>
          </div>
        </article>
        <article className="rounded-xl border border-primary/10 bg-background-light p-4 shadow-sm">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary/60">Approval Rate</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-black italic">88%</h3>
            <span className="text-xs font-bold text-slate-500">Steady</span>
          </div>
        </article>
      </div>

      <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
        <div className="flex border-b border-primary/10 bg-primary/5 px-3 sm:px-6">
          <button type="button" className="flex items-center gap-2 border-b-2 border-primary px-3 py-4 text-sm font-bold text-primary sm:px-6">
            <Icon name="pending_actions" className="h-5 w-5" />
            Pending Review
            <span className="ml-1 inline-flex h-5 min-w-7 items-center justify-center rounded-full bg-primary px-2 text-[10px] font-bold leading-none text-white">
              142
            </span>
          </button>
          <button type="button" className="hidden items-center gap-2 border-b-2 border-transparent px-6 py-4 text-sm font-bold text-slate-500 transition-colors hover:text-primary sm:flex">
            <Icon name="check_circle" className="h-5 w-5" />
            Approved
          </button>
          <button type="button" className="hidden items-center gap-2 border-b-2 border-transparent px-6 py-4 text-sm font-bold text-slate-500 transition-colors hover:text-primary sm:flex">
            <Icon name="report" className="h-5 w-5" />
            Spam
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left">
            <thead>
              <tr className="border-b border-primary/5 text-[10px] font-black uppercase tracking-widest text-primary/40">
                <th className="px-6 py-4">Commenter</th>
                <th className="px-6 py-4">Article</th>
                <th className="w-1/3 px-6 py-4">Comment Content</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {comments.map((comment) => (
                <tr key={comment.email} className="group transition-colors hover:bg-primary/[0.02]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{comment.initials}</div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">{comment.name}</p>
                        <p className="text-[10px] text-slate-400">{comment.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-medium italic underline decoration-primary/20 underline-offset-4">{comment.article}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="line-clamp-2 text-sm italic leading-relaxed text-slate-600">{`"${comment.content}"`}</p>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <p className="text-[10px] font-bold text-slate-400">{comment.date}</p>
                    <p className="text-[10px] uppercase text-slate-400">{comment.time}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded bg-orange-100 px-2 py-1 text-[10px] font-black uppercase tracking-tighter text-orange-700">
                      <span className="size-1 rounded-full bg-orange-500" />
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button type="button" title="Approve" className="rounded-lg p-1.5 text-emerald-600 transition-colors hover:bg-emerald-50">
                        <Icon name="check_circle" className="h-5 w-5" />
                      </button>
                      <button type="button" title="Mark as Spam" className="rounded-lg p-1.5 text-orange-600 transition-colors hover:bg-orange-50">
                        <Icon name="block" className="h-5 w-5" />
                      </button>
                      <button type="button" title="Delete" className="rounded-lg p-1.5 text-primary transition-colors hover:bg-primary/10">
                        <Icon name="delete" className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-primary/5 bg-primary/5 px-4 py-4 sm:px-6">
          <p className="text-xs font-medium text-slate-500">Showing 1-10 of 142 entries</p>
          <div className="flex items-center gap-2">
            <button type="button" className="rounded border border-primary/20 p-1 text-slate-400 transition-colors hover:bg-white hover:text-primary">
              <Icon name="chevron_left" className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-1">
              <button type="button" className="size-8 rounded bg-primary text-xs font-bold text-white">
                1
              </button>
              <button type="button" className="size-8 rounded text-xs font-bold transition-colors hover:bg-white">
                2
              </button>
              <button type="button" className="size-8 rounded text-xs font-bold transition-colors hover:bg-white">
                3
              </button>
              <span className="px-1 text-slate-400">...</span>
              <button type="button" className="size-8 rounded text-xs font-bold transition-colors hover:bg-white">
                15
              </button>
            </div>
            <button type="button" className="rounded border border-primary/20 p-1 text-slate-400 transition-colors hover:bg-white hover:text-primary">
              <Icon name="chevron_right" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-6">
        <div className="flex gap-4">
          <Icon name="gavel" className="h-5 w-5 text-primary" />
          <div>
            <h4 className="mb-1 text-sm font-bold uppercase tracking-wider text-primary">Moderator Guidelines</h4>
            <p className="text-xs italic leading-relaxed text-slate-600">
              Encourage civil discourse. Remove personal attacks, hate speech, and purely promotional content. Controversial opinions are permitted as long as they
              are backed by arguments and remain respectful.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminCommentsPage
