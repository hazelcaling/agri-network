import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkLoadProduct } from "../../redux/product";

function ProductDetails() {
    const dispatch = useDispatch()
    const { productId } = useParams()
    const product = useSelector(state => state?.products)
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const options = { year: "numeric", month: "long",  day: 'numeric'}
        return date.toLocaleDateString("en-US", options)
    }

    useEffect(() => {
        dispatch(thunkLoadProduct(productId))
    }, [dispatch, productId])

    return (
        <div>
            <h2>{product.product_type}</h2>
            <p>{product.description}</p>
            <p>{product.location}</p>
            <p>{product.available_now ? 'In Stock' : `Harvest Date: ${formatDate(product.harvest_date)}`}</p>
            <p>Farmer: {product?.farmer}</p>
        </div>
    )
}

export default ProductDetails
