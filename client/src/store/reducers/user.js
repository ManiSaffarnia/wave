//Types
import { LOGIN_USER, REGISTER_USER, SET_USER_ERROR, LOGOUT_USER, ADD_TO_CART } from '../actions/types/types';


const userDefaultState = {
    loginSuccess: '',
    registerSuccess: '',
    userData: '',
    error: ''
};

const userReducer = (state = userDefaultState, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
};//end reducer

export default userReducer;