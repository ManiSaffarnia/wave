import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProductDetail, clearProductDetail } from '../../store/actions/product';
import { addToCart } from '../../store/actions/user';
import PageTitle from '../utils/PageTitle';
import Loading from '../utils/Loading';
import ProductInfo from './ProductInfo';
import ProductImage from './ProductImage';

class Product extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.dispatch(getProductDetail(id)).then(response => {
            if (!this.props.products.productDetail) {
                //TODO: handle no response from server - send user back to home
                console.log('no article found');
                this.props.history.push('/shop');
            }
        });
    }

    componentWillUnmount() {
        this.props.dispatch(clearProductDetail());
    }

    addToCartHandler = (id) => {
        this.props.dispatch(addToCart(id));
    }

    render() {
        return (
            <div>
                <PageTitle title="Product detail" />

                <div className="container">
                    {this.props.products.productDetail ?
                        <div className="product_detail_wrapper">
                            <div className="left">
                                <div style={{ width: '500px' }}>
                                    <ProductImage
                                        detail={this.props.products.productDetail}
                                    />
                                </div>
                            </div>
                            <div className="right">
                                <ProductInfo addToCart={(id) => { this.addToCartHandler(id) }} detail={this.props.products.productDetail} />
                            </div>
                        </div>
                        : <Loading />}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    products: state.products
});

export default connect(mapStateToProps)(Product);