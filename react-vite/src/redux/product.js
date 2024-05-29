import { csrfFetch } from "./csrf";


// Action Types
const LOAD_PRODUCTS = 'products/loadProducts'
const LOAD_PRODUCT = 'products/loadProductDetails'
const CREATE_PRODUCT = 'products/createProduct'
const DELETE_PRODUCT = 'products/deleteProduct'
const EDIT_PRODUCT = 'products/editProduct'


// Actions
const load = (products) => {
    return {
        type: LOAD_PRODUCTS,
        products
    }
}

const loadProduct = (product) => {
    return {
        type: LOAD_PRODUCT,
        product
    }
}

const createProduct = (product) => {
    return {
        type: CREATE_PRODUCT,
        product
    }
}

const deleteProduct = (productId) => {
    return {
        type: DELETE_PRODUCT,
        productId
    }
}

const editProduct = product => {
    return {
        type: EDIT_PRODUCT,
        product
    }
}

// Thunk

export const thunkLoadProducts = () => async dispatch => {
    const response = await fetch('/api/products');

    if (response.ok) {
        const data = await response.json()
        dispatch(load(data));
    }
}

export const thunkLoadProduct = (productId) => async dispatch => {
    const response = await fetch(`/api/products/${productId}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(loadProduct(data))
        return data
    }
}

export const thunkCreateProduct = (data) => async dispatch => {
    const response = await csrfFetch('/api/products/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        const newProduct = await response.json()
        dispatch(createProduct(newProduct))
        return newProduct
    }
}

export const thunkDeleteProduct = productId => async dispatch => {
    const response = await csrfFetch(`/api/products/${productId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(deleteProduct(productId));
    }
}

export const thunkEditProduct = (product) => async dispatch => {
    const response = await csrfFetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })

    if (response.ok) {
        const updatedProduct = response.json()
        dispatch(editProduct(updatedProduct))
        return updatedProduct
    }
}


// Reducer

const initialState = {}

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_PRODUCTS:  {
            const newState = {}
            action.products.forEach((product) => {
                newState[product.id] = product;
            });
            return newState;
        }
        case LOAD_PRODUCT: {
            return {
                ...action.product
            }
        }
        case CREATE_PRODUCT: {
            const newState = {
                ...state,
                [action.product.id]: action.product
            }
            return newState
        }
        case DELETE_PRODUCT:  {
            const newState = { ...state }
            delete newState[action.productId]
            return newState
        }
        case EDIT_PRODUCT:  {
            return {
                ...state,
                [action.product.id]: action.product
            }
        }
        default:
            return state;
    }
}

export default productReducer
