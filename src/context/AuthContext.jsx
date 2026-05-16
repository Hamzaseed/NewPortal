/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

const AUTH_USER_KEY = 'auth_user'
const AUTH_TOKEN_KEY = 'auth_token'

// 👉 Only base URL
const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(AUTH_USER_KEY)
    return stored ? JSON.parse(stored) : null
  })

  const [token, setToken] = useState(() => {
    return localStorage.getItem(AUTH_TOKEN_KEY) || ''
  })

  const [loading, setLoading] = useState(false)
  const [authors, setAuthors] = useState([])

  // LOGIN
  const login = async (email, password) => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Login failed')

      const userData = data.user || data
      setUser(userData)
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData))

      const tokenValue =
        data.token || data.accessToken || data.access_token || ''

      if (tokenValue) {
        setToken(tokenValue)
        localStorage.setItem(AUTH_TOKEN_KEY, tokenValue)
      }
    } finally {
      setLoading(false)
    }
  }

  // SIGNUP
  const signup = async (first_name, last_name, email, password, role = 'user') => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
          role,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Signup failed')

      const userData = data.user || data
      setUser(userData)
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData))

      const tokenValue =
        data.token || data.accessToken || data.access_token || ''

      if (tokenValue) {
        setToken(tokenValue)
        localStorage.setItem(AUTH_TOKEN_KEY, tokenValue)
      }
    } finally {
      setLoading(false)
    }
  }

  // REQUEST PASSWORD RESET
  const requestPasswordReset = async (email) => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Request failed')

      return data?.token || data?.resetToken || ''
    } finally {
      setLoading(false)
    }
  }

  // RESET PASSWORD
  const resetPassword = async (tokenValue, newPassword) => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: tokenValue,
          password: newPassword,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Reset failed')
    } finally {
      setLoading(false)
    }
  }

  // CHANGE PASSWORD
  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Change failed')
    } finally {
      setLoading(false)
    }
  }

  // CREATE AUTHOR (ADMIN ONLY)
  const createManagedAccount = async (
    first_name,
    last_name,
    email,
    password,
    role = 'author'
  ) => {
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/managed-accounts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
          role,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.message || 'Failed to create author')
      }

      if (data.user) {
        setAuthors((current) => [data.user, ...current])
      }

      return data.user
    } finally {
      setLoading(false)
    }
  }

  const getAuthors = async () => {
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/authors`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data?.message || 'Failed to fetch authors')

      setAuthors(data.authors || [])
      return data.authors || []
    } finally {
      setLoading(false)
    }
  }

  const deleteManagedAccount = async (id) => {
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/managed-accounts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data?.message || 'Failed to delete author')

      setAuthors((current) => current.filter((author) => author.id !== id))
    } finally {
      setLoading(false)
    }
  }

  // LOGOUT
  const logout = () => {
    setUser(null)
    setToken('')
    localStorage.removeItem(AUTH_USER_KEY)
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        logout,
        requestPasswordReset,
        resetPassword,
        changePassword,
        authors,
        createManagedAccount,
        getAuthors,
        deleteManagedAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
