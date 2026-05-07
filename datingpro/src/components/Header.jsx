import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <nav className="navbar navbar-expand-md bg-white border-bottom shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold text-danger fs-4">
          DatingPro
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto gap-md-2 align-items-md-center">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  'nav-link' + (isActive ? ' fw-semibold text-danger' : '')
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/search/"
                className={({ isActive }) =>
                  'nav-link' + (isActive ? ' fw-semibold text-danger' : '')
                }
              >
                Search
              </NavLink>
            </li>

            {user ? (
              <>
                <li className="nav-item ms-md-2">
                  <Link to="/profile" className="d-flex align-items-center gap-2 text-decoration-none text-dark">
                    <img
                      src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=dc3545&color=fff&size=60`}
                      alt={user.displayName}
                      width={30}
                      height={30}
                      className="rounded-circle"
                    />
                    <span className="small fw-semibold text-truncate" style={{ maxWidth: 120 }}>
                      {user.displayName || user.email}
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={logout} className="btn btn-outline-danger btn-sm px-3">
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item ms-md-2 mt-2 mt-md-0">
                <div className="d-flex gap-2">
                  <Link to="/login" className="btn btn-outline-danger btn-sm px-3">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn btn-danger btn-sm px-3">
                    Register
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
