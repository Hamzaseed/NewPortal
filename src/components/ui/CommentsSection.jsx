import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment } from '../../../app/comments/commentSlice'

function CommentsSection({
  title = 'Comments',
  submitLabel = 'Post comment',
  moderationNote = '',
  moderationLinkLabel = '',
  moderationLinkHref = '#',
  articleId = '',
  articleTitle = 'General',
}) {
  const dispatch = useDispatch()
  const comments = useSelector((state) => state.comments.comments)
  const [form, setForm] = useState({
    name: '',
    email: '',
    comment: '',
  })
  const [message, setMessage] = useState('')

  const approvedComments = comments.filter(
    (item) => item.articleId === articleId && item.status === 'approved'
  )

  function handleChange(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function handleSubmit() {
    const hasRequiredFields = form.name.trim() && form.email.trim() && form.comment.trim()

    if (!hasRequiredFields) {
      setMessage('Please fill all fields.')
      return
    }

    dispatch(
      addComment({
        name: form.name,
        email: form.email,
        comment: form.comment,
        articleId,
        articleTitle,
      })
    )

    setForm({
      name: '',
      email: '',
      comment: '',
    })

    setMessage('Comment submitted.')
  }

  return (
    <section className="mt-12 border-b border-slate-200 pb-6">
      <div className="mb-6">
        <p className="text-lg uppercase tracking-[0.18em] text-slate-500">{title}</p>
        <div className="mt-3 h-[3px] w-full bg-slate-900" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <input
          type="text"
          value={form.name}
          onChange={(event) => handleChange('name', event.target.value)}
          placeholder="Name (required)"
          className="h-12 border border-slate-300 bg-white px-4 text-[17px] text-slate-700 shadow-[0_2px_8px_rgba(15,23,42,0.12)] outline-none transition focus:border-slate-900"
        />
        <input
          type="email"
          value={form.email}
          onChange={(event) => handleChange('email', event.target.value)}
          placeholder="Email (required)"
          className="h-12 border border-slate-300 bg-white px-4 text-[17px] text-slate-700 shadow-[0_2px_8px_rgba(15,23,42,0.12)] outline-none transition focus:border-slate-900"
        />
      </div>

      <textarea
        value={form.comment}
        onChange={(event) => handleChange('comment', event.target.value)}
        placeholder="Write your comment here"
        className="mt-6 min-h-[180px] w-full resize-y border border-slate-300 bg-white px-4 py-3 text-[17px] text-slate-700 shadow-[0_2px_8px_rgba(15,23,42,0.12)] outline-none transition focus:border-slate-900"
      />

      <button
        type="button"
        onClick={handleSubmit}
        className="mt-6 w-full bg-[#242424] px-6 py-3 text-xl font-bold text-white transition hover:bg-black"
      >
        {submitLabel}
      </button>

      {message ? (
        <p className="mt-4 text-sm font-medium text-primary">{message}</p>
      ) : null}

      {(moderationNote || moderationLinkLabel) ? (
        <p className="mx-auto mt-5 max-w-3xl text-center text-[17px] leading-8 text-slate-900">
          {moderationNote ? <>{moderationNote} </> : null}
          {moderationLinkLabel ? (
            <a href={moderationLinkHref} className="italic underline underline-offset-4">
              {moderationLinkLabel}
            </a>
          ) : null}
        </p>
      ) : null}

      {approvedComments.length > 0 ? (
        <div className="mt-10 space-y-4">
          <p className="text-lg font-bold text-slate-900">Comments</p>

          {approvedComments.map((item) => (
            <div key={item.id} className="border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-bold text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-500">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
              <p className="mt-2 text-sm leading-7 text-slate-700">{item.comment}</p>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default CommentsSection
