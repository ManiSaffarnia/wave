import axios from 'axios';
//Types
import { LOGIN_USER, REGISTER_USER, SET_USER_ERROR, LOGOUT_USER, ADD_TO_CART } from './types/types';
import { USERS_API } from './urls/url';

export const loginUser = (data = {}) => {
    return async (dispatch) => {
        //1- TODO: loading

        try {
            //2-axios
            const response = await axios.post(`${USERS_API}/login`, data);

            //OK response
            if (response.status === 200) {
                // TODO: loading
                dispatch(setLoginUser(response.data));
                return response.data;
            }
        }//end try
        catch (ex) {
            //TODO: loading
            //TODO: set error from server
            console.log(ex.response.data);
            dispatch(setUserError(ex.response.data));
            return ex.response.data
        }//end catch
    }
};

export const setLoginUser = (data) => (
    {
        type: LOGIN_USER,
        data
    }
);

/**************************************/
export const authUser = () => {
    return async (dispatch) => {
        //1- TODO: loading


        try {
            //2-axios
            const response = await axios.get(`${USERS_API}/auth`);

            //OK response
            if (response.status === 200) {
                // TODO: loading
                console.log(response.data);
                const resposnseData = { ...response.data }
                dispatch(setLoginUser(resposnseData));
                return response.data;
            }
        }//end try
        catch (ex) {
            //TODO: loading
            //TODO: set error from server
            console.log(ex.response.data);
            dispatch(setUserError(ex.response.data));
            return ex.response.data
        }//end catch
    }
};

/**************************************/
export const registerUser = (data) => {
    return async (dispatch) => {
        //1- TODO: show loading

        try {
            //2-send request with axios
            const response = await axios.post(`${USERS_API}/register`, data);

            //OK response
            if (response.status === 200) {
                // TODO: loading
                dispatch(setRegisterUser(response.data));
                return response.data;
            }
        }
        catch (ex) {
            //TODO: hide loading
            //TODO: set error from server
            console.log(ex.response.data);
            dispatch(setUserError(ex.response.data));
            return ex.response.data
        }
    }
};

export const setRegisterUser = (data = {}) => (
    {
        type: REGISTER_USER,
        data
    }
);

/**************************************/
export const setUserError = (data) => (
    {
        type: SET_USER_ERROR,
        data
    }
);

/**************************************/
export const logoutUser = () => ({
    type: LOGOUT_USER
})

/**************************************/
export const addToCart = (productID) => {
    return async (dispatch) => {
        //1- TODO: show loading

        try {
            //2-send request with axios
            const response = await axios.post(`${USERS_API}/addToCart?productID=${productID}`);

            //OK response
            if (response.status === 200) {
                // TODO: loading
                dispatch(setToCart(response.data.cart));
                return response.data;
            }
        }
        catch (ex) {
            //TODO: hide loading
            //TODO: set error from server
            console.log(ex.response.data);
            dispatch(setUserError(ex.response.data));
            return ex.response.data
        }
    }
};

export const setToCart = (data) => (
    {
        type: ADD_TO_CART,
        data
    }
);