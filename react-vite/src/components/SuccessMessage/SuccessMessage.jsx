import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SuccessMessage.css';

function SuccessMessage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { listingId, isEdit, isBuyerListing } = location.state || {};
    let url

    isBuyerListing ? url = 'buyer-requests' : url = 'products'

    useEffect(() => {
        if (!listingId) {
          navigate('/'); // Redirect to homepage if no listingId in state
          return;
        }

      }, [listingId, navigate]);

      const message = isEdit ? 'Your listing has been successfully edited.' : 'Your listing has been successfully created.';

  return (
    <div className="success-message-container">
      <div className="success-message-card">
        <h1>Success!</h1>
        <p>{message}</p>
        <p><Link to={`/${url}/${listingId}`}>See listing details</Link></p>
      </div>
    </div>
  );
}

export default SuccessMessage;
