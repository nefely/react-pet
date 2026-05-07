import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAuth } from '../context/AuthContext'
import { useProfile } from '../hooks/useProfile'
import { getLikes } from '../hooks/useLikes'

const INTERESTS_OPTIONS = [
  'Travel', 'Music', 'Sport', 'Cinema', 'Cooking', 'Reading',
  'Photography', 'Gaming', 'Yoga', 'Art', 'Dancing', 'Wine',
]

const LOOKING_FOR = ['Relationship', 'Friendship', 'Casual', 'Marriage']

export default function ProfilePage() {
  const { user } = useAuth()
  const { profile, loading, saveProfile } = useProfile(user?.uid)
  const allUsers = useSelector((state) => state.store.users)

  const [tab, setTab] = useState('profile')
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({})
  const [likedIds, setLikedIds] = useState([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (profile) setForm(profile)
  }, [profile])

  useEffect(() => {
    if (user) getLikes(user.uid).then(setLikedIds)
  }, [user])

  const likedUsers = allUsers.filter((u) => likedIds.includes(u.id))

  const toggle = (interest) => {
    const current = form.interests ?? []
    setForm((f) => ({
      ...f,
      interests: current.includes(interest)
        ? current.filter((i) => i !== interest)
        : [...current, interest],
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    await saveProfile(form)
    setSaving(false)
    setEditing(false)
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-danger" />
      </div>
    )
  }

  return (
    <div className="container py-4 mb-5" style={{ maxWidth: 720 }}>

      {/* Avatar + name */}
      <div className="d-flex align-items-center gap-4 mb-4">
        <img
          src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=dc3545&color=fff&size=96`}
          alt={user.displayName}
          width={80}
          height={80}
          className="rounded-circle object-fit-cover"
        />
        <div>
          <h4 className="fw-bold mb-0">{user.displayName || 'My Profile'}</h4>
          <p className="text-muted small mb-0">{user.email}</p>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={'nav-link' + (tab === 'profile' ? ' active fw-semibold' : '')}
            onClick={() => setTab('profile')}
          >
            Profile
          </button>
        </li>
        <li className="nav-item">
          <button
            className={'nav-link' + (tab === 'likes' ? ' active fw-semibold' : '')}
            onClick={() => setTab('likes')}
          >
            Liked{likedIds.length > 0 && <span className="badge bg-danger ms-2">{likedIds.length}</span>}
          </button>
        </li>
      </ul>

      {/* Profile tab */}
      {tab === 'profile' && (
        <>
          {editing ? (
            <div className="d-flex flex-column gap-3">
              <div className="row g-3">
                <div className="col-sm-6">
                  <label className="form-label small fw-semibold">Age</label>
                  <input type="number" className="form-control" min={18} max={99}
                    value={form.age ?? ''} onChange={(e) => setForm({ ...form, age: Number(e.target.value) })} />
                </div>
                <div className="col-sm-6">
                  <label className="form-label small fw-semibold">Height (cm)</label>
                  <input type="number" className="form-control" min={140} max={220}
                    value={form.height ?? ''} onChange={(e) => setForm({ ...form, height: Number(e.target.value) })} />
                </div>
                <div className="col-sm-6">
                  <label className="form-label small fw-semibold">City</label>
                  <input type="text" className="form-control"
                    value={form.city ?? ''} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                </div>
                <div className="col-sm-6">
                  <label className="form-label small fw-semibold">Country</label>
                  <input type="text" className="form-control"
                    value={form.country ?? ''} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-semibold">Looking for</label>
                  <select className="form-select"
                    value={form.lookingFor ?? ''} onChange={(e) => setForm({ ...form, lookingFor: e.target.value })}>
                    <option value="">— select —</option>
                    {LOOKING_FOR.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label small fw-semibold">About me</label>
                  <textarea className="form-control" rows={3}
                    value={form.bio ?? ''} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-semibold d-block mb-2">Interests</label>
                  <div className="d-flex flex-wrap gap-2">
                    {INTERESTS_OPTIONS.map((interest) => {
                      const active = (form.interests ?? []).includes(interest)
                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggle(interest)}
                          className={`btn btn-sm rounded-pill ${active ? 'btn-danger' : 'btn-outline-secondary'}`}
                        >
                          {interest}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2 mt-2">
                <button className="btn btn-danger px-4" onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving…' : 'Save'}
                </button>
                <button className="btn btn-outline-secondary px-4" onClick={() => { setForm(profile); setEditing(false) }}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              {!profile?.age && (
                <div className="alert alert-warning small">
                  Your profile is empty. Fill in your details so others can find you.
                </div>
              )}

              <div className="row g-3 mb-4">
                {[
                  { label: 'Age', value: profile?.age },
                  { label: 'Height', value: profile?.height ? `${profile.height} cm` : null },
                  { label: 'City', value: profile?.city },
                  { label: 'Country', value: profile?.country },
                  { label: 'Looking for', value: profile?.lookingFor },
                ].map(({ label, value }) => (
                  <div key={label} className="col-6 col-md-4">
                    <div className="border rounded-3 p-3 text-center h-100">
                      <div className="text-muted small">{label}</div>
                      <div className="fw-semibold">{value || <span className="text-muted">—</span>}</div>
                    </div>
                  </div>
                ))}
              </div>

              {profile?.bio && (
                <div className="mb-4">
                  <h6 className="fw-semibold">About me</h6>
                  <p className="text-muted">{profile.bio}</p>
                </div>
              )}

              {profile?.interests?.length > 0 && (
                <div className="mb-4">
                  <h6 className="fw-semibold">Interests</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {profile.interests.map((i) => (
                      <span key={i} className="badge rounded-pill bg-light text-dark border">{i}</span>
                    ))}
                  </div>
                </div>
              )}

              <button className="btn btn-outline-danger px-4" onClick={() => setEditing(true)}>
                Edit Profile
              </button>
            </div>
          )}
        </>
      )}

      {/* Likes tab */}
      {tab === 'likes' && (
        <div>
          {likedUsers.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <p className="mb-3">You haven't liked anyone yet.</p>
              <Link to="/search/" className="btn btn-danger btn-sm px-4">Browse Profiles</Link>
            </div>
          ) : (
            <div className="row g-3">
              {likedUsers.map((u) => (
                <div key={u.id} className="col-6 col-md-4">
                  <Link to={`/user/${u.id}`} className="text-decoration-none text-dark">
                    <div className="card border-0 shadow-sm h-100">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="card-img-top"
                        style={{ height: 160, objectFit: 'cover' }}
                      />
                      <div className="card-body p-2">
                        <div className="fw-semibold small">{u.name}, {u.age}</div>
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>{u.city}</div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
