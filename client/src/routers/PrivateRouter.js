import React from 'react';
import { Route } from 'react-router-dom';

const PrivateRouter = ({ component: Component, ...rest }) => (
    <Route {...rest} component={(props) => (
        <Component />
    )}
    />
)


export default PrivateRouter;