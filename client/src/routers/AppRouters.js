import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//hoc
import Layout from '../components/hoc/Layout';
//components
import Home from '../components/Home/Home';

const AppRouter = () => (
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route path="/" component={Home}></Route>
            </Switch>
        </Layout>
    </BrowserRouter>
);

export default AppRouter;