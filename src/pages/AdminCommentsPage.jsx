import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  approveComment,
  deleteComment,
  markCommentAsSpam,
  moveCommentToPending,
} from '../../app/comments/commentSlice'
import Icon from '../components/ui/Icon'

function AdminCommentsPage() {
  const dispatch = useDispatch()
  const comments = useSelector((state) => state.comments.comments)
  const [activeTab, setActiveTab] = useState('pending')
  const [search, setSearch] = useState('')

  const pendingCount = comments.filter((item) => item.status === 'pending').length
  const approvedCount = comments.filter((item) => item.status === 'approved').length
  const spamCount = comments.filter((item) => item.status === 'spam').length

  const filteredComments = comments.filter((item) => {
    const matchesStatus = item.status === activeTab
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.comment.toLowerCase().includes(search.toLowerCase()) ||
      item.articleTitle.toLowerCase().includes(search.toLowerCase())

    return matchesStatus && matchesSearch
  })

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
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search comments..."
              className="admin-search w-64 py-1.5 pl-10 pr-4"
            />
          </div>
          <button type="button" className="relative p-2 text-slate-600 transition-colors hover:text-primary">
            <Icon name="notifications" className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary ring-2 ring-background-light" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <article className="rounded-xl border border-primary/10 bg-background-light p-4 shadow-sm">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary/60">Pending</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-black italic">{pendingCount}</h3>
            <span className="text-xs font-bold text-primary">Need review</span>
          </div>
        </article>
        <article className="rounded-xl border border-primary/10 bg-background-light p-4 shadow-sm">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary/60">Approved</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-black italic">{approvedCount}</h3>
            <span className="text-xs font-bold text-emerald-600">Visible</span>
          </div>
        </article>
        <article className="rounded-xl border border-primary/10 bg-background-light p-4 shadow-sm">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary/60">Spam</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-black italic">{spamCount}</h3>
            <span className="text-xs font-bold text-orange-600">Blocked</span>
          </div>
        </article>
      </div>

      <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
        <div className="flex border-b border-primary/10 bg-primary/5 px-3 sm:px-6">
          <button
            type="button"
            onClick={() => setActiveTab('pending')}
            className={`flex items-center gap-2 border-b-2 px-3 py-4 text-sm font-bold sm:px-6 ${
              activeTab === 'pending' ? 'border-primary text-primary' : 'border-transparent text-slate-500'
            }`}
          >
            <Icon name="pending_actions" className="h-5 w-5" />
            Pending
            <span className="ml-1 inline-flex h-5 min-w-7 items-center justify-center rounded-full bg-primary px-2 text-[10px] font-bold leading-none text-white">
              {pendingCount}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('approved')}
            className={`flex items-center gap-2 border-b-2 px-3 py-4 text-sm font-bold sm:px-6 ${
              activeTab === 'approved' ? 'border-primary text-primary' : 'border-transparent text-slate-500'
            }`}
          >
            <Icon name="check_circle" className="h-5 w-5" />
            Approved
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('spam')}
            className={`flex items-center gap-2 border-b-2 px-3 py-4 text-sm font-bold sm:px-6 ${
              activeTab === 'spam' ? 'border-primary text-primary' : 'border-transparent text-slate-500'
            }`}
          >
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
              {filteredComments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-sm text-slate-500">
                    No comments found.
                  </td>
                </tr>
              ) : (
                filteredComments.map((comment) => (
                  <tr key={comment.id} className="group transition-colors hover:bg-primary/[0.02]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {comment.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold">{comment.name}</p>
                          <p className="text-[10px] text-slate-400">{comment.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-medium italic underline decoration-primary/20 underline-offset-4">
                        {comment.articleTitle}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="line-clamp-2 text-sm italic leading-relaxed text-slate-600">
                        "{comment.comment}"
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <p className="text-[10px] font-bold text-slate-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-[10px] uppercase text-slate-400">
                        {new Date(comment.createdAt).toLocaleTimeString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded px-2 py-1 text-[10px] font-black uppercase tracking-tighter ${
                          comment.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-700'
                            : comment.status === 'spam'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        <span
                          className={`size-1 rounded-full ${
                            comment.status === 'approved'
                              ? 'bg-emerald-500'
                              : comment.status === 'spam'
                                ? 'bg-red-500'
                                : 'bg-orange-500'
                          }`}
                        />
                        {comment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {comment.status !== 'approved' ? (
                          <button
                            type="button"
                            title="Approve"
                            onClick={() => dispatch(approveComment(comment.id))}
                            className="rounded-lg p-1.5 text-emerald-600 transition-colors hover:bg-emerald-50"
                          >
                            <Icon name="check_circle" className="h-5 w-5" />
                          </button>
                        ) : null}

                        {comment.status !== 'spam' ? (
                          <button
                            type="button"
                            title="Mark as Spam"
                            onClick={() => dispatch(markCommentAsSpam(comment.id))}
                            className="rounded-lg p-1.5 text-orange-600 transition-colors hover:bg-orange-50"
                          >
                            <Icon name="block" className="h-5 w-5" />
                          </button>
                        ) : null}

                        {comment.status !== 'pending' ? (
                          <button
                            type="button"
                            title="Move to Pending"
                            onClick={() => dispatch(moveCommentToPending(comment.id))}
                            className="rounded-lg p-1.5 text-sky-600 transition-colors hover:bg-sky-50"
                          >
                            <Icon name="pending_actions" className="h-5 w-5" />
                          </button>
                        ) : null}

                        <button
                          type="button"
                          title="Delete"
                          onClick={() => dispatch(deleteComment(comment.id))}
                          className="rounded-lg p-1.5 text-primary transition-colors hover:bg-primary/10"
                        >
                          <Icon name="delete" className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-6">
        <div className="flex gap-4">
          <Icon name="gavel" className="h-5 w-5 text-primary" />
          <div>
            <h4 className="mb-1 text-sm font-bold uppercase tracking-wider text-primary">Moderator Guidelines</h4>
            <p className="text-xs italic leading-relaxed text-slate-600">
              Approve good comments, mark unwanted ones as spam, or remove comments that should not stay in the system.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminCommentsPage
