import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadAllBuyerReq } from "../../redux/buyer";
import BuyerRequestCard from "./BuyerRequestCard";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteBuyerRequest from "./DeleteBuyerRequest";
import CreateBuyerRequest from "./CreateBuyerRequest";
import { LoadingSpinner } from "../LoadingSpinner";
import { useLocation, useNavigate } from "react-router-dom";
import './ManageBuyerReq.css';

function ManageBuyerRequests() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector(state => state.session.user?.id);
    const listings = useSelector(state => state.buyerRequests);
    const listingsArr = Object.values(listings).filter(listing => listing?.buyer_id === userId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const [isLoaded, setIsLoaded] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        dispatch(thunkLoadAllBuyerReq());
        setIsLoaded(true);
    }, [dispatch]);

    const handleClick = (listingId) => {
        navigate(`/user/buyer-requests/${listingId}/edit`);
    }

    if (!isLoaded) {
        return <LoadingSpinner />
    }

    return (
        <>
            <div className="create">
                <OpenModalButton buttonText='Create a new listing' modalComponent={<CreateBuyerRequest />} />
            </div>
            <h2>Manage your Listings</h2>
            <div className="manage-listing-container">
                {isLoaded && listingsArr.length === 0 ? (
                    <h2>No Listings yet</h2>
                ) : (
                    listingsArr.map((listing) => (
                        <div key={listing?.id} className="listing-card">
                            <BuyerRequestCard listing={listing} currentPath={currentPath} />
                            <div className="edit-delete-buttons">
                                <button className="small-buttons" onClick={() => handleClick(listing?.id)}>Edit</button>
                                <OpenModalButton buttonText='Delete' modalComponent={<DeleteBuyerRequest buyerReqId={listing?.id} />} />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}

export default ManageBuyerRequests;
