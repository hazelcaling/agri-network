import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkLoadBuyerReq, thunkEditBuyerReq } from "../../redux/buyer.js";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal.jsx";
import productTypes from './productTypes.js'

function EditBuyerRequest () {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { listingId } = useParams()
    const { closeModal } = useModal()
    const [submitted, setSubmitted] = useState(false)

    const [listing, setListing] = useState({
        product: '',
        description: '',
        offerPrice: '',
        location: '',
    })

    useEffect(() => {
        dispatch(thunkLoadBuyerReq(listingId)).then(data => {
            setListing({
                product: data.product_type,
                description: data.description,
                offerPrice: data.offer_price,
                location: data.location,
                buyer_id: data.buyer_id,
                id: data.id
            })
        })
    }, [dispatch, listingId])

    const [validationErrors, setValidationErrors] = useState({})

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
            navigate('/success', { state: { listingId: updatedListing.id, isEdit: true, isBuyerListing: true    } });
            reset()
        }
        return updatedListing

    }

    const close = () => {
        reset()
        closeModal()
        navigate('/user/buyer-requests')
    }


    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={close}>&times;</span>
                <h2>Edit Listing</h2>
                <form action="" onSubmit={handleSubmit} className="modal-form">
                    {submitted && validationErrors.product && <span className="errors">{validationErrors.product}</span>}
                    <select name="product" id="" value={listing.product} onChange={handleChange} disabled>
                        <option value="">Select Product</option>
                        {productTypes.map((type, index) => (
                            <option value={type} key={index}>{type}</option>
                        ))}
                    </select>
                    {submitted && validationErrors.description && <span className="errors">{validationErrors.description}</span>}
                    <textarea type="text" name='description' value={listing.description} onChange={handleChange} placeholder="Description" />
                    {submitted && validationErrors.offerPrice && <span className="errors">{validationErrors.offerPrice}</span>}
                    <input type="number" name="offerPrice" value={listing.offerPrice} onChange={handleChange} placeholder="Offer Price" />
                    {submitted && validationErrors.location && <span className="errors">{validationErrors.location}</span>}
                    <input type="text" name="location" value={listing.location} onChange={handleChange} placeholder="Location" />
                    <button className="submit">Edit Listing</button>
                </form>
            </div>
        </div>
    )
}


export default EditBuyerRequest
