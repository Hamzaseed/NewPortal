import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_BASE_URL, deleteRequest, getRequest, postRequest, putRequest } from '../../utils/api'

// ==============================
// 🔥 FETCH SETTINGS
// ==============================
export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  async (_, thunkAPI) => {
    try {
      const res = await getRequest('/api/settings')

      return {
        settings: res.settings,
        socialLinks: res.social_links,
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

// ==============================
// 🔥 UPDATE SETTINGS (branding)
// ==============================
export const updateSettings = createAsyncThunk(
  'settings/updateSettings',
  async (payload, thunkAPI) => {
    try {
      if (payload instanceof FormData) {
        const res = await fetch(`${API_BASE_URL}/api/settings`, {
          method: 'PUT',
          headers: {
            ...(localStorage.getItem('auth_token')
              ? { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
              : {}),
          },
          body: payload,
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data?.message || 'Update settings failed')
        }

        return data.settings
      }

      const res = await putRequest('/api/settings', payload, localStorage.getItem('auth_token') || '')
      return res.settings
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

// ==============================
// 🔥 ADD SOCIAL LINK
// ==============================
export const addSocialLink = createAsyncThunk(
  'settings/addSocialLink',
  async (payload, thunkAPI) => {
    try {
      const res = await postRequest('/api/settings/social-links', payload, localStorage.getItem('auth_token') || '')
      return res.social_link
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const updateSocialLink = createAsyncThunk(
  'settings/updateSocialLink',
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await putRequest(`/api/settings/social-links/${id}`, data, localStorage.getItem('auth_token') || '')
      return res.social_link
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

// ==============================
// 🔥 DELETE SOCIAL LINK
// ==============================
export const deleteSocialLink = createAsyncThunk(
  'settings/deleteSocialLink',
  async (id, thunkAPI) => {
    try {
      await deleteRequest(`/api/settings/social-links/${id}`, localStorage.getItem('auth_token') || '')
      return id
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

// ==============================
// 🔥 SLICE
// ==============================
const settingsSlice = createSlice({
  name: 'settings',

  initialState: {
    settings: {
      site_logo_url: '',
      favicon_url: '',
      article_page_logo_url: '',
      auth_login_image_url: '',
      auth_signup_image_url: '',
    },
    socialLinks: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ======================
      // FETCH
      // ======================
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false
        state.settings = action.payload.settings || state.settings
        state.socialLinks = action.payload.socialLinks || []
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // ======================
      // UPDATE SETTINGS
      // ======================
      .addCase(updateSettings.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.loading = false
        state.settings = action.payload
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // ======================
      // ADD SOCIAL LINK
      // ======================
      .addCase(addSocialLink.pending, (state) => {
        state.error = null
      })
      .addCase(addSocialLink.fulfilled, (state, action) => {
        state.socialLinks.push(action.payload)
      })
      .addCase(addSocialLink.rejected, (state, action) => {
        state.error = action.payload
      })

      // ======================
      // UPDATE SOCIAL LINK
      // ======================
      .addCase(updateSocialLink.pending, (state) => {
        state.error = null
      })
      .addCase(updateSocialLink.fulfilled, (state, action) => {
        state.socialLinks = state.socialLinks.map((item) =>
          item.id === action.payload.id ? action.payload : item
        )
      })
      .addCase(updateSocialLink.rejected, (state, action) => {
        state.error = action.payload
      })

      // ======================
      // DELETE SOCIAL LINK
      // ======================
      .addCase(deleteSocialLink.fulfilled, (state, action) => {
        state.socialLinks = state.socialLinks.filter(
          (item) => item.id !== action.payload
        )
      })
      .addCase(deleteSocialLink.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export default settingsSlice.reducer
