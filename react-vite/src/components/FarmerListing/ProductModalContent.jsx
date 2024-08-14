import { FaCheckCircle } from "react-icons/fa";
import { formatDate } from "../../helperFunc";
import { thunkLoadProduct } from "../../redux/product";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './ProductModalContent.css'

const ProductModalContent = ({ product, closeModal }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(thunkLoadProduct(product.id));
  }, [dispatch, product.id]);

  const prod = useSelector(state => state.products)

  const hasImage = !!prod.url;

    return (
      <div className={`product-modal ${hasImage ? 'modal-with-image' : 'modal-no-image'}`}>
        <div className={`product-modal-content ${hasImage ? 'content-with-image' : 'content-no-image'}`}>
          <span className="close" onClick={closeModal}>&times;</span>
          {hasImage && (
            <div className="product-modal-images">
              <img src={prod.url}/>
            </div>
          )}
          <div className="product-modal-body">
            <p className="product-modal-product"><strong>Product:</strong> {product.product_type}</p>
            <p className="product-modal-description"><strong>Description:</strong> {product.description}</p>
            <p className="product-modal-location"><strong>Location:</strong> {product.location}</p>
            <p className="product-modal-harvest-date">
              <strong>{product.available_now ? 'Available now' : 'Harvest Date:'}</strong> {product.available_now ? <FaCheckCircle className="checkmark-icon" /> : formatDate(product.harvest_date)}
            </p>
            <div className="farmer-section">
            <p><strong>Farmer:</strong> {prod.farmer}</p>
            <button className="product-modal-button" onClick={() => alert('Feature coming soon')}>View more products</button>
            <button className="product-modal-button" onClick={() => alert('Feature coming soon')}>View farmer reviews</button>
            <button className="send-message-button" onClick={() => alert('Feature coming soon')}>Send Message</button>
            </div>
          </div>
        </div>
      </div>
    );
  };


export default ProductModalContent;
