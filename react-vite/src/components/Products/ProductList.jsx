import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadProducts } from "../../redux/product";
import ProductCard from "./ProductCard";


function ProductList () {
    const dispatch = useDispatch()
    // const [products, setProducts] = useState([]);
    const products = useSelector(state => Object.values(state.products) ? Object.values(state.products) : [])
    console.log(products, 'line 10')
    useEffect(() => {
        dispatch(thunkLoadProducts())
    }, [dispatch])
    // console.log(products, 'line15')

    if (!products) {
        <h2>Loading....</h2>
    }

    return (
        <div>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
                // <h2 key={product.id}>{product.description}</h2>
            ))}
        </div>
    )
}

export default ProductList
