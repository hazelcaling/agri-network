import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadProducts } from "../../redux/product";
import ProductCard from "./ProductCard";
import ProductForm from "./CreateProductForm";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { LoadingSpinner } from "../LoadingSpinner";
import { SearchBar } from "../SearchFilterSort";


function ProductList () {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    const productsArr = Object.values(products)
    const [isLoaded, setIsloaded] = useState(false)
    const isLoggedIn = useSelector(state => state.session.user !== null)
    const isFarmer = useSelector(state => state.session.user?.user_type === 'farmer')
    const [noResults, setNoResults] = useState(false)

    useEffect(() => {
        dispatch(thunkLoadProducts()).then(() => setIsloaded(true))
    }, [dispatch])

    useEffect(() => {
        if (productsArr.length === 0 && isLoaded) {
            setNoResults(true)
        } else {
            setNoResults(false)
        }
    }, [productsArr, isLoaded])

    if (!isLoaded) {
        return <LoadingSpinner />
    }

    return (
        <>

            {!isLoggedIn ?
                (<div className='create'>
                    <OpenModalButton buttonText='Create a new Listing' modalComponent='Login is required to create listing'/>
                </div>) :
                isFarmer ? <div className='create'><OpenModalButton buttonText='Create a new Listing' modalComponent={<ProductForm />}/></div> : ''
            }
            <SearchBar />
            {noResults ? 'No Result' : productsArr.map((product) => (
                    <ProductCard key={product?.id} product={product} />
                ))}

        </>
    )
}

export default ProductList
