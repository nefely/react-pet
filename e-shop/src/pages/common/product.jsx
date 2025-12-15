import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import HeaderComponent from "../../components/HeaderComponent";
import ProductComponent from "../../components/ProductComponent";

export default function Home() {

    const { id } = useParams();
    const product = useSelector(
        (state) => state.products.items.find((p) => p.id === Number(id))
    );
    if (!product) {
        return <h2 className="text-center py-5">Product not found</h2>;
    }

    return (
        <>
            <HeaderComponent/>
            <ProductComponent product={product}/>
        </>
    )
}