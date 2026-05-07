import { useDispatch, useSelector } from 'react-redux'
import { setFilter, resetFilters } from '../store/storeSlice'

export default function SearchPageFilters() {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.store.filters)

  const isActive = Object.values(filters).some((v) => v !== '')

  function handleChange(e) {
    dispatch(setFilter({ name: e.target.name, value: e.target.value }))
  }

  return (
    <section className="filters">
        <div className="container mb-3 mt-3">
            <div className="row">
                <div className="col-12">
                    <h6>Filters</h6>
                </div>
                <div className="filters-inputs col-12">
                    <div className="row g-2 align-items-center">

                        <div className="gender-filter col-md-3 col-xs-12">
                            <select
                                name="gender"
                                value={filters.gender}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="">All Genders</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <div className="lookingfor-filter col-md-3 col-xs-12">
                            <select
                                name="lookingFor"
                                value={filters.lookingFor}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="">All Goals</option>
                                <option value="Relationship">Relationship</option>
                                <option value="Friendship">Friendship</option>
                            </select>
                        </div>

                        <div className="age-filter col-md-3 col-xs-12">
                            <select
                                name="ageRange"
                                value={filters.ageRange}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="">All Ages</option>
                                <option value="18-24">18–24</option>
                                <option value="25-34">25–34</option>
                                <option value="35-44">35–44</option>
                                <option value="45+">45+</option>
                            </select>
                        </div>

                        {isActive && (
                            <div className="col-md-auto col-xs-12">
                                <button
                                    className="btn btn-danger"
                                    onClick={() => dispatch(resetFilters())}
                                >
                                ✕
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
