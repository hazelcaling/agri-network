import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { thunkBuyerListings } from "../../redux/buyer";
import BuyerRequestCard from "./BuyerRequestCard";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteBuyerRequest from "./DeleteBuyerRequest";
import CreateBuyerRequest from "./CreateBuyerRequest";
import EditBuyerRequest from "./EditBuyerRequest";
import './ManageBuyerReq.css'

function ManageBuyerRequests () {
    const dispatch = useDispatch();
    const [listings, setListings] = useState([])
    const userId = useSelector(state => state.session?.user?.id)

    useEffect(() => {
        dispatch(thunkBuyerListings(userId)).then((data) => {
            setListings(data)
        })
    }, [dispatch, userId])

    return (
        <>
            <div className="create"><OpenModalButton buttonText='Create NEW Listing' modalComponent={<CreateBuyerRequest />}/></div>
            <div>
                {listings.map((listing) => (
                    <div key={listing?.id}>
                        <BuyerRequestCard listing={listing}/>
                        <div className="edit-delete-buttons">
                        <OpenModalButton buttonText='Edit' modalComponent={<EditBuyerRequest buyerReqId={listing?.id}/>}  />
                        <OpenModalButton buttonText='Delete' modalComponent={<DeleteBuyerRequest buyerReqId={listing?.id}/>}/>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ManageBuyerRequests
