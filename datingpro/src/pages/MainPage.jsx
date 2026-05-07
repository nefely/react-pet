import { Link } from 'react-router-dom'

const features = [
  {
    icon: '🔍',
    title: 'Smart Search',
    text: 'Filter by age, city, interests and find exactly who you are looking for.',
  },
  {
    icon: '❤️',
    title: 'Genuine Connections',
    text: 'Browse real profiles and connect with people who share your values.',
  },
  {
    icon: '🛡️',
    title: 'Safe & Private',
    text: 'Your data is protected. You control what you share and with whom.',
  },
]

export default function MainPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-danger text-white py-5">
        <div className="container text-center py-4">
          <h1 className="display-4 fw-bold mb-3">Find Your Perfect Match</h1>
          <p className="lead mb-4" style={{ maxWidth: 560, margin: '0 auto 1.5rem' }}>
            DatingPro connects real people looking for meaningful relationships.
            Start your journey today — your person is already here.
          </p>
          <Link to="/search/" className="btn btn-light btn-lg text-danger fw-semibold px-5">
            Browse Profiles
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="container py-5">
        <h2 className="text-center fw-semibold mb-5">Why DatingPro?</h2>
        <div className="row g-4 justify-content-center">
          {features.map(({ icon, title, text }) => (
            <div key={title} className="col-sm-10 col-md-4">
              <div className="border rounded-3 p-4 h-100 text-center">
                <div style={{ fontSize: '2.5rem' }} className="mb-3">{icon}</div>
                <h5 className="fw-semibold mb-2">{title}</h5>
                <p className="text-muted mb-0">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-light py-5">
        <div className="container">
          <div className="row text-center g-4 justify-content-center">
            {[
              { value: '50 000+', label: 'Active users' },
              { value: '120+', label: 'Cities covered' },
              { value: '12 000+', label: 'Couples formed' },
            ].map(({ value, label }) => (
              <div key={label} className="col-6 col-md-3">
                <div className="fw-bold display-6 text-danger">{value}</div>
                <div className="text-muted">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container text-center py-5">
        <h3 className="fw-semibold mb-3">Ready to meet someone special?</h3>
        <Link to="/search/" className="btn btn-danger btn-lg px-5">
          Start Searching
        </Link>
      </div>
    </>
  )
}
