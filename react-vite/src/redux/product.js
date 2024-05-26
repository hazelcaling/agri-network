import { startTransition } from "react"


// Action Types
const LOAD_PRODUCTS = 'products/loadProducts'
const LOAD_PRODUCT = 'products/loadProductDetails'
// const ADD_PRODUCT = 'products/addProduct'
// const DELETE_PRODUCT = 'products/deleteProduct'


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

// Thunk

export const thunkLoadProducts = () => async dispatch => {
    const response = await fetch('/api/products');

    if (response.ok) {
        const products = await response.json()
        dispatch(load(products));
    }
}


export const thunkLoadProduct = (productId) => async dispatch => {
    const response = await fetch(`/api/products/${productId}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(loadProduct(data))
    }
}

// Reducer

const initialState = {}

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_PRODUCTS:  {
            const newState = {}
            action.products.forEach((product) => {
                newState[product.id] = product
            });
            return newState
        }
        case LOAD_PRODUCT: {
            return {
                ...action.product
            }
        }
        default:
            return state;
    }
}

export default productReducer
