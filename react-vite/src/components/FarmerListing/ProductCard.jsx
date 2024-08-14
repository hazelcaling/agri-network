import { FaCheckCircle } from "react-icons/fa";
import { timeAgo, formatDate } from "../../helperFunc";
import { useLocation } from "react-router-dom";
import './ProductCard.css';

function ProductCard({ product, openModal }) {
    const location = useLocation();
    const isUserProductsPage = location.pathname === '/user/products';

    const cardClassName = isUserProductsPage ? 'product-card no-hover' : 'product-card';

    const handleClick = () => {
        openModal(product)
    }

    return (
        <div className="product-card-container">
            <div className={cardClassName} onClick={isUserProductsPage ? undefined : handleClick}>
                    <div className="product-card-details">
                        <div className="product-card-detail-row">
                            <span className="product-card-label">Product:</span>
                            <span className="product-card-content">{product?.product_type}</span>
                        </div>
                        <div className="product-card-detail-row">
                            <span className="product-card-content description"><span className="product-card-label">Description:</span>{product?.description}</span>
                        </div>
                        <div className="product-card-detail-row">
                            <span className="product-card-label">Location:</span>
                            <span className="product-card-content">{product?.location}</span>
                        </div>
                        <div className="product-card-detail-row product-card-availability">
                            <span className="product-card-label">{product?.available_now ? <><FaCheckCircle className="checkmark-icon" /> Available now</> : <p style={{color: '#607d8b'}}>Harvest Date:</p>}</span>
                            <span className="product-card-content">{!product?.available_now && formatDate(product?.harvest_date)}</span>
                        </div>
                    </div>
                <span className="product-card-date-posted">{timeAgo(product?.created_at)}</span>
            </div>
        </div>
    );
}

export default ProductCard;
