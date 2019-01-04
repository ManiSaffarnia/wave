import React from 'react';

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