import { ADD_ITEM, FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, UPDATE_PRODUCT_STATUS } from "./actionTypes"
import axios from "axios";
// import data from '../data.json';


// https://reeco-qe00.onrender.com/allData

export const fetchData = (dispatch) => {

    dispatch({ type: FETCH_DATA_REQUEST });

    axios.get(`https://reeco-qe00.onrender.com/allData`)
        .then((res) => {
            // console.log(res.data, ">>>>>");
            dispatch({ type: FETCH_DATA_SUCCESS, payload: res.data });
        })
        .catch((error) => {
            dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
        })
}

export const updateProductStatus = (productId, status) => (dispatch) => {

    // console.log(productId, status,">>>>>>>>>");

    dispatch({ type: UPDATE_PRODUCT_STATUS, payload: { productId, status } })
}

export const addItem = (item) => (dispatch) => {
    // console.log(item, ">>>>>>>");
    dispatch({
        type: ADD_ITEM,
        payload: item,
    })
};