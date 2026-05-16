import React, { useEffect, useState } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DialogPortal, DialogOverlay } from '../ui/dialog'
import { X, Mail, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { fetchSettings } from '../../../app/settings/settingSlice'
import { useAuth } from '../../context/AuthContext'

function AuthDialog({
  open,
  onOpenChange,
  initialMode = 'login',
}) {
  const [mode, setMode] = useState(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const settings = useSelector((state) => state.settings.settings)
  const { login, signup } = useAuth()
  const apiBaseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

  useEffect(() => {
    if (!open) {
      return
    }

    setMode(initialMode)
    setShowPassword(false)
    setShowConfirmPassword(false)
  }, [open, initialMode])

  useEffect(() => {
    if (open) {
      dispatch(fetchSettings())
    }
  }, [dispatch, open])

  const toggleMode = () => {
    setMode((currentMode) => (currentMode === 'login' ? 'signup' : 'login'))
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match')
          return
        }

        await signup(
          formData.first_name,
          formData.last_name,
          formData.email,
          formData.password,
        )
        toast.success('Account created!')
      } else {
        await login(formData.email, formData.password)
        toast.success('Welcome back!')
      }

      onOpenChange(false)
      setShowPassword(false)
      setShowConfirmPassword(false)
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        first_name: '',
        last_name: '',
      })
    } catch (err) {
      toast.error(err?.message || 'Something went wrong')
    }
  }

  const fallbackLoginImage =
    'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80'
  const fallbackSignupImage =
    'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=80'
  const authImageSrc =
    mode === 'login'
      ? settings?.auth_login_image_url?.trim()
        ? settings.auth_login_image_url.startsWith('/uploads/')
          ? `${apiBaseUrl}${settings.auth_login_image_url}`
          : settings.auth_login_image_url
        : fallbackLoginImage
      : settings?.auth_signup_image_url?.trim()
        ? settings.auth_signup_image_url.startsWith('/uploads/')
          ? `${apiBaseUrl}${settings.auth_signup_image_url}`
          : settings.auth_signup_image_url
        : fallbackSignupImage

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-[140] bg-black/50" />

        <DialogPrimitive.Content
          className="
            fixed left-1/2 top-1/2 z-[150]
            max-h-[90vh] w-[calc(100vw-1.5rem)] max-w-4xl
            -translate-x-1/2 -translate-y-1/2
            overflow-y-auto rounded-none bg-white shadow-2xl
            md:grid md:min-h-[520px] md:grid-cols-2 md:overflow-hidden
          "
        >
          <div className="relative min-h-[240px] md:min-h-[520px]">
            <img
              key={mode}
              src={authImageSrc}
              alt="Auth Visual"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white md:bottom-10 md:left-10 md:right-10">
              <h3 className="mb-2 font-serif text-2xl tracking-wide md:text-3xl">
                {mode === 'login' ? 'WELCOME BACK' : 'JOIN US'}
              </h3>
              <p className="text-xs uppercase tracking-widest">
                {mode === 'login'
                  ? ' Rediscover your inspiration '
                  : ' Unleash your creativity '}
              </p>
            </div>
          </div>

          <div className="relative flex items-center justify-center bg-white p-6 text-slate-900 md:p-10">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 rounded-none p-2 hover:bg-gray-100"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="w-full max-w-sm rounded-none border border-slate-200 bg-[#fafafa] p-5">
              <h2 className="mb-2 text-center font-serif text-3xl text-slate-950">
                {mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
              </h2>
              <p className="mb-6 text-center text-xs uppercase tracking-widest text-gray-500">
                {mode === 'login'
                  ? 'Enter your credentials'
                  : 'Start your journey'}
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {mode === 'signup' ? (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 inline-block text-xs font-medium uppercase text-slate-700">First Name</label>
                      <input
                        value={formData.first_name}
                        onChange={(event) =>
                          setFormData({ ...formData, first_name: event.target.value })
                        }
                        className="h-10 w-full rounded-none border border-slate-400 bg-white px-3 py-2 text-sm text-slate-900 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 inline-block text-xs font-medium uppercase text-slate-700">Last Name</label>
                      <input
                        value={formData.last_name}
                        onChange={(event) =>
                          setFormData({ ...formData, last_name: event.target.value })
                        }
                        className="h-10 w-full rounded-none border border-slate-400 bg-white px-3 py-2 text-sm text-slate-900 outline-none"
                        required
                      />
                    </div>
                  </div>
                ) : null}

                <div>
                  <label className="mb-1 inline-block text-xs font-medium uppercase text-slate-700">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) =>
                      setFormData({ ...formData, email: event.target.value })
                    }
                    className="h-10 w-full rounded-none border border-slate-400 bg-white px-3 py-2 text-sm text-slate-900 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 inline-block text-xs font-medium uppercase text-slate-700">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(event) =>
                        setFormData({ ...formData, password: event.target.value })
                      }
                      className="h-10 w-full rounded-none border border-slate-400 bg-white px-3 py-2 pr-10 text-sm text-slate-900 outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 hover:bg-gray-100"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-600" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-600" />
                      )}
                    </button>
                  </div>

                  {mode === 'login' ? (
                    <div className="mt-2 flex items-center justify-between">
                      <button
                        type="button"
                        className="text-xs uppercase tracking-widest text-gray-600 hover:text-gray-900"
                        onClick={() => {
                          onOpenChange(false)
                          navigate('/forgot-password')
                        }}
                      >
                        Forgot password?
                      </button>
                    </div>
                  ) : null}
                </div>

                {mode === 'signup' ? (
                  <div>
                    <label className="mb-1 inline-block text-xs font-medium uppercase text-slate-700">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            confirmPassword: event.target.value,
                          })
                        }
                        className="h-10 w-full rounded-none border border-slate-400 bg-white px-3 py-2 pr-10 text-sm text-slate-900 outline-none"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((value) => !value)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 hover:bg-gray-100"
                        aria-label={showConfirmPassword ? 'Hide password confirmation' : 'Show password confirmation'}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-600" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>
                ) : null}

                <button
                  type="submit"
                  className="h-12 w-full rounded-none border border-black bg-black px-4 text-sm font-medium uppercase tracking-widest text-white"
                >
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="relative my-6">
                <div className="border-t" />
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs uppercase text-gray-500">
                  Or
                </span>
              </div>

              <button
                type="button"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-none border border-slate-400 bg-white px-4 text-sm font-medium uppercase text-slate-900"
                onClick={() => toast.success('Google Sign-in')}
              >
                <Mail className="h-4 w-4" />
                Continue with Google
              </button>

              <p className="mt-4 text-center text-xs uppercase text-gray-600">
                {mode === 'login'
                  ? "Don't have an account?"
                  : 'Already have an account?'}
                <button
                  className="ml-2 text-primary"
                  type="button"
                  onClick={toggleMode}
                >
                  {mode === 'login' ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </DialogPrimitive.Root>
  )
}

export default AuthDialog
