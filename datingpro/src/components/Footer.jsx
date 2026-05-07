import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-auto pt-4 pb-3">
      <div className="container">
        <div className="row gy-4">

          <div className="col-md-4">
            <span className="fw-bold text-danger fs-5">DatingPro</span>
            <p className="text-secondary small mb-0 mt-1">
              Find meaningful connections with real people.
            </p>
          </div>

          <div className="col-md-4">
            <p className="text-white small fw-semibold mb-2">Navigation</p>
            <ul className="list-unstyled d-flex flex-column gap-1 mb-0">
              <li><Link to="/" className="text-secondary text-decoration-none">Home</Link></li>
              <li><Link to="/search/" className="text-secondary text-decoration-none">Search</Link></li>
            </ul>
          </div>

          <div className="col-md-4">
            <p className="text-white small fw-semibold mb-2">Legal</p>
            <ul className="list-unstyled d-flex flex-column gap-1 mb-0">
              <li><Link to="/privacy-policy" className="text-secondary text-decoration-none">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-secondary text-decoration-none">Terms of Use</Link></li>
            </ul>
          </div>

        </div>

        <hr className="border-secondary mt-4 mb-3" />

        <p className="text-secondary small text-center mb-0">
          © {new Date().getFullYear()} DatingPro. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
