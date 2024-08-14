import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkBuyerListings } from "../../redux/buyer";

function UserBuyerRequests () {
    const { buyerId } = useParams()
    const dispatch = useDispatch()
    const [buyerListings, setBuyerListings] = useState([])

    useEffect(() => {
        dispatch(thunkBuyerListings(buyerId)).then((data) => {
            setBuyerListings(data)
        })
    }, [dispatch, buyerId])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const options = { year: "numeric", month: "long",  day: 'numeric'}
        return date.toLocaleDateString("en-US", options)
    }

    return (
        <div>
            {buyerListings.map((listing) => (
                <div key={listing.id}>
                    <h2>{listing.product_type}</h2>
                    <p>Description: {listing.description}</p>
                    <p>Offer Price: {listing.offer_price}</p>
                    <p>Location: {listing.location}</p>
                    <p>Date Posted: {formatDate(listing.created_at)}</p>
                    <button>Message {listing.buyer}</button>
                </div>
            ))}
        </div>
    )
}


export default UserBuyerRequests
