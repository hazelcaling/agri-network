import { csrfFetch } from "./csrf";

const LOAD_IMAGES = "images/LOAD_IMAGES";
const UPLOAD_IMAGE = "images/UPLOAD_IMAGE";
const DELETE_IMAGE = "images/DELETE_IMAGE";

const loadImages = (images) => {
    return {
        type: LOAD_IMAGES,
        images,
    };
};

const uploadImage = (image) => {
    return {
        type: UPLOAD_IMAGE,
        image,
    };
};

const deleteImage = (id) => {
    return {
        type: DELETE_IMAGE,
        id,
    };
};

export const getImagesByListingId = (listing_id) => async (dispatch) => {
    const response = await fetch(`/api/products/${listing_id}/images`);

    if (response.ok) {
        const images = await response.json();
        dispatch(loadImages(images));
    }
};


export const thunkUploadImage = (listingId, formData) => async (dispatch) => {
    const response = await csrfFetch(`/api/products/${listingId}/images/upload`, {
        method: "POST",
        body: formData,
    });

    if (response.ok) {
        const newImage = await response.json();
        dispatch(uploadImage(newImage));
        return newImage;
    }
};


export const thunkDeleteImage = (imageId) => async (dispatch) => {
    const response = await csrfFetch(`/api/product-images/${imageId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(deleteImage(imageId));
    }
};

const initialState = {};

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_IMAGES: {
            const newState = {};
            if (action.images) {
                action.images.forEach((image) => {
                    newState[image.id] = image;
                });
            }
            return newState;
        }
        case UPLOAD_IMAGE: {
            if (!state[action.image.id]) {
                const newState = {
                    ...state,
                    [action.image.id]: action.image,
                };
                return newState;
            }
            return {
                ...state,
                [action.image.id]: {
                    ...state[action.image.id],
                    ...action.image,
                },
            };
        }
        case DELETE_IMAGE: {
            const newState = { ...state };
            delete newState[action.id];
            return newState;
        }
        default:
            return state;
    }
};

export default imageReducer;
