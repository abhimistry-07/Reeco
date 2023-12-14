import { FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS } from "./actionTypes"
import axios from "axios";

let data = {
    "id": 0,
    "supplier": "ABC Suppliers",
    "shippingDate": "2023-12-14",
    "total": 1500.75,
    "category": "Electronics",
    "department": "IT",
    "status": "Shipped",
    "products": [
        {
            "id": 0,
            "name": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. vvdoloribus laborum distinctio ipsum dolore recusandae?",
            "brand": "XYZ",
            "price": 899.99,
            "quantity": 2,
            "total": 1799.98,
            "status": "Approved"
        },
        {
            "id": 1,
            "name": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. vvdoloribus laborum distinctio ipsum dolore recusandae?",
            "brand": "Logitech",
            "price": 24.99,
            "quantity": 3,
            "total": 74.97,
            "status": "Missing"
        },
        {
            "id": 2,
            "name": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. vvdoloribus laborum distinctio ipsum dolore recusandae?",
            "brand": "Sony",
            "price": 75.79,
            "quantity": 1,
            "total": 75.79,
            "status": "Missing"
        }
    ]
}

export const fetchData = (dispatch) => {

    // dispatch({ type: FETCH_DATA_REQUEST });

    dispatch({ type: FETCH_DATA_SUCCESS, payload: data });

    // dispatch({ type: FETCH_DATA_FAILURE });
}