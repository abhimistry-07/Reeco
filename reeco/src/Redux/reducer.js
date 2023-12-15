import { ADD_ITEM, ADD_ITEM_FAILURE, ADD_ITEM_REQUEST, ADD_ITEM_SUCCESS, FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, UPDATE_PRODUCT_STATUS } from "./actionTypes";

const initState = {
    loading: false,
    error: null,
    items: {}
}

const reducer = (state = initState, action) => {
    switch (action.type) {

        case FETCH_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload,
            }

        case FETCH_DATA_FAILURE:
            return {
                ...state,
                error: action.payload
            }


        case UPDATE_PRODUCT_STATUS:
            return {
                ...state,
                loading: false,
                items: action.payload,
            };

        case ADD_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ADD_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload,
            };

        case ADD_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};


export default reducer;