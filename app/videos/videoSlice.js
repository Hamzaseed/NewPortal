import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getRequest , postRequest , putRequest , deleteRequest } from '../../utils/api'

// ==============================
// 🔥 FETCH VIDEOS (PAGINATION)
// ==============================
export const fetchVideos = createAsyncThunk(
  'videos/fetchVideos',
  async ({ page = 1, limit = 10 } = {}, thunkAPI) => {
    try {
      const res = await getRequest(`/api/videos?page=${page}&limit=${limit}`)
      return res
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

// ==============================
// 🔥 FETCH SINGLE VIDEO (SLUG)
// ==============================
export const fetchVideoBySlug = createAsyncThunk(
  'videos/fetchVideoBySlug',
  async (slug, thunkAPI) => {
    try {
      const res = await getRequest(
        `/api/videos/${slug}`,
        localStorage.getItem('auth_token') || ''
      )
      return res.video || res
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

// ==============================
// 🔥 CREATE VIDEO
// ==============================
export const createVideo = createAsyncThunk(
  'videos/createVideo',
  async (data, thunkAPI) => {
    try {
      const res = await postRequest(
        '/api/videos',
        data,
        localStorage.getItem('auth_token') || ''
      )
      return res.video || res
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

// ==============================
// 🔥 UPDATE VIDEO
// ==============================
export const updateVideo = createAsyncThunk(
  'videos/updateVideo',
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await putRequest(
        `/api/videos/${id}`,
        data,
        localStorage.getItem('auth_token') || ''
      )
      return res.video || res
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

// ==============================
// 🔥 DELETE VIDEO
// ==============================
export const deleteVideo = createAsyncThunk(
  'videos/deleteVideo',
  async (id, thunkAPI) => {
    try {
      await deleteRequest(
        `/api/videos/${id}`,
        localStorage.getItem('auth_token') || ''
      )
      return id
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const likeVideo = createAsyncThunk(
  'videos/likeVideo',
  async (id, thunkAPI) => {
    try {
      const res = await postRequest(
        `/api/videos/${id}/like`,
        {},
        localStorage.getItem('auth_token') || ''
      )
      return {
        id,
        likes_count: Number(res.likes_count || 0),
        is_liked: Boolean(res.is_liked),
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const unlikeVideo = createAsyncThunk(
  'videos/unlikeVideo',
  async (id, thunkAPI) => {
    try {
      const res = await deleteRequest(
        `/api/videos/${id}/like`,
        localStorage.getItem('auth_token') || ''
      )
      return {
        id,
        likes_count: Number(res.likes_count || 0),
        is_liked: Boolean(res.is_liked),
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const saveVideo = createAsyncThunk(
  'videos/saveVideo',
  async (id, thunkAPI) => {
    try {
      const res = await postRequest(
        `/api/videos/${id}/save`,
        {},
        localStorage.getItem('auth_token') || ''
      )
      return {
        id,
        is_saved: Boolean(res.is_saved),
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const unsaveVideo = createAsyncThunk(
  'videos/unsaveVideo',
  async (id, thunkAPI) => {
    try {
      const res = await deleteRequest(
        `/api/videos/${id}/save`,
        localStorage.getItem('auth_token') || ''
      )
      return {
        id,
        is_saved: Boolean(res.is_saved),
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const fetchSavedVideos = createAsyncThunk(
  'videos/fetchSavedVideos',
  async (_, thunkAPI) => {
    try {
      const res = await getRequest(
        '/api/videos/saved',
        localStorage.getItem('auth_token') || ''
      )
      return Array.isArray(res.videos) ? res.videos : []
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

// ==============================
// 🔥 SLICE
// ==============================
const videoSlice = createSlice({
  name: 'videos',
  initialState: {
    videos: [],
    savedVideos: [],
    video: null,
    pagination: {
      page: 1,
      limit: 10,
      total_videos: 0,
      total_pages: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearVideo: (state) => {
      state.video = null
    },
  },

  extraReducers: (builder) => {
    builder

      // ========================
      // FETCH VIDEOS
      // ========================
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false
        const payload = action.payload || {}
        state.videos = Array.isArray(payload.videos)
          ? payload.videos
          : Array.isArray(payload)
            ? payload
            : []
        state.pagination = payload.pagination || {
          page: 1,
          limit: state.pagination.limit,
          total_videos: state.videos.length,
          total_pages: 1,
        }
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // ========================
      // FETCH SINGLE
      // ========================
      .addCase(fetchVideoBySlug.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchVideoBySlug.fulfilled, (state, action) => {
        state.loading = false
        state.video = action.payload
      })
      .addCase(fetchVideoBySlug.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // ========================
      // CREATE
      // ========================
      .addCase(createVideo.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createVideo.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload) {
          state.videos.unshift(action.payload)
          state.video = action.payload
        }
      })
      .addCase(createVideo.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // ========================
      // UPDATE
      // ========================
      .addCase(updateVideo.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateVideo.fulfilled, (state, action) => {
        state.loading = false
        if (!action.payload) {
          return
        }
        const index = state.videos.findIndex(
          (v) => v.id === action.payload.id
        )
        if (index !== -1) {
          state.videos[index] = action.payload
        }
        if (state.video?.id === action.payload.id) {
          state.video = action.payload
        }
      })
      .addCase(updateVideo.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // ========================
      // DELETE
      // ========================
      .addCase(deleteVideo.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.loading = false
        state.videos = state.videos.filter(
          (v) => v.id !== action.payload
        )
        if (state.video?.id === action.payload) {
          state.video = null
        }
      })
      .addCase(deleteVideo.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(likeVideo.pending, (state) => {
        state.error = null
      })
      .addCase(likeVideo.fulfilled, (state, action) => {
        const targetId = action.payload?.id
        const likesCount = Number(action.payload?.likes_count || 0)
        const isLiked = Boolean(action.payload?.is_liked)

        if (state.video?.id === targetId) {
          state.video.likes_count = likesCount
          state.video.is_liked = isLiked
        }

        state.videos = state.videos.map((item) => (
          item.id === targetId
            ? { ...item, likes_count: likesCount, is_liked: isLiked }
            : item
        ))
      })
      .addCase(likeVideo.rejected, (state, action) => {
        state.error = action.payload
      })

      .addCase(unlikeVideo.pending, (state) => {
        state.error = null
      })
      .addCase(unlikeVideo.fulfilled, (state, action) => {
        const targetId = action.payload?.id
        const likesCount = Number(action.payload?.likes_count || 0)
        const isLiked = Boolean(action.payload?.is_liked)

        if (state.video?.id === targetId) {
          state.video.likes_count = likesCount
          state.video.is_liked = isLiked
        }

        state.videos = state.videos.map((item) => (
          item.id === targetId
            ? { ...item, likes_count: likesCount, is_liked: isLiked }
            : item
        ))
      })
      .addCase(unlikeVideo.rejected, (state, action) => {
        state.error = action.payload
      })

      .addCase(saveVideo.pending, (state) => {
        state.error = null
      })
      .addCase(saveVideo.fulfilled, (state, action) => {
        const targetId = action.payload?.id
        const isSaved = Boolean(action.payload?.is_saved)

        if (state.video?.id === targetId) {
          state.video.is_saved = isSaved

          if (isSaved && !state.savedVideos.some((item) => item.id === targetId)) {
            state.savedVideos.unshift({ ...state.video, is_saved: true })
          }
        }

        state.videos = state.videos.map((item) => (
          item.id === targetId
            ? { ...item, is_saved: isSaved }
            : item
        ))
      })
      .addCase(saveVideo.rejected, (state, action) => {
        state.error = action.payload
      })

      .addCase(unsaveVideo.pending, (state) => {
        state.error = null
      })
      .addCase(unsaveVideo.fulfilled, (state, action) => {
        const targetId = action.payload?.id
        const isSaved = Boolean(action.payload?.is_saved)

        if (state.video?.id === targetId) {
          state.video.is_saved = isSaved
        }

        state.videos = state.videos.map((item) => (
          item.id === targetId
            ? { ...item, is_saved: isSaved }
            : item
        ))

        if (!isSaved) {
          state.savedVideos = state.savedVideos.filter((item) => item.id !== targetId)
        }
      })
      .addCase(unsaveVideo.rejected, (state, action) => {
        state.error = action.payload
      })

      .addCase(fetchSavedVideos.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSavedVideos.fulfilled, (state, action) => {
        state.loading = false
        state.savedVideos = Array.isArray(action.payload) ? action.payload : []
      })
      .addCase(fetchSavedVideos.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearVideo } = videoSlice.actions
export default videoSlice.reducer
