import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkLoadBuyerReq } from "../../redux/buyer";

function BuyerRequestDetails() {
  const dispatch = useDispatch();
  const { buyerReqId } = useParams();
  const [listing, setListing] = useState({});

  useEffect(() => {
    dispatch(thunkLoadBuyerReq(buyerReqId)).then((data) => {
      setListing(data);
    });
  }, [dispatch, buyerReqId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="product-details-container">
      <div className="product-details">
        <div className="product-details-body">
          <p className="product-details-posted-date">
            <strong>Posted Date: </strong>
            {listing.created_at && formatDate(listing.created_at)}
          </p>
          <p className="product-details-description">
            <strong>Description: </strong> {listing.description}
          </p>
          <p className="product-details-description">
            <strong>Price: </strong>
            {listing.offer_price} per kg
          </p>
          <p className="product-detail-location">
            <strong>Location: </strong>
            {listing.location}
          </p>
          <p className="product-details-description">
            <strong>Buyer: </strong>
            {listing.buyer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BuyerRequestDetails;
