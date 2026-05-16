export const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

// 👉 GET REQUEST
export const getRequest = async (endpoint, token = '') => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
   headers: {
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
}
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data?.message || 'GET request failed')
    }

    return data
  } catch (error) {
    throw error
  }
}

// 👉 POST REQUEST
export const postRequest = async (endpoint, body = {}, token = '') => {
  try {
    const isFormData = body instanceof FormData
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: isFormData ? body : JSON.stringify(body),
    })

    const contentType = res.headers.get('content-type') || ''
    let data = {}
    let responseText = ''

    if (contentType.includes('application/json')) {
      data = await res.json()
    } else {
      responseText = await res.text()
    }

    if (!res.ok) {
      throw new Error(data?.message || responseText || `POST request failed (${res.status})`)
    }

    return data
  } catch (error) {
    throw error
  }
}

export const putRequest = async (endpoint, body = {}, token = '') => {
  try {
    const isFormData = body instanceof FormData
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: isFormData ? body : JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data?.message || 'PUT request failed')
    }

    return data
  } catch (error) {
    throw error
  }
}

export const patchRequest = async (endpoint, body = {}, token = '') => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data?.message || 'PATCH request failed')
    }

    return data
  } catch (error) {
    throw error
  }
}

export const deleteRequest = async (endpoint, token = '') => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
     headers: {
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
},
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      throw new Error(data?.message || 'DELETE request failed')
    }

    return data
  } catch (error) {
    throw error
  }
}
