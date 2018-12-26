import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//hoc
import Layout from '../components/hoc/Layout';
import PrivateRoute from './PrivateRouter';
import PublicRoute from './PublicRouter';
//components
import Home from '../components/Home/Home';
import RegisterLogin from '../components/Register_Login/index';
import Register from '../components/Register_Login/Register';
import Dashboard from '../components/User/Dashboard';
import Shop from '../components/Shop/Shop';

const AppRouter = () => (
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route path="/" component={Home} exact />
                <PublicRoute path="/register_login" component={RegisterLogin} />
                <PublicRoute path="/register" component={Register} />
                <PrivateRoute path="/user/dashboard" component={Dashboard} />
                <Route path='/shop' component={Shop} />

            </Switch>
        </Layout>
    </BrowserRouter>
);

export default AppRouter;