import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadProducts } from "../../redux/product";
import ProductCard from "./ProductCard";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteProduct from "./DeleteProduct";
import CreateProductForm from "./FarmerListingForm";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner";
import './ManageProductListings.css'

function ManageProductListings () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userId = useSelector(state => state.session.user?.id)
    const products = useSelector(state => state.products)
    const productsArr = Object.values(products).filter(product => product?.farmer_id === userId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(thunkLoadProducts())
        setIsLoaded(true)
    }, [dispatch])

    const handleClick = (productId) => {
        navigate(`/user/products/${productId}/edit`)
    }

    if (!isLoaded) return <LoadingSpinner />

    return (
        <>
            <div className="create">
                <OpenModalButton
                    buttonText='Create a new listing'
                    modalComponent={<CreateProductForm />}
                />
            </div>
            <h2>Manage your Listings</h2>
            <div className="manage-listing-container">
                {isLoaded && productsArr.length === 0 ? (
                    <h2>No Listing Yet</h2>
                ) : (
                    productsArr.map((product) => (
                        <div key={product?.id} className="listing-card">
                            <ProductCard product={product} />
                            <div className="edit-delete-buttons">
                                <button
                                    className="small-buttons edit"
                                    onClick={() => handleClick(product?.id)}
                                >
                                    Edit
                                </button>
                                <OpenModalButton
                                    buttonText='Delete'
                                    modalComponent={<DeleteProduct productId={product?.id} />}
                                />
                            </div>

                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default ManageProductListings
