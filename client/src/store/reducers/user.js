//Types
import { LOGIN_USER } from '../actions/types/types';


const userDefaultState = {
    loginSuccess: '',
    userData: '',
    error: ''
};

const userReducer = (state = userDefaultState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                loginSuccess: action.data.loginSuccess,
                userData: action.data.userData
            };
        case 'SET_USER_ERROR':
            return {
                ...state,
                loginSuccess: action.data.loginSuccess,
                error: action.data.error
            };
        default:
            return state;
    }
};//end reducer

export default userReducer;