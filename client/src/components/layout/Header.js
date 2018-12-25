import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
    state = {
        page: [
            {
                name: 'Home',
                linkTo: '/',
                public: true
            },
            {
                name: 'Guitars',
                linkTo: '/shop',
                public: true
            }
        ],
        user: [
            {
                name: 'My Cart',
                linkTo: '/user/cart',
                public: false
            },
            {
                name: 'My Account',
                linkTo: '/user/dashboard',
                public: false
            },
            {
                name: 'Log in',
                linkTo: '/register_login',
                public: true
            },
            {
                name: 'Log out',
                linkTo: '/user/logout',
                public: false
            }
        ]
    };

    //element marboot be link haro misaze => chon momkene anvae mokhtalef link bashe
    createLinkElement = (item, index) => {
        return <Link to={item.linkTo} key={index}>{item.name}</Link>
    };

    //tasmim migire ke che link hai bayad namayesh dade beshe motanaseb ba vaziat authentication
    showLinks = (linksList) => {
        let selectedLinkToDisplay = [];
        if (this.props.user.userData) {
            //check authentication

            if (!this.props.user.userData.isAuth) { //no login
                selectedLinkToDisplay = linksList.filter((link) => {
                    return (link.public) ? link : null
                })
            } else { //login
                selectedLinkToDisplay = linksList.filter((link) => {
                    return (link.name !== 'Log in') ? link : null
                })
            }
        }

        return selectedLinkToDisplay.map((item, index) => (
            this.createLinkElement(item, index)
        ))
    };

    render() {
        return (
            <header className="bck_b_light">
                <div className="container">
                    <div className="left">
                        <div className="logo">WAVES</div>
                    </div>
                    <div className="right">
                        <div className="top">
                            {this.showLinks(this.state.user)}
                        </div>
                        <div className="bottom">
                            {this.showLinks(this.state.page)}
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(Header);