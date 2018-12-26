import axios from 'axios';
//types
import { GET_PRODUCTS_BY_SELL, GET_PRODUCTS_BY_ARRIVAL } from './types/types';
import { PRODUCT_API } from './urls/url';



export const getProductsByArrival = () => {
    return async (dispatch) => {
        try {
            //articles?sortBy=createdAt&order=desc&limit=4
            const response = await axios.get(`${PRODUCT_API}/articles?sortBy=createdAt&order=desc&limit=4`);

            //OK response
            if (response.status === 200) {
                // TODO: loading
                dispatch(setProductsByArrival(response.data));
                //console.log(response.data.productData);
                return response.data;
            }
        }//end try
        catch (ex) {
            //TODO: loading
            //TODO: set error from server
            console.log(ex.response.data);
            //dispatch(setUserError(ex.response.data));
            return ex.response.data
        }//end catch
    }
};

export const setProductsByArrival = (data) => ({
    type: GET_PRODUCTS_BY_ARRIVAL,
    data
});

/************************************************************************************************/

export const getProductsBySell = () => {
    return async (dispatch) => {
        try {
            //articles?sortBy=createdAt&order=desc&limit=4
            const response = await axios.get(`${PRODUCT_API}/articles?sortBy=sold&order=desc&limit=4`);

            //OK response
            if (response.status === 200) {
                // TODO: loading
                dispatch(setProductsBySell(response.data));
                return response.data;
            }
        }//end try
        catch (ex) {
            //TODO: loading
            //TODO: set error from server
            console.log(ex.response.data);
            //dispatch(setUserError(ex.response.data));
            return ex.response.data
        }//end catch
    }
};


export const setProductsBySell = (data) => ({
    type: GET_PRODUCTS_BY_SELL,
    data
});