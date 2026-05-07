import SearchPageUsers from "../components/SearchPageUsers"
import SearchPageFilters from "../components/SearchPageFilters"

export default function SearchPage() {

    return (
        <>
            <div className="container mt-3 mb-3">
                <div className="row">
                    <h1 className="mb-0">SearchPage</h1>
                </div>
            </div>

            <SearchPageFilters />
            <SearchPageUsers />
        </>
    )
}