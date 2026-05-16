import { createSlice } from '@reduxjs/toolkit'

const savedComments =
  typeof window !== 'undefined' && localStorage.getItem('comments')
    ? JSON.parse(localStorage.getItem('comments'))
    : []

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: savedComments,
  },
  reducers: {
    addComment: (state, action) => {
      const newComment = {
        id: Date.now(),
        name: action.payload.name,
        email: action.payload.email,
        comment: action.payload.comment,
        articleId: action.payload.articleId,
        articleTitle: action.payload.articleTitle,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }

      state.comments.unshift(newComment)

      if (typeof window !== 'undefined') {
        localStorage.setItem('comments', JSON.stringify(state.comments))
      }
    },
    approveComment: (state, action) => {
      const comment = state.comments.find((item) => item.id === action.payload)

      if (comment) {
        comment.status = 'approved'
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('comments', JSON.stringify(state.comments))
      }
    },
    markCommentAsSpam: (state, action) => {
      const comment = state.comments.find((item) => item.id === action.payload)

      if (comment) {
        comment.status = 'spam'
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('comments', JSON.stringify(state.comments))
      }
    },
    moveCommentToPending: (state, action) => {
      const comment = state.comments.find((item) => item.id === action.payload)

      if (comment) {
        comment.status = 'pending'
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('comments', JSON.stringify(state.comments))
      }
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter((item) => item.id !== action.payload)

      if (typeof window !== 'undefined') {
        localStorage.setItem('comments', JSON.stringify(state.comments))
      }
    },
  },
})

export const {
  addComment,
  approveComment,
  markCommentAsSpam,
  moveCommentToPending,
  deleteComment,
} = commentSlice.actions

export default commentSlice.reducer
