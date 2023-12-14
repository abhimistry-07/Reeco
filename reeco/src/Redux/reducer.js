import { FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS } from "./actionTypes";

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

        default:
            return state;
    }
};


export default reducer;