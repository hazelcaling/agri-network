import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkLoadAllBuyerReq } from "../../redux/buyer";
import BuyerRequestCard from "./BuyerRequestCard";
import { SearchBar } from "../SearchFilter";

function AllBuyerRequests () {
    const dispatch = useDispatch()
    const [buyerListings, setBuyerListings] = useState([])
    const isLoggedIn = useSelector(state => state.session.user !== null)

    useEffect(() => {
        dispatch(thunkLoadAllBuyerReq()).then((data) => {
            setBuyerListings(data)
        })
    }, [dispatch])

    return (
        <>
            {isLoggedIn && (
                <button>Create NEW Listing</button>
            )}
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
