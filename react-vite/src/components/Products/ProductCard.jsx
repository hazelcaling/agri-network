import { Link } from "react-router-dom"

function ProductCard ({ product }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const options = { year: "numeric", month: "long",  day: 'numeric'}
        return date.toLocaleDateString("en-US", options)
    }

    if (!product) {
        <p>Loading...</p>
    }

    return (
        <div className="product-card">
            <Link to={`/products/${product?.id}`}>
                <h2>{product?.product_type}</h2>
                <p>{product?.description}</p>
                <p>{product?.location}</p>
                {product?.available_now ? `In Stock` : `Harvest Date: ${formatDate(product?.harvest_date)}`}
                <p>Farmer: {product?.farmer}</p>
            </Link>
        </div>
    )
}

export default ProductCard
