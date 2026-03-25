import { useEffect, useState } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { AnimatePresence, motion } from 'motion/react'
import { Eye, EyeOff, Mail, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '../../context/AuthContext'
import { DialogOverlay, DialogPortal } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

function AuthDialog({ open, onOpenChange, initialMode = 'login' }) {
  const navigate = useNavigate()
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

  const { login, signup, loading } = useAuth()

  useEffect(() => {
    if (open) {
      setMode(initialMode)
      setShowPassword(false)
      setShowConfirmPassword(false)
    }
  }, [open, initialMode])

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'signup' : 'login'))
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      first_name: '',
      last_name: '',
    })
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
      resetForm()
    } catch (err) {
      toast.error(err?.message || 'Something went wrong')
    }
  }

  const fallbackLoginImage =
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80'
  const fallbackSignupImage =
    'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1200&q=80'

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50 z-40" />

        <DialogPrimitive.Content
          className="
            fixed top-1/2 left-1/2 z-50
            -translate-x-1/2 -translate-y-1/2
            w-full max-w-4xl
            min-h-[520px]
            max-h-[90vh]
            bg-white rounded-none shadow-2xl
            overflow-hidden
            grid md:grid-cols-2
          "
        >
          <VisuallyHidden>
            <DialogPrimitive.Title>
              {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
            </DialogPrimitive.Title>
            <DialogPrimitive.Description>
              {mode === 'login'
                ? 'Enter your email and password to sign in.'
                : 'Fill out the form to create an account.'}
            </DialogPrimitive.Description>
          </VisuallyHidden>

          <div className="relative min-h-[240px] md:min-h-[520px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={mode}
                src={mode === 'login' ? fallbackLoginImage : fallbackSignupImage}
                alt="Auth Visual"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

            <div className="absolute bottom-10 left-10 right-10 text-white">
              <h3 className="text-3xl font-serif tracking-wide mb-2">
                {mode === 'login' ? 'WELCOME BACK' : 'JOIN US'}
              </h3>
              <p className="text-xs uppercase tracking-widest">
                {mode === 'login' ? 'Discover timeless elegance' : 'Luxury crafted for you'}
              </p>
            </div>
          </div>

          <div className="relative p-6 md:p-10 flex items-center justify-center">
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="w-full max-w-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-serif text-center mb-2">
                    {mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
                  </h2>
                  <p className="text-center text-xs uppercase tracking-widest text-gray-500 mb-6">
                    {mode === 'login' ? 'Enter your credentials' : 'Start your journey'}
                  </p>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    {mode === 'signup' ? (
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs uppercase">First Name</Label>
                          <Input
                            value={formData.first_name}
                            onChange={(e) =>
                              setFormData({ ...formData, first_name: e.target.value })
                            }
                            className="border-gray-300 focus:ring-0 focus:border-gray-400"
                            required
                          />
                        </div>
                        <div>
                          <Label className="text-xs uppercase">Last Name</Label>
                          <Input
                            value={formData.last_name}
                            onChange={(e) =>
                              setFormData({ ...formData, last_name: e.target.value })
                            }
                            className="border-gray-300 focus:ring-0 focus:border-gray-400"
                            required
                          />
                        </div>
                      </div>
                    ) : null}

                    <div>
                      <Label className="text-xs uppercase">Email</Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border-gray-300 focus:ring-0 focus:border-gray-400"
                        required
                      />
                    </div>

                    <div>
                      <Label className="text-xs uppercase">Password</Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="border-gray-300 focus:ring-0 focus:border-gray-400 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100"
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
                        <Label className="text-xs uppercase">Confirm Password</Label>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={(e) =>
                              setFormData({ ...formData, confirmPassword: e.target.value })
                            }
                            className="border-gray-300 focus:ring-0 focus:border-gray-400 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100"
                            aria-label={
                              showConfirmPassword
                                ? 'Hide password confirmation'
                                : 'Show password confirmation'
                            }
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

                    <Button
                      type="submit"
                      className="w-full h-12 border border-black uppercase tracking-widest"
                      disabled={loading}
                    >
                      {loading
                        ? 'Please wait...'
                        : mode === 'login'
                          ? 'Sign In'
                          : 'Create Account'}
                    </Button>
                  </form>

                  <div className="my-6 relative">
                    <div className="border-t" />
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-3 text-xs uppercase text-gray-500">
                      Or
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full h-12 flex gap-2 uppercase"
                    onClick={() => toast.success('Google Sign-in')}
                  >
                    <Mail className="h-4 w-4" />
                    Continue with Google
                  </Button>

                  <p className="mt-4 text-center text-xs uppercase text-gray-600">
                    {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                    <button
                      className="ml-2 text-primary"
                      type="button"
                      onClick={toggleMode}
                    >
                      {mode === 'login' ? 'Sign Up' : 'Sign In'}
                    </button>
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </DialogPrimitive.Root>
  )
}

export default AuthDialog
