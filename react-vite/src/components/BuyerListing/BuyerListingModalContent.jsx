

export default function BuyerListingModalContent ({ listing, closeModal }) {

    return (
        <div className='product-modal modal-no-image'>
        <div className='product-modal-content content-no-image'>
          <span className="close" onClick={closeModal}>&times;</span>
          <div className="product-modal-body">
            <p className="product-modal-product"><strong>Product:</strong> {listing.product_type}</p>
            <p className="product-modal-description"><strong>Description:</strong> {listing.description}</p>
            <p className="product-modal-location"><strong>Offer Price:</strong> Php {listing.offer_price} / kg</p>
            <p className="product-modal-location"><strong>Location:</strong> {listing.location}</p>
            <div className="farmer-section">
            <p><strong>Buyer:</strong> {listing.buyer}</p>
            <button className="product-modal-button" onClick={() => alert('Feature coming soon')}>View more inquiries</button>
            <button className="product-modal-button" onClick={() => alert('Feature coming soon')}>View buyer reviews</button>
            <button className="send-message-button" onClick={() => alert('Feature coming soon')}>Send Message</button>
            </div>
          </div>
        </div>
      </div>
    )

}
