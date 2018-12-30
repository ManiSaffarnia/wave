import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBrands, getWoods } from '../../store/actions/product';
import { frets } from '../utils/misc/frets';
import { price } from '../utils/misc/price';

import PageTitle from '../utils/PageTitle';
import CollapseCheckbox from '../utils/CollapseCheckbox';
import CollapseRadio from '../utils/CollapseRadio';

class Shop extends Component {

    state = {
        grid: '',
        limit: 6,
        skip: 0,
        filters: {
            brand: [],
            wood: [],
            frets: [],
            price: []
        }
    };

    componentDidMount() {

        this.props.dispatch(getBrands());
        this.props.dispatch(getWoods());
    }

    handlePrice = (priceID) => {
        const priceObject = price.find((item) => {
            return (item._id === parseInt(priceID)) ? item : null;
        });
        let arr = [...priceObject.range]
        return arr;
    };

    onFilterChanged = (filters, category) => {
        const newFilter = { ...this.state.filters };
        newFilter[category] = filters;
        if (category === "price") {
            const priceValue = this.handlePrice(filters);
            newFilter[category] = priceValue;
        }

        this.setState({ filters: newFilter });
    };

    render() {
        console.log(this.state.filters);
        return (
            <div>
                <PageTitle title="Browse Products" />

                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">
                            {/**BRANDS */}
                            <CollapseCheckbox
                                initState={true}
                                title="Brands"
                                category="brand"
                                list={this.props.products.brands}
                                handleFilters={this.onFilterChanged}
                            />

                            {/**FRETS */}
                            <CollapseCheckbox
                                initState={false}
                                title="Frets"
                                category="frets"
                                list={frets}
                                handleFilters={this.onFilterChanged}
                            />

                            {/**WOODS */}
                            <CollapseCheckbox
                                initState={false}
                                title="Wood"
                                category="wood"
                                list={this.props.products.woods}
                                handleFilters={this.onFilterChanged}
                            />

                            {/**PRICE */}
                            <CollapseRadio
                                initState={true}
                                title="Price"
                                category="price"
                                list={price}
                                handleFilters={this.onFilterChanged}
                            />


                        </div>
                        <div className="right">
                            Right
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    products: state.products
});

export default connect(mapStateToProps)(Shop);