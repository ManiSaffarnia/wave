//Types
import { LOADING, UNSET_LOADING, LOGIN_USER, REGISTER_USER, SET_USER_ERROR, LOGOUT_USER, ADD_TO_CART, GET_PRODUCT_IN_CART, REMOVE_USER_CART_ITEM } from '../actions/types/types';


const userDefaultState = {
    loginSuccess: '',
    registerSuccess: '',
    userData: '',
    error: '',
    loading: false
};

const userReducer = (state = userDefaultState, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true };
        case UNSET_LOADING:
            return { ...state, loading: false };
        case LOGIN_USER:
            return { ...state, loginSuccess: action.data.loginSuccess ? action.data.loginSuccess : '', userData: action.data.userData ? action.data.userData : '' };
        case SET_USER_ERROR:
            return { ...state, loginSuccess: action.data.loginSuccess ? action.data.loginSuccess : '', error: action.data.error };
        case REGISTER_USER:
            return { ...state, registerSuccess: action.data.success, error: action.data.error };
        case LOGOUT_USER:
            return { ...state, loginSuccess: '', userData: '' };
        case ADD_TO_CART:
            return { ...state, userData: { ...state.userData, cart: action.data } };
        case GET_PRODUCT_IN_CART:
            return { ...state, cartDetail: action.data };
        case REMOVE_USER_CART_ITEM:
            return { ...state, cartDetail: action.data.cartDetail, userData: { ...state.userData, cart: action.data.cart } };
        default:
            return state;
    }
};//end reducer

export default userReducer;