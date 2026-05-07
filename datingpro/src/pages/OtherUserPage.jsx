import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAuth } from '../context/AuthContext'
import { getLikes, toggleLike } from '../hooks/useLikes'

export default function OtherUserPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user: authUser } = useAuth()
  const user = useSelector((state) =>
    state.store.users.find((u) => u.id === Number(id))
  )

  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (!authUser) return
    getLikes(authUser.uid).then((ids) => setLiked(ids.includes(Number(id))))
  }, [authUser, id])

  const handleLike = async () => {
    if (!authUser) return navigate('/login')
    const updated = await toggleLike(authUser.uid, Number(id))
    setLiked(updated.includes(Number(id)))
  }

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <h4>User not found</h4>
        <Link to="/search/" className="btn btn-outline-secondary mt-3">← Back to search</Link>
      </div>
    )
  }

  return (
    <div className="container mt-4 mb-5">

      <Link to="/search/" className="btn btn-outline-secondary mb-4">← Back to search</Link>

      <div className="row g-4">

        {/* Avatar */}
        <div className="col-md-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="img-fluid rounded-3 w-100"
            style={{ objectFit: 'cover', maxHeight: '480px' }}
          />
        </div>

        {/* Info */}
        <div className="col-md-8">
          <div className="d-flex align-items-center gap-3 mb-1">
            <h2 className="mb-0">{user.name}, {user.age}</h2>
            <button
              onClick={handleLike}
              className={`btn btn-sm px-3 ${liked ? 'btn-danger' : 'btn-outline-danger'}`}
            >
              {liked ? '❤️ Liked' : '♡ Like'}
            </button>
          </div>
          <p className="text-muted mb-3">{user.city}, {user.country}</p>

          <div className="d-flex gap-2 flex-wrap mb-4">
            <span className="badge bg-secondary">{user.gender}</span>
            <span className="badge bg-secondary">{user.height} cm</span>
            <span className="badge bg-primary">{user.lookingFor}</span>
          </div>

          <h6 className="fw-semibold">About</h6>
          <p className="mb-4">{user.bio}</p>

          <h6 className="fw-semibold">Interests</h6>
          <div className="d-flex gap-2 flex-wrap mb-4">
            {user.interests.map((interest) => (
              <span key={interest} className="badge rounded-pill bg-light text-dark border">
                {interest}
              </span>
            ))}
          </div>

          <div className="row g-3">
            <div className="col-6 col-md-4">
              <div className="border rounded-3 p-3 text-center">
                <div className="text-muted small">Gender</div>
                <div className="fw-semibold">{user.gender}</div>
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="border rounded-3 p-3 text-center">
                <div className="text-muted small">Age</div>
                <div className="fw-semibold">{user.age}</div>
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="border rounded-3 p-3 text-center">
                <div className="text-muted small">Height</div>
                <div className="fw-semibold">{user.height} cm</div>
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="border rounded-3 p-3 text-center">
                <div className="text-muted small">City</div>
                <div className="fw-semibold">{user.city}</div>
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="border rounded-3 p-3 text-center">
                <div className="text-muted small">Country</div>
                <div className="fw-semibold">{user.country}</div>
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="border rounded-3 p-3 text-center">
                <div className="text-muted small">Looking for</div>
                <div className="fw-semibold">{user.lookingFor}</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
