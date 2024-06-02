import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkLoadBuyerReq } from "../../redux/buyer";
import { Link } from "react-router-dom";

function BuyerRequestDetails() {
    const dispatch = useDispatch()
    const { buyerReqId } = useParams()
    const [listing, setListing] = useState({})

    useEffect(() => {
        dispatch(thunkLoadBuyerReq(buyerReqId)).then((data) => {
            setListing(data)
        })
    }, [dispatch, buyerReqId])

    return (
        <div>
            <h2>{listing.product_type}</h2>
            <p>Description: {listing.description}</p>
            <p>Price: {listing.offer_price} per kg</p>
            <p>Location: {listing.location}</p>
            <p>Buyer: <Link to={`/buyers/${listing.buyer_id}/buyer-requests`}>{listing.buyer}</Link></p>
        </div>
    )
}

export default BuyerRequestDetails
