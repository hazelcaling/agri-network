// Action Types
const LOAD_PRODUCTS = 'products/loadProducts'


// Actions
const load = (products) => {
    return {
        type: LOAD_PRODUCTS,
        products
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
        default:
            return state;
    }
}

export default productReducer
