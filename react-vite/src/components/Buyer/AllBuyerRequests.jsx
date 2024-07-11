import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkLoadAllBuyerReq } from "../../redux/buyer";
import BuyerRequestCard from "./BuyerRequestCard";
import { SearchBar } from "../SearchFilterSort";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateBuyerRequest from "./CreateBuyerRequest";

function AllBuyerRequests () {
    const dispatch = useDispatch()
    const [buyerListings, setBuyerListings] = useState([])
    const isLoggedIn = useSelector(state => state.session.user !== null)
    const isBuyer = useSelector(state => state.session.user?.user_type === 'buyer')

    useEffect(() => {
        dispatch(thunkLoadAllBuyerReq()).then((data) => {
            setBuyerListings(data)
        })
    }, [dispatch])

    return (
        <>
            {!isLoggedIn ?
                (<div className='create'>
                    <OpenModalButton buttonText='Create a new Listing' modalComponent='Login is required to create listing'/>
                </div>) :
                isBuyer ? <div className='create'><OpenModalButton buttonText='Create a new Listing' modalComponent={<CreateBuyerRequest />}/></div> : ''
            }
            <SearchBar />
            <div>
                {buyerListings.map((listing) => (
                    <BuyerRequestCard key={listing.id} listing={listing} />
                ))}
            </div>
        </>
    )
}


export default AllBuyerRequests
