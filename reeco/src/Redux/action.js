import { ADD_ITEM_FAILURE, ADD_ITEM_REQUEST, ADD_ITEM_SUCCESS, FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, UPDATE_PRODUCT_STATUS, UPDATE_PRODUCT_STATUS_FAILURE, UPDATE_PRODUCT_STATUS_REQUEST } from "./actionTypes"
import axios from "axios";

export const fetchData = (dispatch) => {

    dispatch({ type: FETCH_DATA_REQUEST });

    axios.get(`https://reeco-qe00.onrender.com/allData`)
        .then((res) => {
            dispatch({ type: FETCH_DATA_SUCCESS, payload: res.data });
        })
        .catch((error) => {
            dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
        })
}

export const updateProductStatus = (data) => (dispatch) => {

    dispatch({ type: UPDATE_PRODUCT_STATUS_REQUEST })

    axios
        .put(`https://reeco-qe00.onrender.com/allData`, data)
        .then((res) => {
            // console.log(res);
            dispatch({ type: UPDATE_PRODUCT_STATUS, payload: res.data })
        })
        .catch((error) => {
            dispatch({ type: UPDATE_PRODUCT_STATUS_FAILURE, payload: error.message });
        });

}

export const addItem = (item) => (dispatch) => {
    // console.log(item, ">>>>>>>");
    dispatch({ type: ADD_ITEM_REQUEST });

    // console.log(item, ">>>>>>");

    axios.post(`https://reeco-qe00.onrender.com/allData`, item)
        .then((res) => {
            // console.log(res);
            dispatch({ type: ADD_ITEM_SUCCESS, payload: res.data });
            // dispatch(fetchData);
        })
        .catch((error) => {
            dispatch({ type: ADD_ITEM_FAILURE, payload: error.message });
        });
};