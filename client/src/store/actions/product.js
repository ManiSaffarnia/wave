import axios from 'axios';
//types
import { GET_PRODUCTS_BY_SELL, GET_PRODUCTS_BY_ARRIVAL, GET_BRANDS, GET_WOODS, GET_PRODUCTS_TO_SHOP, ADD_PRODUCT, CLEAR_PRODUCT, ADD_BRAND, ADD_WOOD } from './types/types';
import { PRODUCT_API, BRAND_API, WOOD_API } from './urls/url';


//////////////////////////////////////
//////////      PRODUCTS
//////////////////////////////////////

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


export const clearAddedProduct = () => ({
    type: CLEAR_PRODUCT
});

/********************** */
/**SET PRODUCT TO SHOP */
export const getProductsToShop = ({ skip, limit, filters = [] }, previousState = []) => {
    const data = {
        skip,
        limit,
        filters
    }

    return async (dispatch) => {
        try {

            const response = await axios.post(`${PRODUCT_API}/shop`, data);

            //OK response
            if (response.status === 200) {
                // TODO: loading
                let newState = [...previousState, ...response.data.articles]
                dispatch(setProductToShop({ size: response.data.size, articles: newState }));
                return { size: response.data.size, articles: newState };
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

export const setProductToShop = (data) => ({
    type: GET_PRODUCTS_TO_SHOP,
    data
});


/********************** */
/**ADD PTODUCT */
export const addProduct = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${PRODUCT_API}/addProduct`, data);

            if (response.status === 200) {
                // TODO: loading
                dispatch(setProduct(response.data));
                return;
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


export const setProduct = (data) => ({
    type: ADD_PRODUCT,
    data
});




//////////////////////////////////////
//////////      BRANDS
//////////////////////////////////////

export const getBrands = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${BRAND_API}/all`);

            //OK response
            if (response.status === 200) {
                // TODO: loading
                dispatch(setBrands(response.data));
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

export const setBrands = (data) => ({
    type: GET_BRANDS,
    data
});

/********************** */
/**ADD BRAND */
export const addBrand = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${BRAND_API}/addBrand`, data);

            //OK response
            if (response.status === 200) {
                // TODO: loading
                dispatch(setBrand(response.data));
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

export const setBrand = (data) => ({
    type: ADD_BRAND,
    data
});


//////////////////////////////////////
//////////      WOODS
//////////////////////////////////////

export const getWoods = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${WOOD_API}/all`);

            //OK response
            if (response.status === 200) {
                // TODO: loading
                dispatch(setWoods(response.data));
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

export const setWoods = (data) => ({
    type: GET_WOODS,
    data
});