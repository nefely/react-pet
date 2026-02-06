
import Header from "../components/Header.jsx";
import ArticlesBlock from "../components/ArticlesBlock.jsx";

export default function Category({ articles, categories }) {

    let categoryId =  window.location.pathname.split("/categories/")[1];
    let category = categories.find(c => c.id?.toString() === categoryId);
    let filteredArticles = articles.filter(a => a.category_id?.toString() === categoryId);

    console.log(category)
    console.log(articles)

    return (
        <>
            <Header />

            <div className="container">
                <div className="row">
                    <h1>{category?.name}</h1>

                    <ArticlesBlock articles={filteredArticles} showSectionTitle={false} />
                </div>
            </div>
        </>
    )
}