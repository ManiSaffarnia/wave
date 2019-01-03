import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//hoc
import Layout from '../components/hoc/Layout';
import PrivateRoute from './PrivateRouter';
import PublicRoute from './PublicRouter';
import AdminRoute from './AdminRouter';

//components
import Home from '../components/Home/Home';
import ErrorPage from '../components/404/404';
import RegisterLogin from '../components/Register_Login/index';
import Register from '../components/Register_Login/Register';
import Dashboard from '../components/User/Dashboard';
import Shop from '../components/Shop/Shop';
import AddProduct from '../components/User/Admin/AddProduct';
import ManageCategories from '../components/User/Admin/ManageCategories';
import Product from '../components/Product/Product';

const AppRouter = () => (
    <BrowserRouter>
        <Layout>
            <Switch>
                {/**General route */}
                <Route path="/" component={Home} exact />
                <Route path='/shop' component={Shop} />
                <Route path='/product_detail/:id' component={Product} />

                {/**Public route */}
                <PublicRoute path="/register_login" component={RegisterLogin} />
                <PublicRoute path="/register" component={Register} />

                {/**Private route */}
                <PrivateRoute path="/user/dashboard" component={Dashboard} />

                {/**Admin Route */}
                <AdminRoute path="/admin/add_product" component={AddProduct} />
                <AdminRoute path="/admin/manage_categories" component={ManageCategories} />

                {/**404 */}
                <Route component={ErrorPage} />
            </Switch>
        </Layout>
    </BrowserRouter>
);

export default AppRouter;