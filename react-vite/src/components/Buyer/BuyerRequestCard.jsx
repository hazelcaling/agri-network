import { Link } from "react-router-dom"
import './BuyerRequestCard.css'

function BuyerRequestCard ({ listing }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const options = { year: "numeric", month: "long",  day: 'numeric'}
        return date.toLocaleDateString("en-US", options)
    }

    return (
        <div className="listing-container">
            <div className="listing-card">
                <Link to={`/buyer-requests/${listing.id}`}>
                <div className="details">
                    <h3>{listing.product_type}</h3>
                    <p><span className="label">Description:</span><span className="content">{listing.description}</span></p>
                    <p className="offer-price"><span className="label">Offer Price:</span><span className="content">Php {listing.offer_price} / kg</span></p>
                    <p className="location"><span className="label">Location:</span><span className="content">{listing.location}</span></p>
                    <p className="date-posted"><span className="label">Date Posted:</span><span className="content">{formatDate(listing.created_at)}</span></p>

                </div>
                </Link>
            </div>
        </div>
    )

}

export default BuyerRequestCard
