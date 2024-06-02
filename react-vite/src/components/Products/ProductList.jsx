import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadProducts } from "../../redux/product";
import ProductCard from "./ProductCard";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ProductForm from "./CreateProductForm";

function ProductList () {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    const productsArr = Object.values(products)
    const [isLoaded, setIsloaded] = useState(false)
    const isLoggedIn = useSelector(state => state.session.user !== null)

    useEffect(() => {
        dispatch(thunkLoadProducts()).then(() => setIsloaded(true))
    }, [dispatch])

    if (products.length === 0) {
        <h2>Loading....</h2>
    }

    return (
        <>
            {isLoggedIn && (
                <button>
                    <OpenModalMenuItem
                        itemText='Create NEW Product Listing'
                        modalComponent={<ProductForm />}>
                    </OpenModalMenuItem>
                </button>
            )}
            <div>
                {isLoaded && productsArr.map((product) => (
                    <ProductCard key={product?.id} product={product} />
                ))}
            </div>
        </>
    )
}

export default ProductList
