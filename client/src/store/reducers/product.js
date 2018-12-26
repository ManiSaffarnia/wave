//Types
import { GET_PRODUCTS_BY_SELL, GET_PRODUCTS_BY_ARRIVAL } from '../actions/types/types';


const productDefaultState = {
};

const productReducer = (state = productDefaultState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_BY_SELL:
            return { ...state, productBySell: action.data.products };
        case GET_PRODUCTS_BY_ARRIVAL:
            return { ...state, productByArrival: action.data.products };
        default:
            return state;
    }
};//end reducer

export default productReducer; 