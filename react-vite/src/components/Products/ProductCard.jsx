import { Link } from "react-router-dom"
import '../Buyer/BuyerRequestCard.css'

function ProductCard ({ product }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        date.setDate(date.getDate() + 1)
        const options = { year: "numeric", month: "long",  day: 'numeric'}
        return date.toLocaleDateString("en-US", options)
    }

    return (
        <div className="listing-container">
        <div className="listing-card" >
            <Link to={`${product?.id}`}>
                <div className="details">
                <h3>{product?.product_type}</h3>
                <p><span className="label">Description: </span>{product?.description}</p>
                <p><span className="label">Location:</span>{product?.location}</p>
                <p><span className="label">
                    Harvest Date:
                    </span>{product?.available_now ? `In Stock` : formatDate(product?.harvest_date)}
                </p>
                <p><span className="label">Farmer:</span>{product?.farmer}</p>
                </div>
            </Link>
        </div>
        </div>
    )
}

export default ProductCard
