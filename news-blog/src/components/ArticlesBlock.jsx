
import { Link } from "react-router-dom";

export default function ArticlesBlock({ articles , showSectionTitle = true}) {
    return (
        <div className="articles-block mb-4">
            {showSectionTitle && <h2>Articles Block</h2>}

            <div className="cards-list">
                {
                    articles.map(article=> {
                        return (
                            <Link key={article.id} className="card" to={`/article/${article.url}`}>
                                <h5 className="mb-2">{article.title}</h5>
                                <small className="text-muted">{article.category_name}</small>
                            </Link>
                        )
                    })
                }
            </div>

        </div>
    )
}