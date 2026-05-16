import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getRequest } from '../../utils/api'

// ==============================
// 🔥 FETCH AUTHOR ANALYTICS
// ==============================
export const fetchAuthorAnalytics = createAsyncThunk(
  'authorAnalytics/fetchAuthorAnalytics',
  async (
    { range_days = 30, article_limit = 8 } = {},
    thunkAPI
  ) => {
    try {
      const res = await getRequest(
        `/api/author-analytics?range_days=${range_days}&article_limit=${article_limit}`,
        localStorage.getItem('auth_token') || ''
      )

      return res
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

// ==============================
// 🔥 SLICE
// ==============================
const authorAnalyticsSlice = createSlice({
  name: 'authorAnalytics',
  initialState: {
    period: {},
    averageReadingTime: {},
    retentionCurve: {},
    audienceLocations: [],
    deviceSplit: {},
    topReferrals: [],
    performanceRows: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ========================
      // FETCH
      // ========================
      .addCase(fetchAuthorAnalytics.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAuthorAnalytics.fulfilled, (state, action) => {
        state.loading = false

        state.period = action.payload.period
        state.averageReadingTime = action.payload.average_reading_time
        state.retentionCurve = action.payload.retention_curve
        state.audienceLocations = action.payload.audience_locations?.rows || []
        state.deviceSplit = action.payload.device_split
        state.topReferrals = action.payload.top_referrals
        state.performanceRows = action.payload.performance_rows
      })
      .addCase(fetchAuthorAnalytics.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default authorAnalyticsSlice.reducer
