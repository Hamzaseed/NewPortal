import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { toast } from 'sonner'
import Footer from '../components/layout/Footer'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useAuth } from '../context/AuthContext'

function ForgotPasswordPage() {
  const navigate = useNavigate()
  const { requestPasswordReset } = useAuth()
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [resetToken, setResetToken] = useState('')
  const [resetLink, setResetLink] = useState('')

const handleSubmit = async (e) => {
  e.preventDefault()

  if (!email.trim()) {
    return toast.error('Please enter your email address')
  }

  try {
    setSending(true)

    const token = await requestPasswordReset(email)

    if (token) {
      setResetToken(token)
      setResetLink(
        `${window.location.origin}/reset-password?token=${encodeURIComponent(token)}`
      )
    } else {
      setResetToken('')
      setResetLink('')
    }

    toast.success('If that email exists, a reset link was sent.')
  } catch (err) {
    toast.error(err?.message || 'Could not send reset link')
  } finally {
    setSending(false)
  }
}
  return (
    <div className="flex min-h-screen flex-col bg-background-light text-slate-900">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:py-16">
        <div className="w-full max-w-md border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">Forgot Password</h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter your email address and we will send you a password reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="forgot-email">Email Address</Label>
              <Input
                id="forgot-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
              />
            </div>

            <Button type="submit" disabled={sending} className="h-11 w-full">
              {sending ? 'Sending...' : 'Send Reset Link'}
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

          {resetLink ? (
            <div className="mt-6 border border-primary/15 bg-primary/5 p-4">
              <p className="text-sm font-semibold text-slate-900">Reset link generated</p>
              <p className="mt-2 break-all text-sm leading-6 text-slate-600">{resetLink}</p>
              <Button
                type="button"
                variant="outline"
                className="mt-4 w-full"
                onClick={() => navigate(`/reset-password?token=${encodeURIComponent(resetToken)}`)}
              >
                Open Reset Page
              </Button>
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ForgotPasswordPage
