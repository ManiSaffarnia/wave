//Types
import { GET_PRODUCTS_BY_SELL, GET_PRODUCTS_BY_ARRIVAL, GET_BRANDS, GET_WOODS, GET_PRODUCTS_TO_SHOP, ADD_PRODUCT, CLEAR_PRODUCT } from '../actions/types/types';


const productDefaultState = {
};

const productReducer = (state = productDefaultState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_BY_SELL:
            return { ...state, productBySell: action.data.products };
        case GET_PRODUCTS_BY_ARRIVAL:
            return { ...state, productByArrival: action.data.products };
        case GET_BRANDS:
            return { ...state, brands: action.data.brands };
        case GET_WOODS:
            return { ...state, woods: action.data.woods };
        case GET_PRODUCTS_TO_SHOP:
            return { ...state, toShop: action.data.articles, toShopSize: action.data.size };
        case ADD_PRODUCT:
            return { ...state, addedProduct: action.data };
        case CLEAR_PRODUCT:
            return { ...state, addedProduct: '' };
        default:
            return state;
    }
};//end reducer

export default productReducer; 