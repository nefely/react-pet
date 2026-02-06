
import Header from "../components/Header.jsx";

import ArticlesBlock from "../components/ArticlesBlock.jsx";
import CategoriesBlock from "../components/CategoriesBlock.jsx";


export default function Home({ articles, categories }) {
    return (
        <>
            <Header />

            <div className="container">
                <div className="row">
                    <ArticlesBlock articles={articles} categories={categories} />
                    <CategoriesBlock categories={categories} />
                </div>
            </div>
        </>
    )
}