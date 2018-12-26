import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//reducers
import siteReducer from './reducers/site';
import userReducer from './reducers/user';
import productReducer from './reducers/product';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            user: userReducer,
            site: siteReducer,
            products: productReducer
        }),
        composeEnhancer(applyMiddleware(thunk))
    );

    return store;
}