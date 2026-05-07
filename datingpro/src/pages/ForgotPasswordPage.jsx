import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await sendPasswordResetEmail(auth, email)
      setSent(true)
    } catch {
      setError('Email not found. Check the address and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center py-5">
      <div className="card shadow-sm border-0 rounded-4 p-4" style={{ width: '100%', maxWidth: 420 }}>
        <h3 className="fw-bold text-center mb-1">Reset password</h3>
        <p className="text-muted text-center small mb-4">
          Enter your email and we'll send you a reset link.
        </p>

        {sent ? (
          <div className="text-center">
            <div className="alert alert-success small">
              Reset link sent to <strong>{email}</strong>. Check your inbox.
            </div>
            <Link to="/login" className="btn btn-outline-danger mt-2">Back to Sign In</Link>
          </div>
        ) : (
          <>
            {error && <div className="alert alert-danger py-2 small">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label small fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-danger w-100" disabled={loading}>
                {loading ? 'Sending…' : 'Send Reset Link'}
              </button>
            </form>
            <p className="text-center text-muted small mt-3 mb-0">
              Remembered it?{' '}
              <Link to="/login" className="text-danger fw-semibold">Sign in</Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
