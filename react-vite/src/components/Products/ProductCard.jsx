function ProductCard ({ product }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const options = { year: "numeric", month: "long",  day: 'numeric'}
        return date.toLocaleDateString("en-US", options)
    }

    return (
        <div className="product-card">
        <h2>{product.product_type}</h2>
        <p>{product.description}</p>
        <p>{product.location}</p>
        {product.available_now ? `In Stock` : `Harvest Date: ${formatDate(product.harvest_date)}`}
        <p>Farmer: {product.farmer}</p>
        </div>
    )
}

export default ProductCard
