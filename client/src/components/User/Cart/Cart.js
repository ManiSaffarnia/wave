import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
//import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';

import UserDashboardLayout from '../../hoc/UserDashboardLayout';
import { getProductInCart } from '../../../store/actions/user';
import ProductCartBlock from '../../utils/ProductCartBlock';

class Cart extends Component {

    state = {
        loading: true,
        cartItems: [],
        total: 0,
        showTotal: false,
        showSuccess: false
    };

    componentDidMount() {
        const cartItem = [];

        if (this.props.user.userData.cart) {
            if (this.props.user.userData.cart.length > 0) {

                this.props.user.userData.cart.forEach(item => {
                    cartItem.push(item.id);
                });

                this.props.dispatch(getProductInCart(cartItem, this.props.user.userData.cart)).then(response => {
                    if (response.success) {
                        this.calculateTotalPrice(this.props.user.cartDetail);
                    }
                });

            }
        }
    }

    calculateTotalPrice = (cartDetail) => {
        let total = 0;
        cartDetail.forEach(item => {
            total += parseInt(item.price) * item.quantity
        });

        this.setState({ total, showTotal: true });
    };

    handleRemoveFromCart = (id) => {

    };

    render() {
        return (
            <UserDashboardLayout>
                <div>
                    <h1>My cart</h1>
                    <div className="user_cart">
                        <ProductCartBlock
                            products={this.props.user}
                            removeItem={(id) => this.handleRemoveFromCart(id)}
                        />

                        {this.state.showTotal &&
                            <div>
                                <div className="user_cart_sum">
                                    <div>
                                        Total amount: ${this.state.total}
                                    </div>
                                </div>
                            </div>
                        }
                        {!this.state.showTotal &&
                            <div className="cart_no_items">
                                <FontAwesomeIcon icon={faFrown} />
                                <div>
                                    You have no items
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </UserDashboardLayout>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(Cart);