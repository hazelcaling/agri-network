import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkLoadProduct } from "../../redux/product";
import { Link } from "react-router-dom";
import './ProductDetails.css'

function ProductDetails() {
    const dispatch = useDispatch()
    const { productId } = useParams()
    const product = useSelector(state => state?.products)
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        date.setDate(date.getDate() + 1)
        const options = { year: "numeric", month: "long",  day: 'numeric'}
        return date.toLocaleDateString("en-US", options)
    }

    useEffect(() => {
        dispatch(thunkLoadProduct(productId))
    }, [dispatch, productId])

    const handleClick = () => {
        return alert('Feature coming soon')
    }

    return (
        <div className="listing">
                <h2 className="title">{product.product_type}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-location">{product.location}</p>
                <p className="product-stock-harvest">{product.available_now ? 'In Stock' : `Harvest Date: ${formatDate(product.harvest_date)}`}</p>
                <p className="farmer">Farmer: <Link to={`/farmers/${product.farmer_id}/products`}>{product?.farmer}</Link></p>
                <button className="send-message" onClick={handleClick}>Send Message</button>
        </div>
    )
}

export default ProductDetails
