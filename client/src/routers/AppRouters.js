import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//hoc
import Layout from '../components/hoc/Layout';
//components
import Home from '../components/Home/Home';
import RegisterLogin from '../components/Register_Login/index';


const AppRouter = () => (
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route path="/" component={Home} exact></Route>
                <Route path="/register_login" component={RegisterLogin}></Route>
            </Switch>
        </Layout>
    </BrowserRouter>
);

export default AppRouter;