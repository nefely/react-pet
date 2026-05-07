import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { auth, googleProvider } from '../firebase'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) return setError('Passwords do not match.')
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    setLoading(true)
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(user, { displayName: name })
      navigate('/search/')
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered.')
      } else {
        setError('Registration failed. Try again.')
      }
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
        <h3 className="fw-bold text-center mb-1">Create account</h3>
        <p className="text-muted text-center small mb-4">Join DatingPro and find your match</p>

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
            <label className="form-label small fw-semibold">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="mb-3">
            <label className="form-label small fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label small fw-semibold">Confirm password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger w-100" disabled={loading}>
            {loading ? 'Creating account…' : 'Register'}
          </button>
        </form>

        <p className="text-center text-muted small mt-3 mb-0">
          Already have an account?{' '}
          <Link to="/login" className="text-danger fw-semibold">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
