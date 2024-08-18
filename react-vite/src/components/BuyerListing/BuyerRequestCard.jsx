import { timeAgo } from '../../helperFunc'
import { useLocation } from 'react-router-dom';
import './BuyerRequestCard.css'

function BuyerRequestCard ({ listing, openModal, currentPath }) {
    const location = useLocation();
    const isUserProductsPage = location.pathname === '/user/buyer-requests';

    const cardClassName = isUserProductsPage ? 'buyer-card no-hover' : 'buyer-card';

    const handleClick = () => {
        openModal(listing)
    }

    return (
        <div className="buyer-card-container" onClick={isUserProductsPage ? undefined : handleClick}>
            <div className={`${cardClassName} buyer`}>
                <div className="product-card-details buyer">
                    <div className="product-card-detail-row">
                        <span className="product-card-label">Product:</span>
                        <span className="product-card-content">{listing?.product_type}</span>
                    </div>
                    <div className="product-card-detail-row">
                        <span className="product-card-content description"><span className="product-card-label">Description:</span>{listing?.description}</span>
                    </div>
                    <div className="product-card-detail-row">
                        <span className="product-card-label">Offer Price:</span>
                        <span className="product-card-content">Php {listing.offer_price} / kg</span>
                    </div>
                    <div className="product-card-detail-row">
                        <span className="product-card-label">Location:</span>
                        <span className="product-card-content">{listing.location}</span>
                    </div>
                    <div className="product-card-detail-row">
                        <span className="product-card-label">Buyer:</span>
                        <span className="product-card-content">{listing.buyer}</span>
                    </div>
                </div>
                    {currentPath !== '/user/buyer-requests' && <button className="send-message-button-buyer" onClick={() => alert('Feature coming soon')}>Send Message</button>}
                    <span className="product-card-date-posted">{timeAgo(listing?.created_at)}</span>
            </div>
        </div>
    )
}


export default BuyerRequestCard
