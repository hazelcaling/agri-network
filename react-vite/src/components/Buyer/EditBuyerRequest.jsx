import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkLoadBuyerReq } from "../../redux/buyer";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import productTypes from './productTypes.js'
import { thunkEditBuyerReq } from "../../redux/buyer";

function EditBuyerRequest ({ buyerReqId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { closeModal } = useModal()
    const [submitted, setSubmitted] = useState(false)

    const [listing, setListing] = useState({
        product: '',
        description: '',
        offerPrice: '',
        location: '',
    })
    const [validationErrors, setValidationErrors] = useState({})

    useEffect(() => {
        dispatch(thunkLoadBuyerReq(buyerReqId)).then(data => {
            setListing({
                product: data.product_type,
                description: data.description,
                offerPrice: data.offer_price,
                location: data.location,
                buyer_id: data.buyer_id,
                id: data.id
            })
        })
    }, [dispatch, buyerReqId])

     const handleChange = e => {
        const { name, value } = e.target
        setListing({ ...listing, [name]: value })
     }

     useEffect(() => {
        const { product, description, offerPrice, location } = listing
        const errors = {}

        if (!product) errors.product = 'Product Type is required'
        if (!description) errors.description = 'Description is required'
        if (description.length < 5) errors.description = 'Description must be atleast 5 characters'
        if (!offerPrice) errors.offerPrice = 'Offer price is required'
        if (offerPrice <= 0) errors.offerPrice = 'Offer price must be more than 0'
        if (!location) errors.location = 'Location is required'
        if (location.length < 5) errors.location = 'Location must be atleast 5 characters long'
        setValidationErrors(errors)
    }, [listing])

    const reset = () => {
        setListing({
            product: '',
            description: '',
            offerPrice: '',
            location: '',
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setSubmitted(true)

        if (Object.values(validationErrors).length > 0) return

        const buyerReq = { ...listing}

        const updatedListing = await dispatch(thunkEditBuyerReq(buyerReq))

        if (updatedListing) {
            closeModal()
            navigate(`/buyer-requests/${updatedListing.id}`)
            reset()
        }
        return updatedListing

    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Edit Listing</h2>
                <form action="" onSubmit={handleSubmit} className="modal-form">
                    <select name="product" id="" value={listing.product} onChange={handleChange}>
                        <option value="">Select Product</option>
                        {productTypes.map((type, index) => (
                            <option value={type} key={index}>{type}</option>
                        ))}
                    </select>
                    {submitted && validationErrors.product && <span className="errors">{validationErrors.product}</span>}
                    <textarea type="text" name='description' value={listing.description} onChange={handleChange} placeholder="Description" />
                    {submitted && validationErrors.description && <span className="errors">{validationErrors.description}</span>}
                    <input type="number" name="offerPrice" value={listing.offerPrice} onChange={handleChange} placeholder="Offer Price" />
                    {submitted && validationErrors.offerPrice && <span className="errors">{validationErrors.offerPrice}</span>}
                    <input type="text" name="location" value={listing.location} onChange={handleChange} placeholder="Location" />
                    {submitted && validationErrors.location && <span className="errors">{validationErrors.location}</span>}
                    <button>Edit Listing</button>
                </form>
            </div>
        </div>
    )
}


export default EditBuyerRequest
