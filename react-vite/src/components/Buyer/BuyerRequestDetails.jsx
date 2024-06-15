import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { thunkLoadBuyerReq } from "../../redux/buyer"

function BuyerRequestDetails() {
  const dispatch = useDispatch()
  const { buyerReqId } = useParams()
  const [listing, setListing] = useState({})

  useEffect(() => {
    dispatch(thunkLoadBuyerReq(buyerReqId)).then((data) => {
      setListing(data)
    })
  }, [dispatch, buyerReqId])

  const handleClick = () => {
    return alert("Feature coming soon")
  }

  return (
    <div className="listing">
      <h2 className="title">{listing.product_type}</h2>
      <p>
        <strong>Description: </strong> {listing.description}
      </p>
      <p>
        <strong>Price: </strong>
        {listing.offer_price} per kg
      </p>
      <p>
        <strong>Location: </strong>
        {listing.location}
      </p>
      <p>
        <strong>Buyer: </strong>
        {listing.buyer}
      </p>
      <button
        className="send-message"
        onClick={handleClick}
      >
        Send Message
      </button>
    </div>
  )
}

export default BuyerRequestDetails
