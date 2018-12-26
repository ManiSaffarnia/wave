import React, { Component } from 'react';
import { connect } from 'react-redux';

import PageTitle from '../utils/PageTitle';
import { getBrands, getWoods } from '../../store/actions/product';

class Shop extends Component {

    componentDidMount() {

        this.props.dispatch(getBrands());
        this.props.dispatch(getWoods());
    }


    render() {
        return (
            <div>
                <PageTitle title="Browse Products" />

                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">
                            Left
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