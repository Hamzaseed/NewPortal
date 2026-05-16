import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { deleteRequest, getRequest, patchRequest, postRequest, putRequest } from '../../utils/api'

// ==============================
// 🔥 FETCH ADMIN CATEGORIES
// ==============================
export const fetchAdminCategories = createAsyncThunk(
  'categories/fetchAdmin',
  async ({ search = '', page = 1, limit = 10 } = {}, thunkAPI) => {
    try {
      const res = await getRequest(
        `/api/categories/admin?search=${search}&page=${page}&limit=${limit}`,
        localStorage.getItem('auth_token') || ''
      )

      return {
        categories: res.categories,
        stats: res.stats,
        pagination: res.pagination,
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const fetchPublicCategories = createAsyncThunk(
  'categories/fetchPublic',
  async (_, thunkAPI) => {
    try {
      const res = await getRequest('/api/categories')
      return Array.isArray(res) ? res : res.categories || []
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

// ==============================
// 🔥 CREATE CATEGORY
// ==============================
export const createCategory = createAsyncThunk(
  'categories/create',
  async (payload, thunkAPI) => {
    try {
      const res = await postRequest('/api/categories', payload, localStorage.getItem('auth_token') || '')
      return res.category
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

// ==============================
// 🔥 UPDATE CATEGORY
// ==============================
export const updateCategory = createAsyncThunk(
  'categories/update',
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await putRequest(`/api/categories/${id}`, data, localStorage.getItem('auth_token') || '')
      return res.category
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

// ==============================
// 🔥 DELETE CATEGORY
// ==============================
export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async (id, thunkAPI) => {
    try {
      await deleteRequest(`/api/categories/${id}`, localStorage.getItem('auth_token') || '')
      return id
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

// ==============================
// 🔥 TOGGLE STATUS
// ==============================
export const toggleCategoryStatus = createAsyncThunk(
  'categories/toggleStatus',
  async (id, thunkAPI) => {
    try {
      const res = await patchRequest(`/api/categories/${id}/toggle-status`, {}, localStorage.getItem('auth_token') || '')
      return res.category
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

// ==============================
// 🔥 SLICE
// ==============================
const categoriesSlice = createSlice({
  name: 'categories',

  initialState: {
    categories: [],
    stats: {},
    pagination: {},
    loading: false,
    error: null,
  },

  reducers: {}, // ❌ no local state

  extraReducers: (builder) => {
    builder

      // ======================
      // FETCH
      // ======================
      .addCase(fetchAdminCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAdminCategories.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload.categories
        state.stats = action.payload.stats
        state.pagination = action.payload.pagination
      })
      .addCase(fetchAdminCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchPublicCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPublicCategories.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload
      })
      .addCase(fetchPublicCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // ======================
      // CREATE
      // ======================
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload)
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.error = action.payload
      })

      // ======================
      // UPDATE
      // ======================
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (c) => c.id === action.payload.id
        )
        if (index !== -1) {
          state.categories[index] = action.payload
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.payload
      })

      // ======================
      // DELETE
      // ======================
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (c) => c.id !== action.payload
        )
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.payload
      })

      // ======================
      // TOGGLE STATUS
      // ======================
      .addCase(toggleCategoryStatus.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (c) => c.id === action.payload.id
        )
        if (index !== -1) {
          state.categories[index] = action.payload
        }
      })
      .addCase(toggleCategoryStatus.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export default categoriesSlice.reducer
