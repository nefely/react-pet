
import { Link } from "react-router-dom";

export default function CategoriesBlock({ categories }) {
    return (
        <div className="categories-block mb-4">
            <h2>Categories Block</h2>

            <div className="cards-list">
                {categories.map(category => (
                    <Link key={category.id} className="card" to={`/categories/${category.id}`}>
                        <h5 className="mb-0">{category.name}</h5>
                    </Link>
                ))}
            </div>
        </div>
    )
}