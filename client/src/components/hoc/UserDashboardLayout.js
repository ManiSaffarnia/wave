import React from 'react';
import { Link } from 'react-router-dom';


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
                    <div className="links">
                        {generateLinks(links)}
                    </div>
                </div>
                <div className="user_right">
                    {props.children}
                </div>

            </div>
        </div>
    );
};

export default UserDashboardLayout;