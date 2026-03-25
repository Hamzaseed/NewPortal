import { createContext, useContext, useEffect, useState } from 'react'

const AUTH_USER_KEY = 'user'
const AUTH_ACCOUNTS_KEY = 'accounts'
const AUTH_RESET_TOKENS_KEY = 'password_reset_tokens'

const defaultAccounts = [
  {
    id: '1',
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: '2',
    first_name: 'Normal',
    last_name: 'User',
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
  },
  {
    id: '3',
    first_name: 'Author',
    last_name: 'User',
    email: 'author@example.com',
    password: 'author123',
    role: 'author',
  },
]

const AuthContext = createContext()

const getAccounts = () => {
  const stored = localStorage.getItem(AUTH_ACCOUNTS_KEY)
  if (stored) return JSON.parse(stored)

  localStorage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify(defaultAccounts))
  return defaultAccounts
}

const setAccounts = (accounts) => {
  localStorage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify(accounts))
}

const getResetTokens = () => {
  const stored = localStorage.getItem(AUTH_RESET_TOKENS_KEY)
  return stored ? JSON.parse(stored) : []
}

const setResetTokens = (tokens) => {
  localStorage.setItem(AUTH_RESET_TOKENS_KEY, JSON.stringify(tokens))
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_USER_KEY)
    if (storedUser) setUser(JSON.parse(storedUser))

    getAccounts()
    setLoading(false)
  }, [])

  const login = (email, password) => {
    const accounts = getAccounts()

    const account = accounts.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    )

    if (!account) throw new Error('Invalid credentials')

    const loggedUser = { ...account }
    delete loggedUser.password

    setUser(loggedUser)
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(loggedUser))
  }

  const signup = (first_name, last_name, email, password, role = 'user') => {
    const accounts = getAccounts()

    if (accounts.find((u) => u.email === email)) {
      throw new Error('User already exists')
    }

    const newUser = {
      id: Date.now().toString(),
      first_name,
      last_name,
      email: email.toLowerCase(),
      password,
      role, // 👈 supports 'author'
    }

    setAccounts([...accounts, newUser])

    const loggedUser = { ...newUser }
    delete loggedUser.password

    setUser(loggedUser)
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(loggedUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(AUTH_USER_KEY)
  }

  const requestPasswordReset = (email) => {
    const normalizedEmail = email.trim().toLowerCase()
    const accounts = getAccounts()
    const account = accounts.find((item) => item.email.toLowerCase() === normalizedEmail)

    if (!account) {
      return ''
    }

    const token = `reset-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
    const resetTokens = getResetTokens()

    setResetTokens([
      ...resetTokens.filter((item) => item.email !== normalizedEmail),
      {
        token,
        email: normalizedEmail,
        createdAt: Date.now(),
      },
    ])

    return token
  }

  const resetPassword = (token, newPassword) => {
    const resetTokens = getResetTokens()
    const tokenEntry = resetTokens.find((item) => item.token === token)

    if (!tokenEntry) {
      throw new Error('Reset link is invalid or expired')
    }

    const accounts = getAccounts()
    const updatedAccounts = accounts.map((account) =>
      account.email.toLowerCase() === tokenEntry.email
        ? { ...account, password: newPassword }
        : account,
    )

    setAccounts(updatedAccounts)
    setResetTokens(resetTokens.filter((item) => item.token !== token))
  }

  const changePassword = (newPassword) => {
    if (!user) {
      throw new Error('You must be logged in to change your password')
    }

    const accounts = getAccounts()
    const updatedAccounts = accounts.map((account) =>
      account.id === user.id ? { ...account, password: newPassword } : account,
    )

    setAccounts(updatedAccounts)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
        requestPasswordReset,
        resetPassword,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
