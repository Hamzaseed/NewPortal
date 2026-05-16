import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { toast } from 'sonner'
import Footer from '../components/layout/Footer'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useAuth } from '../context/AuthContext'

function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { resetPassword, loading } = useAuth()

  const token = useMemo(() => searchParams.get('token')?.trim() || '', [searchParams])

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!token) {
      toast.error('Invalid or missing reset token')
      return
    }

    if (!password.trim() || !confirmPassword.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }

    try {
      await resetPassword(token, password)
      toast.success('Password updated successfully. Please log in.')

      try {
        const url = new URL(window.location.href)
        url.searchParams.delete('token')
        window.history.replaceState({}, '', url.toString())
      } catch {
        // Ignore URL cleanup failures.
      }

      navigate('/newsroom')
    } catch (err) {
      toast.error(err?.message || 'Failed to reset password')
    }
  }

  if (!token) {
    return (
      <div className="flex min-h-screen flex-col bg-background-light text-slate-900">
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <main className="flex flex-1 items-center justify-center px-4 py-10 sm:py-16">
          <div className="w-full max-w-md border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900">Reset Link Invalid</h1>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                This reset link is missing or expired. Please request a new one.
              </p>
            </div>
            <div className="mt-6 flex justify-center">
              <Button variant="outline" onClick={() => navigate('/newsroom')}>
                Back to Home
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background-light text-slate-900">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:py-16">
        <div className="w-full max-w-md border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">Reset Your Password</h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter your new password below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="new-password">New Password</Label>
                <span className="text-xs text-slate-500">Min 8 characters</span>
              </div>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  minLength={8}
                  autoComplete="new-password"
                  className="pr-12"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-500"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  minLength={8}
                  autoComplete="new-password"
                  className="pr-12"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-500"
                  onClick={() => setShowConfirm((value) => !value)}
                  aria-label={
                    showConfirm ? 'Hide password confirmation' : 'Show password confirmation'
                  }
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="h-11 w-full">
              {loading ? 'Updating...' : 'Reset Password'}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="h-11 w-full"
              onClick={() => navigate('/newsroom')}
            >
              Back to Home
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ResetPasswordPage
