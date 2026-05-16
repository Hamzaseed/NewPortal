import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getRequest } from '../../utils/api'

export const fetchAdminDashboard = createAsyncThunk(
  'adminDashboard/fetchAdminDashboard',
  async ({ recent_limit = 5, category_limit = 5, traffic_days = 7 } = {}, thunkAPI) => {
    try {
      const res = await getRequest(
        `/api/admin-dashboard?recent_limit=${recent_limit}&category_limit=${category_limit}&traffic_days=${traffic_days}`,
        localStorage.getItem('auth_token') || '' 
      )

      return res
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

const adminDashboardSlice = createSlice({
  name: 'adminDashboard',
  initialState: {
    stats: [],
    summary: {},
    recentArticles: [],
    trafficOverview: [],
    topCategories: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.loading = false
        state.stats = action.payload.stats
        state.summary = action.payload.summary
        state.recentArticles = action.payload.recent_articles
        state.trafficOverview = action.payload.traffic_overview
        state.topCategories = action.payload.top_categories
      })
      .addCase(fetchAdminDashboard.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default adminDashboardSlice.reducer
