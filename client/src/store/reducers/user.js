//Types
import { LOGIN_USER, REGISTER_USER, SET_USER_ERROR, LOGOUT_USER } from '../actions/types/types';


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
        default:
            return state;
    }
};//end reducer

export default userReducer;