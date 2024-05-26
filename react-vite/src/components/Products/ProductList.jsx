import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadProducts } from "../../redux/product";
import ProductCard from "./ProductCard";


function ProductList () {
    const dispatch = useDispatch()
    const products = useSelector(state => Object.values(state.products) ? Object.values(state.products) : [])

    useEffect(() => {
        dispatch(thunkLoadProducts())
    }, [dispatch])

    if (!products) {
        <h2>Loading....</h2>
    }

    return (
        <div>
            {products.map((product) => (
                <ProductCard key={product?.id} product={product} />
            ))}

        </div>
    )
}

export default ProductList
