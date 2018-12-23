import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configStore from './store/storeConfig';
import App from './App';
//css
import './resources/css/styles.css'
import './resources/css/checkmark.css'

//create an store
const store = configStore();

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
);


ReactDOM.render(jsx, document.getElementById('root'));
