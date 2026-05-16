import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getRequest } from '../../utils/api'


export const fetchAdminAnalytics = createAsyncThunk(
  'adminAnalytics/fetchAdminAnalytics',
  async (
    { category_limit = 5, article_limit = 10, traffic_days = 7 } = {},
    thunkAPI
  ) => {
    try {
      const res = await getRequest(
        `/api/admin-analytics?category_limit=${category_limit}&article_limit=${article_limit}&traffic_days=${traffic_days}`,
        localStorage.getItem('auth_token') || ''
     
      )

      return res
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)


const adminAnalyticsSlice = createSlice({
  name: 'adminAnalytics',
  initialState: {
    overviewCards: [],
    trafficTrends: [],
    deviceSplit: {},
    topCategories: [],
    topArticles: [],
    period: {},
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ========================
      // FETCH
      // ========================
      .addCase(fetchAdminAnalytics.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAdminAnalytics.fulfilled, (state, action) => {
        state.loading = false

        state.overviewCards = action.payload.overview_cards
        state.trafficTrends = action.payload.traffic_trends
        state.deviceSplit = action.payload.device_split
        state.topCategories = action.payload.top_categories
        state.topArticles = action.payload.top_articles
        state.period = action.payload.period
      })
      .addCase(fetchAdminAnalytics.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default adminAnalyticsSlice.reducer
