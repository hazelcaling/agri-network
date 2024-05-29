import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkCreateProduct } from "../../redux/product";
import { useModal } from "../../context/Modal";

function CreateProductForm () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();

    const initialVal = {
        product_type: '',
        description: '',
        location: '',
        available_now: false,
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
        const { product_type, description, location } = productData
        const errors = {}

        if (!product_type) errors.product_type = 'Product Type is required'
        if (!description) errors.description = 'Description is required'
        if (!location) errors.location = 'Location is required'
        if (product_type.length < 5) errors.product_type = 'Product Type must be atleast 5 characters long'
        if (description.length < 5) errors.description = 'Description must be atleast 5 characters long'
        if (description.location < 5) errors.location = 'Location must be atleast 5 characters long'
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

    return (
        <form onSubmit={handleSubmit} className="product-form" noValidate>
            <input type="text" name="product_type" value={productData.product_type} onChange={handleChange} placeholder="Product Type" />
            {submitted && validationErrors.product_type && (<span className="errors">{validationErrors.product_type}</span>)}
            <input type="text" name="description" value={productData.description} onChange={handleChange} placeholder="Description" />
            {submitted && validationErrors.description && (<span className="errors">{validationErrors.description}</span>)}
            <input type="text" name="location" value={productData.location} onChange={handleChange} placeholder="Location"/>
            {submitted && validationErrors.location && (<span className="errors">{validationErrors.location}</span>)}
            <label htmlFor="available_now">In Stock:</label>
            <select name="available_now" id="available_now" onChange={handleChange}>
                <option value="">Please select if yes or no</option>
                <option value='true'>Yes</option>
                <option value='false'>No</option>
            </select>
            {productData.available_now === 'false' && (
                <input type="date" name='harvest_date' value={productData.harvest_date} onChange={handleChange}/>
            )}
            <div><button>Submit</button></div>
        </form>
    )

}

export default CreateProductForm
