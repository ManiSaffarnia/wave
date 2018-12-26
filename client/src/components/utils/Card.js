import React, { Component } from 'react';

class Card extends Component {

    renderCardImage = () => (
        (this.props.images.length > 0) ? this.props.images[0].url : './images/image_not_availble.png'
    )

    render() {
        return (
            <div className={`card_item_wrapper ${this.props.grid}`}>
                <div className="image" style={{ background: `url(${this.renderCardImage()}) no-repeat` }}></div>
                <div className="action_container">
                    <div className="tags">
                        <div className="brand">{this.props.brand.name}</div>
                        <div className="name">{this.props.name}</div>
                        <div className="price">${this.props.price}</div>
                        <div className="price">${this.props.price}</div>
                    </div>
                    {this.props.grid && <div className="description">{this.props.description}</div>}

                    <div>{/**TODO:  BUTTONS*/}</div>
                </div>
            </div>
        );
    }
}

export default Card;