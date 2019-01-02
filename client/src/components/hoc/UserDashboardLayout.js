import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const links = [
    {
        name: 'My account',
        linkTo: '/user/dashboard'
    },
    {
        name: 'User information',
        linkTo: '/user/profile'
    },
    {
        name: 'My cart',
        linkTo: '/user/cart'
    }
];

//admin links
const adminLinks = [
    {
        name: 'Site info',
        linkTo: '/admin/site_info'
    },
    {
        name: 'Add products',
        linkTo: '/admin/add_product'
    },
    {
        name: 'Manage categories',
        linkTo: '/admin/manage_categories'
    }
];

const UserDashboardLayout = (props) => {


    const generateLinks = (links) => (
        links.map((link, index) => (
            <Link key={index} to={link.linkTo}>
                {link.name}
            </Link>
        ))
    );

    return (
        <div className="container">
            <div className="user_container">
                <div className="user_left_nav">
                    <h2>My account</h2>

                    {/**general links */}
                    <div className="links">
                        {generateLinks(links)}
                    </div>

                    {/**Admin links */}
                    {props.user.userData.isAdmin &&
                        <div>
                            <h2>Admin</h2>
                            <div className="links">
                                {generateLinks(adminLinks)}
                            </div>
                        </div>
                    }

                </div>
                <div className="user_right">
                    {props.children}
                </div>

            </div>
        </div>
    );
};


const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(UserDashboardLayout);