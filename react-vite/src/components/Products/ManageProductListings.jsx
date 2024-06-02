import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadProducts } from "../../redux/product";
import ProductCard from "./ProductCard";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteProduct from "./DeleteProduct";
import UpdateProduct from './UpdateProduct'

function ManageProductListings () {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user?.id)
    const products = useSelector(state => state.products)
    const productsArr = Object.values(products).filter(product => product?.farmer_id === userId)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(thunkLoadProducts())
        setIsLoaded(true)
    }, [dispatch])

    return (
        <div>
            {isLoaded && (
                productsArr.map((product) => (
                    <div key={product?.id}>
                        <ProductCard  product={product}/>
                        <OpenModalButton
                            buttonText='Edit'
                            modalComponent={<UpdateProduct productId={product?.id} />}/>
                        <OpenModalButton
                            buttonText='Delete'
                            modalComponent={<DeleteProduct productId={product?.id} />} />
                    </div>
                ))
            )}
        </div>
    )
}

export default ManageProductListings