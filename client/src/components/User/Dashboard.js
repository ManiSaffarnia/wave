import React from 'react';
import UserDashboardLayout from '../hoc/UserDashboardLayout';
import Button from '../utils/Button';

const Dashboard = (props) => {
    return (
        <UserDashboardLayout>
            <div>

                <div className="user_nfo_panel">
                    <h1>User information</h1>
                    <div>
                        <span>{props.user.name}</span>
                        <span>{props.user.lastname}</span>
                        <span>{props.user.email}</span>
                    </div>

                    <Button
                        type="default"
                        title="Edit account info"
                        linkTo="/user/profile"
                    />

                </div>

                <div className="user_nfo_panel">
                    <h1>History purchases</h1>
                    <div className="user_product_block_wrapper">
                        {/*TODO: */}
                        history goes here
                    </div>

                </div>

            </div>
        </UserDashboardLayout>
    );
};

export default Dashboard;