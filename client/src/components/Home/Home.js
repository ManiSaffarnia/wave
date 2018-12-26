import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductsByArrival, getProductsBySell } from '../../store/actions/product';
import HomeSlider from './HomeSlider';
import HomePromotion from './HomePromotion';
import CardList from '../utils/CardList';

class Home extends Component {


    componentDidMount() {
        this.props.dispatch(getProductsBySell());
        this.props.dispatch(getProductsByArrival());
    }


    render() {
        return (
            <div>
                <HomeSlider />
                <CardList cardList={this.props.products.productBySell} title="Best Sellig guitars" />
                <HomePromotion />
                <CardList cardList={this.props.products.productByArrival} title="New arrivals" />
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    products: state.products
});


export default connect(mapStateToProps)(Home);