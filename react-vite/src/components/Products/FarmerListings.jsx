import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkUserListings } from "../../redux/product";
import { useParams } from "react-router-dom";

function FarmerListings () {
    const dispatch = useDispatch()
    const { farmerId } = useParams()
    const [listings, setListings] = useState([])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        date.setDate(date.getDate() + 1)
        const options = { year: "numeric", month: "long",  day: 'numeric'}
        return date.toLocaleDateString("en-US", options)
    }

    useEffect(() => {
        dispatch(thunkUserListings(farmerId)).then((data) => setListings(data))
    }, [dispatch, farmerId])

    return (
        <div>
            {listings.map((listing) => (
                <div className="listing-container" key={listing.id}>
                    <div className="listing-card">
                        <div className="details">
                            <h3>{listing.product_type}</h3>
                            <p><span className="label">Description: </span>{listing?.description}</p>
                            <p><span className="label">Location:</span>{listing?.location}</p>
                            <p><span className="label">Availability:</span>{listing?.available_now ? `In Stock` :
                            `Harvest Date: ${formatDate(listing?.harvest_date)}`}</p>
                            <p><span className="label">Farmer:</span>{listing?.farmer}</p>

                        </div>
                    </div>
                </div>
            ))}
        </div>


    )
}

export default FarmerListings
