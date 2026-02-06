import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Categories from './pages/Categories.jsx';
import Category from './pages/Category.jsx';
import Article from './pages/Article.jsx';

import { useArticles } from "./hooks/useArticles";
import { useCategories } from "./hooks/useCategories";

import './App.css'

export default function App() {

    const { articles } = useArticles();
    const { categories } = useCategories();

    return (
        <div className="bg-light">
            <Routes>
                <Route path="/" element={<Home articles={articles} categories={categories} />} />
                <Route path="/categories" element={<Categories categories={categories} />} />
                <Route path="/categories/:id" element={<Category articles={articles} categories={categories} />} />
                <Route path="/article/:url" element={<Article articles={articles} />} />
            </Routes>
        </div>
    )
}