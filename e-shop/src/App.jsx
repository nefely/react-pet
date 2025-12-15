import { Routes, Route } from "react-router-dom";
import Home from "./pages/common/home"
import Products from "./pages/common/products"
import Product from "./pages/common/product"


function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
        </Routes>
    </>
  )
}

export default App
