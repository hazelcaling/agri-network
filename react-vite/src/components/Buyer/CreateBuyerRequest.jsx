import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkCreateBuyerReq } from "../../redux/buyer";
import './CreateBuyerReq.css'
import productTypes from './productTypes.js'

function CreateBuyerRequest() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { closeModal } = useModal()

    const userId = useSelector(state => state.session?.user?.id)
    const [submitted, setSubmitted] = useState(false)
    const [product, setProduct] = useState('')
    const [description, setDescription] = useState('')
    const [offerPrice, setOfferPrice] = useState('')
    const [location, setLocation] = useState('')
    const [validationErrors, setValidationErrors] = useState({})

    useEffect(() => {
        const errors = {}
        if (!description) errors.description = 'Description is required'
        if (description.length < 5) errors.description = 'Description must be atleast 5 characters'
        if (!offerPrice) errors.offerPrice = 'Offer price is required'
        if (offerPrice <= 0) errors.offerPrice = 'Offer price must be more than 0'
        if (!location) errors.location = 'Location is required'
        setValidationErrors(errors)
    }, [product, description, offerPrice, location])

    const reset = () => {
        setProduct('')
        setDescription('')
        setOfferPrice('')
        setLocation('')
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setSubmitted(true)

        if (Object.values(validationErrors).length > 0) return

        const newListing = await dispatch(thunkCreateBuyerReq({
            buyer_id: userId,
            product_type: product,
            description: description,
            offer_price: offerPrice,
            location: location
        }))

        if (newListing) {
            console.log('new', newListing)
            closeModal();
            navigate(`/buyer-requests/${newListing.id}`)
            reset()
        }
        return newListing
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Please provide the details of the product you are looking to purchase</h2>
                <form action="" onSubmit={handleSubmit} className="modal-form">
                    <select name="product" id="" value={product} onChange={(e) => setProduct(e.target.value)}>
                        <option value="">Select Product</option>
                        {productTypes.map((type, index) => (
                            <option value={type} key={index}>{type}</option>
                        ))}
                    </select>
                    {submitted && validationErrors.productType && <span className="errors">{validationErrors.productType}</span>}
                    <textarea type="text" name='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                    {submitted && validationErrors.description && <span className="errors">{validationErrors.description}</span>}
                    <input type="number" name="offer_price" value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} placeholder="Offer Price" />
                    {submitted && validationErrors.offerPrice && <span className="errors">{validationErrors.offerPrice}</span>}
                    <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
                    {submitted && validationErrors.location && <span className="errors">{validationErrors.location}</span>}
                    <button>Submit Requirement</button>
                </form>
            </div>
        </div>
    )
}

export default CreateBuyerRequest
