import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBrands, getWoods, addProduct, clearAddedProduct } from '../../../store/actions/product';

import UserDashboardLayout from '../../hoc/UserDashboardLayout';
import AddBrand from './AddBrand';
import AddWood from './AddWood';

const ManageCategories = () => {
    return (
        <UserDashboardLayout>
            {/**ADD BRAND */}
            <AddBrand />

            {/**ADD WOOD */}
            <AddWood />
        </UserDashboardLayout>
    );
};

export default ManageCategories;