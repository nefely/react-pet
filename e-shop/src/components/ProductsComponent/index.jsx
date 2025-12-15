import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./ProductsComponent.module.css";

export default function ProductsComponent() {

    const products = useSelector((state) => state.products.items);

    return (
        <div className={`${styles.products} py-5`}>
            <div className="container">
                <div className="row">
                    <div>
                        <h2>Products</h2>
                    </div>
                    <div className={styles.grid}>
                        {products.map((product) => (
                            <div className={`${styles.productCard} card`} key={product.id}>
                                <div className={styles.image}>
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <h4 className="my-3">{product.name}</h4>
                                <div className={`${styles.line} mb-3`}>
                                    <span className="price">${product.price}</span>
                                    <span className="category">{product.category}</span>
                                </div>

                                <p className="desc">
                                    {product.description.slice(0, 60)}...
                                </p>

                                <div className={styles.btnContainer}>
                                    <button className="btn btn-success">Add To Card</button>
                                    <Link to={`/product/${product.id}`} className="btn btn-primary">View Product</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}