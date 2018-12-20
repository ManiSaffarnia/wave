import axios from 'axios';
//Types
import { LOGIN_USER } from './types/types';

export const loginUser = (data = {}) => {
    return async (dispatch) => {
        //1- TODO: loading


        try {
            //2-axios
            const response = await axios.post('/api/users/login', data);

            //OK response
            if (response.status === 200) {
                // TODO: loading
                dispatch(setUser(response.data));
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


export const setUser = (data = {}) => (
    {
        type: LOGIN_USER,
        data
    }
);

export const setUserError = (data) => (
    {
        type: "SET_USER_ERROR",
        data
    }
);