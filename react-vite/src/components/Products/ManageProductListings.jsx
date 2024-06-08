import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadProducts } from "../../redux/product";
import ProductCard from "./ProductCard";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteProduct from "./DeleteProduct";
import CreateProductForm from "./CreateProductForm";
import { useNavigate } from "react-router-dom";


function ManageProductListings () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userId = useSelector(state => state.session.user?.id)
    const products = useSelector(state => state.products)
    const productsArr = Object.values(products).filter(product => product?.farmer_id === userId)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(thunkLoadProducts())
        setIsLoaded(true)
    }, [dispatch])

    const handleClick = (productId) => {
        navigate(`/user/products/${productId}/edit`)
    }

    return (
        <>
            <div className="create"><OpenModalButton buttonText='Create a new listing' modalComponent={<CreateProductForm />}/></div>
            {isLoaded && productsArr.length === 0 ? <h2>No Listing Yet</h2> : (
                productsArr.map((product) => (
                    <div key={product?.id}>
                        <ProductCard  product={product}/>
                        <div className="edit-delete-buttons">
                            <button className="small-buttons" onClick={() => handleClick(product?.id)}>Edit</button>

                            <OpenModalButton
                                buttonText='Delete'
                                modalComponent={<DeleteProduct productId={product?.id} />} />
                        </div>
                    </div>
                ))
            )}
        </>
    )
}

export default ManageProductListings
