import styles from "./ProductComponent.module.css";

export default function ProductComponent({ product }) {
    if (!product) return null; 

    return (
        <div className={`${styles.product} py-5`}>
            <div className="container">
                <div className={`${styles.row} row`}>
                    <div className="col-12 col-md-4">
                        <div className={`${styles.image} mb-3`}>
                            <img src={product.image} alt={product.name} />
                        </div>
                    </div>
                    <div className="col-12 col-md-8">
                        <h2 className="mb-3">{product.name}</h2>
                        <p className={`${styles.desc} mb-3`}>{product.description}</p>
                        <p className="category">{product.category}</p>
                        <p className="price">${product.price}</p>
                        <div className={styles.btnContainer}>
                            <button className="col-12 col-md-4 btn btn-success">Add To Card</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
