import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkCreateProduct } from "../../redux/product";
import { useModal } from "../../context/Modal";
import productTypes from "../Buyer/productTypes";

function CreateProductForm () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();

    const initialVal = {
        product_type: '',
        description: '',
        location: '',
        available_now: '',
        harvest_date: ''
    }

    const [submitted, setSubmitted] = useState(false)
    const [productData, setProductData] = useState({ ...initialVal })
    const [validationErrors, setValidationErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setProductData({ ...productData, [name]: value })
    }

    useEffect(() => {
        const { description, location } = productData
        const errors = {}

        if (!description) errors.description = 'Description is required'
        if (description && description.length < 5) errors.description = 'Description must be atleast 5 characters long'
        if (!location) errors.location = 'Location is required'
        if (location && location.length < 5) errors.location = 'Please provide a valid location'

        setValidationErrors(errors)
    }, [productData])

    const reset = () => {
        setProductData({ ...initialVal })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        if (Object.values(validationErrors).length > 0) return

        const product = {
            ...productData,
            available_now: productData.available_now === 'true',
            harvest_date: productData.harvest_date ? new Date(productData.harvest_date).toISOString().slice(0, 10) : null
        }
        const createdProduct = await dispatch(thunkCreateProduct(product))

        if (createdProduct) {
            closeModal();
            navigate(`/products/${createdProduct.id}`)
            reset()
        }
        return createdProduct
    }

    const getTom = () => {
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(today.getDate() + 1)
        return tomorrow.toISOString().split('T')[0]
    }

    const tom = getTom()


    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Please provide Product Details</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <select name="product_type" id="" value={productData.product_type} onChange={handleChange} required>
                        <option value="">Select Product</option>
                        {productTypes.map((type, index) => (
                            <option value={type} key={index}>{type}</option>))}
                    </select>
                    {submitted && validationErrors.description && (<p className="errors">{validationErrors.description}</p>)}
                    <input type="text" name="description" value={productData.description} onChange={handleChange} placeholder="Description" />
                    {submitted && validationErrors.location && (<span className="errors">{validationErrors.location}</span>)}
                    <input type="text" name="location" value={productData.location} onChange={handleChange} placeholder="Location"/>
                    {submitted && validationErrors.available_now && (<span className="errors">{validationErrors.available_now}</span>)}
                    <select name="available_now" value={productData.available_now} id="" onChange={handleChange} required>
                        <option value="">In Stock?</option>
                        <option value='true'>Yes</option>
                        <option value='false'>No</option>
                    </select>
                    {productData.available_now === 'false' && (
                    <input type="date" name='harvest_date' value={productData.harvest_date} onChange={handleChange} required={productData.available_now === 'false'} min={tom}/>
                    )}
                    <button className="submit">Submit Listing</button>
                </form>
            </div>
        </div>
    )

}

export default CreateProductForm
