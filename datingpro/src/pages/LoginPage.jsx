import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../firebase'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/search/')
    } catch {
      setError('Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    try {
      await signInWithPopup(auth, googleProvider)
      navigate('/search/')
    } catch {
      setError('Google sign-in failed. Try again.')
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center py-5">
      <div className="card shadow-sm border-0 rounded-4 p-4" style={{ width: '100%', maxWidth: 420 }}>
        <h3 className="fw-bold text-center mb-1">Welcome back</h3>
        <p className="text-muted text-center small mb-4">Sign in to your DatingPro account</p>

        {error && <div className="alert alert-danger py-2 small">{error}</div>}

        <button onClick={handleGoogle} className="btn btn-outline-secondary w-100 mb-3 d-flex align-items-center justify-content-center gap-2">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width={18} alt="Google" />
          Continue with Google
        </button>

        <div className="d-flex align-items-center gap-2 mb-3">
          <hr className="flex-grow-1 m-0" />
          <span className="text-muted small">or</span>
          <hr className="flex-grow-1 m-0" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
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
          <div className="mb-1">
            <label className="form-label small fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="text-end mb-3">
            <Link to="/forgot-password" className="text-danger small">Forgot password?</Link>
          </div>
          <button type="submit" className="btn btn-danger w-100" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-muted small mt-3 mb-0">
          Don't have an account?{' '}
          <Link to="/register" className="text-danger fw-semibold">Register</Link>
        </p>
      </div>
    </div>
  )
}
