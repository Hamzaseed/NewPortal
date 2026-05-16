import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postRequest } from '../../utils/api'

export const trackAnalyticsEvent = createAsyncThunk(
  'analyticsEvents/trackAnalyticsEvent',
  async (
    {
      event_type = '',
      session_id = '',
      article_id = null,
      article_slug = '',
      category_slug = '',
      video_slug = '',
      path = '',
      device_type = '',
      referrer = '',
      engaged_seconds = 0,
    } = {},
    thunkAPI
  ) => {
    try {
      const storedUser = localStorage.getItem('auth_user')

      if (storedUser) {
        try {
          const user = JSON.parse(storedUser)
          const role = String(user?.role || '').trim().toLowerCase()

          if (role === 'admin' || role === 'super_admin' || role === 'administrator') {
            return { event: null, skipped: true }
          }
        } catch {
          // Ignore malformed local auth data and let the backend decide.
        }
      }

      const res = await postRequest(
        '/api/analytics-events',
        {
          event_type,
          session_id,
          article_id,
          article_slug,
          category_slug,
          video_slug,
          path,
          device_type,
          referrer,
          engaged_seconds,
        },
        localStorage.getItem('auth_token') || ''
      )

      return res
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

const analyticsEventsSlice = createSlice({
  name: 'analyticsEvents',
  initialState: {
    event: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearAnalyticsEventState: (state) => {
      state.event = null
      state.loading = false
      state.error = null
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(trackAnalyticsEvent.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(trackAnalyticsEvent.fulfilled, (state, action) => {
        state.loading = false
        state.event = action.payload.event
        state.success = true
      })
      .addCase(trackAnalyticsEvent.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.success = false
      })
  },
})

export const { clearAnalyticsEventState } = analyticsEventsSlice.actions

export default analyticsEventsSlice.reducer
