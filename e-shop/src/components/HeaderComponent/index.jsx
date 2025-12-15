import { Link } from "react-router-dom";
import styles from "./HeaderComponent.module.css";

export default function HeaderComponent() {
    return (
        <header className="py-3">
            <div className="container">
                <div className={`${styles.row} row`}>
                    <div className={`${styles.logo} col-2`}>Logo</div>
                    <div className={`col-10 ${styles.routes}`}>
                        <Link to="/">Home</Link>
                        <Link to="/products">Products</Link>
                    </div>
                </div>
            </div>
        </header>
    )
}