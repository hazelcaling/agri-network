import { useEffect, useState, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadProducts } from "../../redux/product";
import ProductCard from "./ProductCard";
import ProductForm from "./FarmerListingForm";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { LoadingSpinner } from "../LoadingSpinner";

import ProductDetails from "./ProductDetails";


function ProductList () {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    // const productsArr = Object.values(products)
    const productsArr = useMemo(() => Object.values(products), [products]);
    const [isLoaded, setIsloaded] = useState(false)
    const isLoggedIn = useSelector(state => state.session.user !== null)
    const isFarmer = useSelector(state => state.session.user?.user_type === 'farmer')
    const [noResults, setNoResults] = useState(false)

    useEffect(() => {
        dispatch(thunkLoadProducts())
        setIsloaded(true)
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

    const handleClick = () => {
        return <OpenModalButton modalComponent={<ProductDetails />}/>
    }

    return (
        <>
            {!isLoggedIn ?
                (<div className='create'>
                    <OpenModalButton buttonText='Create a new Listing' modalComponent='Login is required to create listing'/>
                </div>) :
                isFarmer ? <div className='create'><OpenModalButton buttonText='Create a new Listing' modalComponent={<ProductForm />}/></div> : ''
            }

            {noResults ? 'No Result' : productsArr.map(product => (
                <div key={product?.id} onClick={handleClick}>
                    <ProductCard product={product}/>
                </div>
            ))}
        </>
    )

}


export default ProductList
