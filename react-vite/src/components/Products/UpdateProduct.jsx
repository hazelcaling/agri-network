import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkEditProduct, thunkLoadProduct } from "../../redux/product";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import productTypes from "../Buyer/productTypes";

function UpdateProduct() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { productId } = useParams()
    const { closeModal } = useModal()
    const [submitted, setSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})
    const [listing, setListing] = useState({
        product: '',
        description: '',
        location: '',
        available_now: '',
        harvest_date: ''
    })

    useEffect(() => {
        dispatch(thunkLoadProduct(productId)).then(data => {
            setListing({
                product: data.product_type,
                description: data.description,
                location: data.location,
                available_now: data.available_now || false,
                harvest_date: data.harvest_date ? new Date(data.harvest_date).toISOString().substring(0,10) : '',
                farmer_id: data.farmer_id,
                id: data.id
            })
        })
    }, [dispatch, productId])

    const handleChange = (e) => {
        const { name, value } = e.target
        setListing({ ...listing, [name]: value })
    }

    useEffect(() => {
        const { product, description, location } = listing
        const errors = {}

        if (!product) errors.product = 'Product Type is required'
        if (!description) errors.description = 'Description is required'
        if (description?.length < 5) errors.description = 'Description must be atleast 5 characters long'
        if (!location) errors.location = 'Location is required'
        if (location?.length < 5) errors.location = 'Location must be atleast 5 characters long'

        setValidationErrors(errors)
    }, [listing])

    const reset = () => {
        setListing({
            product: '',
            description: '',
            location: '',
            available_now: '',
            harvest_date: ''
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        if (Object.values(validationErrors).length > 0) return

        const product = {
            ...listing,
            available_now: listing.available_now === 'true',
        }
        const updatedProduct = await dispatch(thunkEditProduct(product))

        if (updatedProduct) {
            closeModal();
            navigate(`/products/${updatedProduct.id}`)
            reset()
        }

        return updatedProduct
    }

    const close = () => {
        reset()
        closeModal()
        navigate('/user/products')
    }


    return (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={close}>&times;</span>
                    <h2>Edit Listing</h2>
                    <form onSubmit={handleSubmit} className='modal-form'>
                        <select name="product" id="" value={listing.product} onChange={handleChange}>
                            <option value="">Select Product</option>
                            {productTypes.map((type, index) => (
                                <option value={type} key={index}>{type}</option>
                            ))}
                        </select>
                        {submitted && validationErrors.product && (<span className="errors">{validationErrors.product}</span>)}
                        <input type="text" name="description" value={listing.description} onChange={handleChange} placeholder="Description" />
                        {submitted && validationErrors.description && (<span className="errors">{validationErrors.description}</span>)}
                        <input type="text" name="location" value={listing.location} onChange={handleChange} placeholder="Location"/>
                        {submitted && validationErrors.location && (<span className="errors">{validationErrors.location}</span>)}
                        <label htmlFor="available_now">In Stock:</label>
                        <select name="available_now" id="available_now" onChange={handleChange} value={listing.available_now} required>
                            <option value="">Please select if yes or no</option>
                            <option value='true'>Yes</option>
                            <option value='false'>No</option>
                        </select>
                        {listing.available_now === false &&
                        (<input type="date" name='harvest_date' value={listing.harvest_date} onChange={handleChange}/>)}
                        <div><button>Submit</button></div>
                    </form>
                </div>
            </div>
    )

}

export default UpdateProduct
