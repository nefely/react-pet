import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const AGE_RANGES = {
  '18-24': [18, 24],
  '25-34': [25, 34],
  '35-44': [35, 44],
  '45+':   [45, Infinity],
}

export default function SearchPageUsers() {
  const users   = useSelector((state) => state.store.users)
  const filters = useSelector((state) => state.store.filters)

  const filtered = users.filter((user) => {
    if (filters.gender && user.gender !== filters.gender) return false

    if (filters.ageRange) {
      const [min, max] = AGE_RANGES[filters.ageRange]
      if (user.age < min || user.age > max) return false
    }

    if (filters.lookingFor && user.lookingFor !== filters.lookingFor) return false

    return true
  })

  return (
    <section className="users mb-3 mt-3">
        <div className="container">
            <div className="row">

                {filtered.length === 0 && (
                    <p className="text-muted text-center">No users match the selected filters.</p>
                )}

                <div className="users-cards">
                    {filtered.map((user) => (
                    <Link key={user.id} to={`/user/${user.id}`} className="user card text-decoration-none text-dark">
                        <div className="user-avatar">
                        <img src={user.avatar} alt={user.name} className="user-photo" />
                        </div>
                        <div className="user-info">
                        <h6>{user.name}, {user.age}</h6>
                        <p className="text-muted text-sm">{user.city}</p>
                        </div>
                    </Link>
                    ))}
                </div>

            </div>
        </div>
    </section>
  )
}
