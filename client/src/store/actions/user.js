import axios from 'axios';
//Types
import { LOADING, UNSET_LOADING, LOGIN_USER, REGISTER_USER, SET_USER_ERROR, LOGOUT_USER, ADD_TO_CART, GET_PRODUCT_IN_CART, REMOVE_USER_CART_ITEM } from './types/types';
import { USERS_API, PRODUCT_API } from './urls/url';

export const loginUser = (data = {}) => {
    return async (dispatch) => {
        //1- TODO: loading
        dispatch(setLoading());

        try {
            //2-axios
            const response = await axios.post(`${USERS_API}/login`, data);

            //OK response
            if (response.status === 200) {
                // TODO: loading
                dispatch(setLoginUser(response.data));
                dispatch(unsetLoading());
                return response.data;
            }
        }//end try
        catch (ex) {
            //TODO: loading
            dispatch(unsetLoading());
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
        dispatch(setLoading());

        try {
            //2-send request with axios
            const response = await axios.post(`${USERS_API}/register`, data);

            //OK response
            if (response.status === 200) {
                // TODO: loading
                dispatch(setRegisterUser(response.data));
                dispatch(unsetLoading());
                return response.data;
            }
        }
        catch (ex) {
            //TODO: hide loading
            dispatch(unsetLoading());
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

/**************************************/

export const getProductInCart = (cartItems, userCart) => {
    return async (dispatch) => {
        //1- TODO: show loading

        try {
            //2-send request with axios
            //api/products/article_by_id?id=[ids]&type=[sigle,array]
            const response = await axios.get(`${PRODUCT_API}/article_by_id?id=${cartItems}&type=array`);


            //OK response
            if (response.status === 200) {
                // TODO: loading

                //add quantity ro the response
                userCart.forEach(item => {
                    response.data.productData.forEach((k, i) => {
                        if (k._id === item.id) {
                            response.data.productData[i].quantity = item.quantity
                        }
                    })
                });

                dispatch(setProductInCart(response.data.productData));
                return { success: true, data: response.data.productData };
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

export const setProductInCart = (data) => (
    {
        type: GET_PRODUCT_IN_CART,
        data
    }
);

/**************************************/

export const removeItemFromCart = (id) => {
    return async (dispatch) => {
        //1- TODO: show loading
        try {
            //2-send request with axios
            //api/products/article_by_id?id=[ids]&type=[sigle,array]
            const response = await axios.get(`${USERS_API}/removeFromCart?id=${id}`);


            //OK response
            if (response.status === 200) {
                // TODO: loading

                //add quantity ro the response
                //add quantity ro the response
                response.data.cart.forEach(item => {
                    response.data.cartDetail.forEach((k, i) => {
                        if (k._id === item.id) {
                            response.data.cartDetail[i].quantity = item.quantity
                        }
                    })
                });

                dispatch(removeProductInCart(response.data));
                return { success: true, data: response.data.productData };
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

export const removeProductInCart = (data) => (
    {
        type: REMOVE_USER_CART_ITEM,
        data
    }
);

/**************************************/
export const setLoading = () => (
    {
        type: LOADING
    }
);

export const unsetLoading = () => (
    {
        type: UNSET_LOADING
    }
);