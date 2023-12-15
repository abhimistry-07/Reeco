import { ADD_ITEM, FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, UPDATE_PRODUCT_STATUS } from "./actionTypes";

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
            const { productId, status } = action.payload;

            // console.log(productId, status,">>>>>>>>>");

            const updatedItems = {
                ...state.items,
                products: state.items.products.map((product) => {
                    if (product.id === productId) {
                        console.log("Reducer: Updating product", product.id);

                        return {
                            ...product,
                            status: status,
                        };
                    }
                    return product;
                }),
            };

            console.log("Reducer: Updated items", updatedItems);

            return {
                ...state,
                items: updatedItems,
            };

        case ADD_ITEM:
            return {
                ...state,
                items: {
                    ...state.items,
                    products: [...state.items.products, action.payload],
                },
            };

        default:
            return state;
    }
};


export default reducer;