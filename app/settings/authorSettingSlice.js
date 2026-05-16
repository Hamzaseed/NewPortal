import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  API_BASE_URL,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '../../utils/api'

export const fetchAuthorSettings = createAsyncThunk(
  'authorSettings/fetchAuthorSettings',
  async (_, thunkAPI) => {
    try {
      const res = await getRequest('/api/author-settings', localStorage.getItem('auth_token') || '')

      return {
        author: {
          ...res.author,
          authorimage: res.author?.authorimage?.startsWith('/uploads/')
            ? `${API_BASE_URL}${res.author.authorimage}`
            : res.author?.authorimage || '',
          avatar: res.author?.authorimage?.startsWith('/uploads/')
            ? `${API_BASE_URL}${res.author.authorimage}`
            : res.author?.authorimage || '',
        },
        settings: {
          ...res.settings,
          authorimage: res.settings?.authorimage?.startsWith('/uploads/')
            ? `${API_BASE_URL}${res.settings.authorimage}`
            : res.settings?.authorimage || '',
          avatar: res.settings?.authorimage?.startsWith('/uploads/')
            ? `${API_BASE_URL}${res.settings.authorimage}`
            : res.settings?.authorimage || '',
        },
        socialLinks: res.social_links,
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const updateAuthorSettings = createAsyncThunk(
  'authorSettings/updateAuthorSettings',
  async (data, thunkAPI) => {
    try {
      if (data instanceof FormData) {
        const res = await fetch(`${API_BASE_URL}/api/author-settings`, {
          method: 'PUT',
          headers: {
            ...(localStorage.getItem('auth_token')
              ? { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
              : {}),
          },
          body: data,
        })

        const responseData = await res.json()

        if (!res.ok) {
          throw new Error(responseData?.message || 'Update author settings failed')
        }

        return {
          ...responseData.settings,
          authorimage: responseData.settings?.authorimage?.startsWith('/uploads/')
            ? `${API_BASE_URL}${responseData.settings.authorimage}`
            : responseData.settings?.authorimage || '',
          avatar: responseData.settings?.authorimage?.startsWith('/uploads/')
            ? `${API_BASE_URL}${responseData.settings.authorimage}`
            : responseData.settings?.authorimage || '',
        }
      }

      const res = await putRequest(
        '/api/author-settings',
        data,
        localStorage.getItem('auth_token') || ''
      )

      return {
        ...res.settings,
        authorimage: res.settings?.authorimage?.startsWith('/uploads/')
          ? `${API_BASE_URL}${res.settings.authorimage}`
          : res.settings?.authorimage || '',
        avatar: res.settings?.authorimage?.startsWith('/uploads/')
          ? `${API_BASE_URL}${res.settings.authorimage}`
          : res.settings?.authorimage || '',
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const addSocialLink = createAsyncThunk(
  'authorSettings/addSocialLink',
  async (data, thunkAPI) => {
    try {
      const res = await postRequest(
        '/api/author-settings/social-links',
        data,
        localStorage.getItem('auth_token') || ''
      )

      return res.social_link
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const updateSocialLink = createAsyncThunk(
  'authorSettings/updateSocialLink',
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await putRequest(
        `/api/author-settings/social-links/${id}`,
        data,
        localStorage.getItem('auth_token') || ''
      )

      return res.social_link
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const deleteSocialLink = createAsyncThunk(
  'authorSettings/deleteSocialLink',
  async (id, thunkAPI) => {
    try {
      await deleteRequest(
        `/api/author-settings/social-links/${id}`,
        localStorage.getItem('auth_token') || ''
      )

      return id
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

const authorSettingSlice = createSlice({
  name: 'authorSettings',
  initialState: {
    author: null,
    settings: {},
    socialLinks: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthorSettings.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAuthorSettings.fulfilled, (state, action) => {
        state.loading = false
        state.author = action.payload.author
        state.settings = action.payload.settings
        state.socialLinks = action.payload.socialLinks
      })
      .addCase(fetchAuthorSettings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateAuthorSettings.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateAuthorSettings.fulfilled, (state, action) => {
        state.loading = false
        state.settings = action.payload
      })
      .addCase(updateAuthorSettings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(addSocialLink.fulfilled, (state, action) => {
        state.socialLinks.push(action.payload)
      })
      .addCase(updateSocialLink.fulfilled, (state, action) => {
        const index = state.socialLinks.findIndex(
          (l) => l.id === action.payload.id
        )
        if (index !== -1) {
          state.socialLinks[index] = action.payload
        }
      })
      .addCase(deleteSocialLink.fulfilled, (state, action) => {
        state.socialLinks = state.socialLinks.filter(
          (l) => l.id !== action.payload
        )
      })
  },
})

export default authorSettingSlice.reducer
