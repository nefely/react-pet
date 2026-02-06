
import Header from "../components/Header.jsx";

export default function Article({ articles }) {

    let articleUrl =  window.location.pathname.split("/article/")[1];
    let article = articles.find(a => a.url === articleUrl);
    console.log(article)

    return (
        <>
            <Header />

            <div className="container">
                <div className="row">
                    <h1>{article?.title}</h1>
                    <div className="article-content" dangerouslySetInnerHTML={{ __html: article?.content }} />
                </div>
            </div>
        </>
    )
}