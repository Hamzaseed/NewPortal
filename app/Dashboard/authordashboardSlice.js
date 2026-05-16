import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getRequest } from '../../utils/api'

export const fetchAuthorDashboard = createAsyncThunk(
  'authorDashboard/fetchAuthorDashboard',
  async ({ range_days = 30, trend_days = 7, recent_limit = 3, feedback_limit = 5 } = {}, thunkAPI) => {
    try {
      const res = await getRequest(
        `/api/author-dashboard?range_days=${range_days}&trend_days=${trend_days}&recent_limit=${recent_limit}&feedback_limit=${feedback_limit}`,
        localStorage.getItem('auth_token') || ''
      )

      return res
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

const authorDashboardSlice = createSlice({
  name: 'authorDashboard',
  initialState: {
    stats: [],
    topStory: null,
    quickFocus: [],
    recentArticles: [],
    recentFeedback: [],
    trafficOverview: [],
    greeting: '',
    description: '',
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthorDashboard.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAuthorDashboard.fulfilled, (state, action) => {
        state.loading = false
        state.stats = action.payload.stats || []
        state.topStory = action.payload.top_story || null
        state.quickFocus = action.payload.quick_focus || []
        state.recentArticles = action.payload.recent_articles || []
        state.recentFeedback = action.payload.recent_feedback || []
        state.trafficOverview = action.payload.traffic_overview || []
        state.greeting = action.payload.greeting || ''
        state.description = action.payload.description || ''
      })
      .addCase(fetchAuthorDashboard.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default authorDashboardSlice.reducer
