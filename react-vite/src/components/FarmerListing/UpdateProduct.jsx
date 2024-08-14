import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkEditProduct, thunkLoadProduct } from "../../redux/product";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import productTypes from "../BuyerListing/productTypes";
import { LoadingSpinner } from "../LoadingSpinner";
import { thunkDeleteImage, getImagesByListingId, thunkUploadImage } from "../../redux/image";
import './UpdateProduct.css'

function UpdateProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId } = useParams();
    const { closeModal } = useModal();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false)
    const [validationErrors, setValidationErrors] = useState({});
    const images = useSelector(state => state.images);
    const imageId = Object.values(images).find(image => image.id)?.id;
    const imageUrl = Object.values(images).find(image => image.url)?.url;


    const [listing, setListing] = useState({
        product: '',
        description: '',
        location: '',
        available_now: '',
        harvest_date: ''
    });

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
            });
        });
        dispatch(getImagesByListingId(productId));
    }, [dispatch, productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setListing({ ...listing, [name]: value });
    };

    useEffect(() => {
        const { product, description, location } = listing;
        const errors = {};

        if (!product) errors.product = 'Product Type is required';
        if (!description) errors.description = 'Description is required';
        if (description?.length < 5) errors.description = 'Description must be at least 5 characters long';
        if (!location) errors.location = 'Location is required';
        if (location?.length < 5) errors.location = 'Location must be at least 5 characters long';

        setValidationErrors(errors);
    }, [listing]);

    const reset = () => {
        setListing({
            product: '',
            description: '',
            location: '',
            available_now: '',
            harvest_date: ''
        });
    };

    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState('No file chosen')

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file);
            setFileName(file.name)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (Object.values(validationErrors).length > 0) return;

        const product = {
            ...listing,
            available_now: listing.available_now === 'true',
        };
        const updatedProduct = await dispatch(thunkEditProduct(product));

        // if (updatedProduct) {
        //     closeModal();
        //     navigate('/success', { state: { listingId: updatedProduct.id, isEdit: true } });
        //     reset();
        // }

        if (updatedProduct) {
            if (image) {
                const formData = new FormData();
                formData.append("image", image);
                // aws uploads can be a bit slow—displaying
                // some sort of loading message is a good idea
                const newImage = await dispatch(thunkUploadImage(updatedProduct.id, formData))
                if (newImage) {
                    setLoading(false)
                    closeModal()
                    // navigate(`/products/${createdProduct.id}`)
                    navigate('/success', { state: { listingId: updatedProduct.id, isEdit: true } });
                    reset()
                    return updatedProduct
                }
            } else {
                setLoading(false)
                closeModal()
                // navigate(`/products/${createdProduct.id}`);
                navigate('/success', { state: { listingId: updatedProduct.id, isEdit: true  } });
                reset()
                return updatedProduct
            }
        }

        return updatedProduct;
    };

    const close = () => {
        reset();
        closeModal();
        navigate('/user/products');
    };

    const getTom = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    const tom = getTom();

    const handleDelete = async (e) => {
        e.preventDefault();
        if (imageId) {
            try {
                await dispatch(thunkDeleteImage(imageId));
                dispatch(getImagesByListingId(productId)); // Refresh images or product data
            } catch (error) {
                console.error('Error deleting image:', error);
            }
        }
    };

    if (loading) {
        return <LoadingSpinner />
    }




    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={close}>&times;</span>
                <h2>Edit Listing</h2>
                <form className='modal-form'>
                    <select name="product" value={listing.product} onChange={handleChange} disabled>
                        <option value="">Select Product</option>
                        {productTypes.map((type, index) => (
                            <option value={type} key={index}>{type}</option>
                        ))}
                    </select>
                    {submitted && validationErrors.product && (
                        <span className="errors">{validationErrors.product}</span>
                    )}
                    <input type="text" name="description" value={listing.description} onChange={handleChange} placeholder="Description" />
                    {submitted && validationErrors.description && (
                        <span className="errors">{validationErrors.description}</span>
                    )}
                    <input type="text" name="location" value={listing.location} onChange={handleChange} placeholder="Location"/>
                    {submitted && validationErrors.location && (
                        <span className="errors">{validationErrors.location}</span>
                    )}
                    <label htmlFor="available_now">In Stock:</label>
                    <select name="available_now" id="available_now" onChange={handleChange} value={listing.available_now} required>
                        <option value="">In Stock?</option>
                        <option value='true'>Yes</option>
                        <option value='false'>No</option>
                    </select>
                    {listing.available_now === 'false' &&
                        <input type="date" name='harvest_date' value={listing.harvest_date} onChange={handleChange} min={tom}/>
                    }
                    {imageId ? (
                        <>
                            <img src={imageUrl} alt="Product" className="edit-image" />
                            <button className="delete-option" onClick={handleDelete}>Delete this image?</button>
                        </>
                    ) : (
                        <div className="upload-image-container">
                        <div className="upload-form">
                            <p className="optional">(Optional)</p>
                            <form encType="multipart/form-data">
                                <label htmlFor="upload" className="custom-file-upload">
                                    <span>Add Photo</span>
                                    <input
                                        id="upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </label>
                                <p className="file-name">{fileName}</p>
                            </form>
                        </div>
                    </div>
                    )}
                    <button className="submit" onClick={handleSubmit}>Edit Listing</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateProduct;
