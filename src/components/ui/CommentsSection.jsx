import { useMemo, useState } from 'react'
import { ThumbsDown, ThumbsUp } from 'lucide-react'

function CommentAvatar({ comment }) {
  if (comment.avatar) {
    return (
      <div className="size-10 shrink-0 overflow-hidden rounded-full">
        <img src={comment.avatar} alt={comment.name} className="h-full w-full object-cover" />
      </div>
    )
  }

  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/20 font-bold text-primary">
      {comment.initials || comment.name?.charAt(0) || 'U'}
    </div>
  )
}

function getCommentId(comment, index, parentId = 'root') {
  return comment.id || `${parentId}-${comment.name || 'user'}-${comment.time || 'now'}-${index}`
}

function countComments(items) {
  return items.reduce((total, comment) => total + 1 + countComments(comment.replies || []), 0)
}

function CommentItem({ comment, onReply, parentId = null, depth = 0 }) {
  const replies = comment.replies || []

  return (
    <div className={`${depth > 0 ? 'mt-6 border-l border-primary/10 pl-6' : ''}`}>
      <div className="flex gap-4">
        <CommentAvatar comment={comment} />
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2">
            <span className="font-bold">{comment.name}</span>
            <span className="text-xs text-slate-500">{comment.time}</span>
          </div>
          <p className="mb-3 text-sm leading-relaxed text-slate-700">{comment.text}</p>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
            <button type="button" className="flex items-center gap-1 hover:text-primary">
              <ThumbsUp className="h-4 w-4" />
              {comment.likes ?? 0}
            </button>
            <button type="button" className="flex items-center gap-1 hover:text-primary">
              <ThumbsDown className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => onReply(comment, parentId)} className="hover:text-primary">
              REPLY
            </button>
          </div>
        </div>
      </div>

      {replies.length > 0 ? (
        <div className="space-y-6">
          {replies.map((reply, index) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              parentId={comment.id}
              depth={depth + 1}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

function CommentsSection({
  title = 'Comments',
  count = 0,
  sortLabel = 'Sort by: Top',
  composerInitial = 'U',
  composerPlaceholder = 'Join the discussion...',
  submitLabel = 'Post Comment',
  loadMoreLabel = 'Load More Comments',
  comments = [],
}) {
  const [commentList, setCommentList] = useState(() =>
    comments.map((comment, index) => ({
      ...comment,
      id: getCommentId(comment, index),
      replies: (comment.replies || []).map((reply, replyIndex) => ({
        ...reply,
        id: getCommentId(reply, replyIndex, getCommentId(comment, index)),
      })),
    })),
  )
  const [draft, setDraft] = useState('')
  const [replyTarget, setReplyTarget] = useState(null)

  const totalComments = useMemo(
    () => (count > 0 ? count : countComments(commentList)),
    [commentList, count],
  )

  function insertReply(items, targetId, reply) {
    return items.map((item) => {
      if (item.id === targetId) {
        return {
          ...item,
          replies: [...(item.replies || []), reply],
        }
      }

      if (!item.replies?.length) {
        return item
      }

      return {
        ...item,
        replies: insertReply(item.replies, targetId, reply),
      }
    })
  }

  function handleReply(comment) {
    setReplyTarget({
      id: comment.id,
      name: comment.name,
    })
    setDraft(`@${comment.name} `)
  }

  function handleSubmit() {
    const trimmedDraft = draft.trim()

    if (!trimmedDraft) {
      return
    }

    const newComment = {
      id: `comment-${Date.now()}`,
      initials: composerInitial,
      name: 'You',
      time: 'Just now',
      text: trimmedDraft,
      likes: 0,
      replies: [],
    }

    setCommentList((currentComments) => {
      if (!replyTarget) {
        return [newComment, ...currentComments]
      }

      return insertReply(currentComments, replyTarget.id, newComment)
    })
    setDraft('')
    setReplyTarget(null)
  }

  return (
    <section className="mt-12">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-2xl font-bold">{title} ({totalComments})</h3>
        <div className="text-sm font-bold text-slate-500">{sortLabel}</div>
      </div>

      <div className="mb-10 flex gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
          {composerInitial}
        </div>
        <div className="flex-1">
          {replyTarget ? (
            <div className="mb-3 flex items-center justify-between rounded-lg border border-primary/15 bg-primary/5 px-3 py-2 text-xs font-medium text-slate-600">
              <span>Replying to {replyTarget.name}</span>
              <button type="button" onClick={() => { setReplyTarget(null); setDraft('') }} className="font-bold uppercase tracking-wide text-primary">
                Cancel
              </button>
            </div>
          ) : null}
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className="min-h-[100px] w-full rounded-lg border border-primary/20 bg-transparent p-3 text-sm focus:border-primary focus:outline-none"
            placeholder={replyTarget ? `Reply to ${replyTarget.name}...` : composerPlaceholder}
          />
          <div className="mt-2 flex justify-end">
            <button type="button" onClick={handleSubmit} className="rounded bg-primary px-6 py-2 text-sm font-bold uppercase tracking-wide text-white hover:brightness-110">
              {submitLabel}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {commentList.map((comment) => (
          <CommentItem key={comment.id} comment={comment} onReply={handleReply} />
        ))}
      </div>

      <button type="button" className="mt-8 w-full rounded-lg bg-slate-200 py-3 font-bold transition-colors hover:bg-slate-300">
        {loadMoreLabel}
      </button>
    </section>
  )
}

export default CommentsSection
