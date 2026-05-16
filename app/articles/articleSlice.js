import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getRequest, postRequest, putRequest, deleteRequest } from '../../utils/api'

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ page = 1, limit = 10 } = {}, thunkAPI) => {
    try {
      const res = await getRequest(
        `/api/articles?page=${page}&limit=${limit}`,
        localStorage.getItem('auth_token') || ''
      )

      return {
        articles: res.articles,
        pagination: res.pagination,
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const fetchArticleById = createAsyncThunk(
  'articles/fetchArticleById',
  async (id, thunkAPI) => {
    try {
      const res = await getRequest(
        `/api/articles/id/${id}`,
        localStorage.getItem('auth_token') || ''
      )
      return res.article
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const fetchArticleBySlug = createAsyncThunk(
  'articles/fetchArticleBySlug',
  async (slug, thunkAPI) => {
    try {
      const res = await getRequest(
        `/api/articles/${slug}`,
        localStorage.getItem('auth_token') || ''
      )
      return res.article
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const likeArticle = createAsyncThunk(
  'articles/likeArticle',
  async (id, thunkAPI) => {
    try {
      const res = await postRequest(
        `/api/articles/${id}/like`,
        {},
        localStorage.getItem('auth_token') || ''
      )

      return {
        id,
        likes_count: res.likes_count ?? res.article?.likes_count ?? 0,
        is_liked: res.is_liked ?? res.article?.is_liked ?? true,
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const unlikeArticle = createAsyncThunk(
  'articles/unlikeArticle',
  async (id, thunkAPI) => {
    try {
      const res = await deleteRequest(
        `/api/articles/${id}/like`,
        localStorage.getItem('auth_token') || ''
      )

      return {
        id,
        likes_count: res.likes_count ?? res.article?.likes_count ?? 0,
        is_liked: res.is_liked ?? res.article?.is_liked ?? false,
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const saveArticle = createAsyncThunk(
  'articles/saveArticle',
  async (id, thunkAPI) => {
    try {
      const res = await postRequest(
        `/api/articles/${id}/save`,
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

export const unsaveArticle = createAsyncThunk(
  'articles/unsaveArticle',
  async (id, thunkAPI) => {
    try {
      const res = await deleteRequest(
        `/api/articles/${id}/save`,
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

export const fetchSavedArticles = createAsyncThunk(
  'articles/fetchSavedArticles',
  async (_, thunkAPI) => {
    try {
      const res = await getRequest(
        '/api/articles/saved',
        localStorage.getItem('auth_token') || ''
      )

      return Array.isArray(res.articles) ? res.articles : []
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async (data, thunkAPI) => {
    try {
      const res = await postRequest(
        '/api/articles',
        data,
        localStorage.getItem('auth_token') || ''
      )
      return res.article
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const updateArticle = createAsyncThunk(
  'articles/updateArticle',
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await putRequest(
        `/api/articles/${id}`,
        data,
        localStorage.getItem('auth_token') || ''
      )
      return res.article
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async (id, thunkAPI) => {
    try {
      await deleteRequest(
        `/api/articles/${id}`,
        localStorage.getItem('auth_token') || ''
      )
      return id
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    savedArticles: [],
    article: null,
    contentBlocks: [],
    pagination: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearArticle: (state) => {
      state.article = null
      state.contentBlocks = []
    },
    setContentBlocks: (state, action) => {
      state.contentBlocks = action.payload
    },
    saveArticleLocally: (state, action) => {
      const existingArticleIndex = state.articles.findIndex(
        (article) => article.slug === action.payload.slug
      )

      if (existingArticleIndex === -1) {
        state.articles.unshift(action.payload)
      } else {
        state.articles[existingArticleIndex] = action.payload
      }

      state.article = action.payload
      state.contentBlocks = Array.isArray(action.payload?.content_blocks)
        ? action.payload.content_blocks
        : Array.isArray(action.payload?.contentBlocks)
          ? action.payload.contentBlocks
          : []
    },
    deleteArticleLocally: (state, action) => {
      state.articles = state.articles.filter((article) => article.slug !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false
        state.articles = action.payload.articles
        state.pagination = action.payload.pagination
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchArticleById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.loading = false
        state.article = action.payload
        state.contentBlocks = Array.isArray(action.payload?.content_blocks)
          ? action.payload.content_blocks
          : Array.isArray(action.payload?.contentBlocks)
            ? action.payload.contentBlocks
            : []
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchArticleBySlug.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchArticleBySlug.fulfilled, (state, action) => {
        state.loading = false
        state.article = action.payload
        state.contentBlocks = Array.isArray(action.payload?.content_blocks)
          ? action.payload.content_blocks
          : Array.isArray(action.payload?.contentBlocks)
            ? action.payload.contentBlocks
            : []
      })
      .addCase(fetchArticleBySlug.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(likeArticle.pending, (state) => {
        state.error = null
      })
      .addCase(likeArticle.fulfilled, (state, action) => {
        if (state.article && state.article.id === action.payload.id) {
          state.article.likes_count = action.payload.likes_count
          state.article.is_liked = action.payload.is_liked
        }

        const index = state.articles.findIndex((article) => article.id === action.payload.id)

        if (index !== -1) {
          state.articles[index].likes_count = action.payload.likes_count
          state.articles[index].is_liked = action.payload.is_liked
        }
      })
      .addCase(likeArticle.rejected, (state, action) => {
        state.error = action.payload
      })

      .addCase(unlikeArticle.pending, (state) => {
        state.error = null
      })
      .addCase(unlikeArticle.fulfilled, (state, action) => {
        if (state.article && state.article.id === action.payload.id) {
          state.article.likes_count = action.payload.likes_count
          state.article.is_liked = action.payload.is_liked
        }

        const index = state.articles.findIndex((article) => article.id === action.payload.id)

        if (index !== -1) {
          state.articles[index].likes_count = action.payload.likes_count
          state.articles[index].is_liked = action.payload.is_liked
        }
      })
      .addCase(unlikeArticle.rejected, (state, action) => {
        state.error = action.payload
      })

      .addCase(saveArticle.pending, (state) => {
        state.error = null
      })
      .addCase(saveArticle.fulfilled, (state, action) => {
        const targetId = action.payload?.id
        const isSaved = Boolean(action.payload?.is_saved)

        if (state.article?.id === targetId) {
          state.article.is_saved = isSaved

          if (isSaved && !state.savedArticles.some((item) => item.id === targetId)) {
            state.savedArticles.unshift({ ...state.article, is_saved: true })
          }
        }

        state.articles = state.articles.map((item) => (
          item.id === targetId
            ? { ...item, is_saved: isSaved }
            : item
        ))
      })
      .addCase(saveArticle.rejected, (state, action) => {
        state.error = action.payload
      })

      .addCase(unsaveArticle.pending, (state) => {
        state.error = null
      })
      .addCase(unsaveArticle.fulfilled, (state, action) => {
        const targetId = action.payload?.id
        const isSaved = Boolean(action.payload?.is_saved)

        if (state.article?.id === targetId) {
          state.article.is_saved = isSaved
        }

        state.articles = state.articles.map((item) => (
          item.id === targetId
            ? { ...item, is_saved: isSaved }
            : item
        ))

        if (!isSaved) {
          state.savedArticles = state.savedArticles.filter((item) => item.id !== targetId)
        }
      })
      .addCase(unsaveArticle.rejected, (state, action) => {
        state.error = action.payload
      })

      .addCase(fetchSavedArticles.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSavedArticles.fulfilled, (state, action) => {
        state.loading = false
        state.savedArticles = Array.isArray(action.payload) ? action.payload : []
      })
      .addCase(fetchSavedArticles.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(createArticle.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.loading = false
        state.articles.unshift(action.payload)
        state.article = action.payload
        state.contentBlocks = Array.isArray(action.payload?.content_blocks)
          ? action.payload.content_blocks
          : Array.isArray(action.payload?.contentBlocks)
            ? action.payload.contentBlocks
            : []
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateArticle.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.loading = false

        const index = state.articles.findIndex((article) => article.id === action.payload.id)

        if (index !== -1) {
          state.articles[index] = action.payload
        }

        state.article = action.payload
        state.contentBlocks = Array.isArray(action.payload?.content_blocks)
          ? action.payload.content_blocks
          : Array.isArray(action.payload?.contentBlocks)
            ? action.payload.contentBlocks
            : []
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(deleteArticle.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.loading = false
        state.articles = state.articles.filter((article) => article.id !== action.payload)

        if (state.article && state.article.id === action.payload) {
          state.article = null
          state.contentBlocks = []
        }
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const {
  clearArticle,
  setContentBlocks,
  saveArticleLocally,
  deleteArticleLocally,
} = articleSlice.actions

export default articleSlice.reducer
