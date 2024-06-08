import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { thunkLoadAllBuyerReq } from "../../redux/buyer";
import BuyerRequestCard from "./BuyerRequestCard";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteBuyerRequest from "./DeleteBuyerRequest";
import CreateBuyerRequest from "./CreateBuyerRequest";
import './ManageBuyerReq.css'
import { useNavigate } from "react-router-dom";

function ManageBuyerRequests () {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const userId = useSelector(state => state.session.user?.id)
    const listings = useSelector(state => state.buyerRequests)
    const listingsArr = Object.values(listings).filter(listing => listing?.buyer_id === userId)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(thunkLoadAllBuyerReq())
        setIsLoaded(true)
    }, [dispatch])

    const handleClick = (listingId) => {
        navigate(`/user/buyer-requests/${listingId}/edit`)
    }

    return (
        <>
            <div className="create"><OpenModalButton buttonText='Create NEW Listing' modalComponent={<CreateBuyerRequest />}/></div>
            <div>
                {isLoaded && listingsArr.length === 0 ? <h2>No Listings yet</h2> : listingsArr.map((listing) => (
                    <div key={listing?.id}>
                        <BuyerRequestCard listing={listing}/>
                        <div className="edit-delete-buttons">
                        <button className="small-buttons" onClick={() => handleClick(listing?.id)}>Edit</button>
                        <OpenModalButton buttonText='Delete' modalComponent={<DeleteBuyerRequest buyerReqId={listing?.id}/>}/>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ManageBuyerRequests
