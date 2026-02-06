
import Header from "../components/Header.jsx";
import CategoriesBlock from "../components/CategoriesBlock.jsx";

export default function Categories({ categories }) {
    return (
        <>
            <Header />

            <div className="container">
                <div className="row">
                    <CategoriesBlock categories={categories} />
                </div>
            </div>
        </>
    )
}