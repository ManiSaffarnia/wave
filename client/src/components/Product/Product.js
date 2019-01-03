import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProductDetail, clearProductDetail } from '../../store/actions/product';
import PageTitle from '../utils/PageTitle';
import Loading from '../utils/Loading';
import ProductInfo from './ProductInfo';

class Product extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.dispatch(getProductDetail(id));
    }

    componentWillUnmount() {
        this.props.dispatch(clearProductDetail());
    }

    addToCartHandler = (id) => {

    }

    render() {
        return (
            <div>
                <PageTitle title="Product detail" />

                <div className="container">
                    {this.props.products.productDetail ?
                        <div className="product_detail_wrapper">
                            <div className="left">
                                images
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