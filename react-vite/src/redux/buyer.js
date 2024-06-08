import { csrfFetch } from "./csrf";


// Action Types
const LOAD_BUYER_REQUESTS = 'buyerRequests/loadBuyerRequests'
const LOAD_BUYER_REQUEST = 'buyerRequests/loadBuyerReqDetails'
const CREATE_BUYER_REQUEST = 'buyerRequests/createBuyerReq'
const DELETE_BUYER_REQUEST = 'buyerRequests/deleteBuyerReq'
const EDIT_BUYER_REQUEST = 'buyerRequests/editBuyerReq'


// Actions
const loadAllBuyerReq = (buyerRequests) => {
    return {
        type: LOAD_BUYER_REQUESTS,
        buyerRequests
    }
}

const loadBuyerReq = buyerReq => {
    return {
        type: LOAD_BUYER_REQUEST,
        buyerReq
    }
}

const create = (newBuyerReq) => {
    return {
        type: CREATE_BUYER_REQUEST,
        newBuyerReq
    }
}

const deleteBuyerReq = (buyerReqId) => {
    return {
        type: DELETE_BUYER_REQUEST,
        buyerReqId
    }
}

const edit = updatedBuyerReq => {
    return {
        type: EDIT_BUYER_REQUEST,
        updatedBuyerReq
    }
}

// Thunk

export const thunkLoadAllBuyerReq = () => async dispatch => {
    const response = await fetch('/api/buyer-requests');
    console.log('response', response)

    if (response.ok) {
        const buyerRequests = await response.json()
        dispatch(loadAllBuyerReq(buyerRequests))
        return buyerRequests
    }
}

export const thunkLoadBuyerReq = (buyerReqId) => async dispatch => {
    const response = await fetch(`/api/buyer-requests/${buyerReqId}`)

    if (response.ok) {
        const buyerReq = await response.json()
        dispatch(loadBuyerReq(buyerReq))
        return buyerReq
    }
}

export const thunkBuyerListings = (buyerId) => async dispatch => {
    const response = await fetch(`/api/buyer-requests/buyers/${buyerId}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(loadAllBuyerReq(data))
        return data
    }
}

export const thunkCreateBuyerReq = (data) => async dispatch => {
    const response = await csrfFetch('/api/buyer-requests/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        const newBuyerReq = await response.json()
        dispatch(create(newBuyerReq))
        return newBuyerReq
    }
}

export const thunkDeleteBuyerReq = buyerReqId => async dispatch => {
    const response = await csrfFetch(`/api/buyer-requests/${buyerReqId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(deleteBuyerReq(buyerReqId));
    }
}

export const thunkEditBuyerReq = (data) => async dispatch => {
    const response = await csrfFetch(`/api/buyer-requests/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        const updatedBuyerReq = response.json()
        dispatch(edit(updatedBuyerReq))
        return updatedBuyerReq
    }
}


// Reducer

const initialState = {}

const buyerRequestReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_BUYER_REQUESTS:  {
            const newState = {}
            action.buyerRequests.forEach((buyerReq) => {
                newState[buyerReq.id] = buyerReq;
            });
            return newState;
        }
        case LOAD_BUYER_REQUEST: {
            return {
                ...action.buyerReq
            }
        }
        case CREATE_BUYER_REQUEST: {
            const newState = {
                ...state,
                [action.newBuyerReq.id]: action.newBuyerReq
            }
            return newState
        }
        case DELETE_BUYER_REQUEST:  {
            const newState = { ...state }
            delete newState[action.buyerReqId]
            return newState
        }
        case EDIT_BUYER_REQUEST:  {
            return {
                ...state,
                [action.updatedBuyerReq.id]: action.updatedBuyerReq
            }
        }
        default:
            return state;
    }
}

export default buyerRequestReducer
