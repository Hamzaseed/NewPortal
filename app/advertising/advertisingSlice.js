import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getRequest, putRequest } from '../../utils/api'

// ==============================
// 🔥 GET PUBLIC ADS
// ==============================
export const fetchPublicAds = createAsyncThunk(
  'advertising/fetchPublicAds',
  async (_, thunkAPI) => {
    try {
      const res = await getRequest('/api/advertising')
      return res.placements
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

// ==============================
// 🔥 GET ADMIN ADS
// ==============================
export const fetchAdminAds = createAsyncThunk(
  'advertising/fetchAdminAds',
  async (token, thunkAPI) => {
    try {
      const res = await getRequest('/api/advertising/admin', token)
      return res.placements
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

// ==============================
// 🔥 UPDATE AD
// ==============================
export const updateAd = createAsyncThunk(
  'advertising/updateAd',
  async ({ id, payload, token }, thunkAPI) => {
    try {
      const res = await putRequest(`/api/advertising/${id}`, payload, token)
      return res.placement
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

// ==============================
// 🔥 SLICE
// ==============================
const advertisingSlice = createSlice({
  name: 'advertising',
  initialState: {
    publicAds: [],
    adminAds: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ==========================
      // PUBLIC ADS
      // ==========================
      .addCase(fetchPublicAds.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPublicAds.fulfilled, (state, action) => {
        state.loading = false
        state.publicAds = action.payload
      })
      .addCase(fetchPublicAds.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // ==========================
      // ADMIN ADS
      // ==========================
      .addCase(fetchAdminAds.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAdminAds.fulfilled, (state, action) => {
        state.loading = false
        state.adminAds = action.payload
      })
      .addCase(fetchAdminAds.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // ==========================
      // UPDATE AD
      // ==========================
      .addCase(updateAd.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateAd.fulfilled, (state, action) => {
        state.loading = false

        state.adminAds = state.adminAds.map((ad) =>
          ad.id === action.payload.id ? action.payload : ad
        )

        state.publicAds = state.publicAds.map((ad) =>
          ad.id === action.payload.id ? action.payload : ad
        )
      })
      .addCase(updateAd.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default advertisingSlice.reducer
