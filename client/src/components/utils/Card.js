import React, { Component } from 'react';
import Button from './Button';

class Card extends Component {

    renderCardImage = () => (
        (this.props.images.length > 0) ? this.props.images[0].url : './images/image-placeholder.jpg'
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
                    </div>
                    {this.props.grid && <div className="description">{this.props.description}</div>}

                    <div className="actions">
                        <div className="button_wrapp">
                            <Button
                                type="default"
                                altClass="card_link"
                                title="View product"
                                linkTo={`/product_detail/${this.props.id}`}
                                addStyles={{ margin: '10px 0 0 0' }}
                            />
                        </div>
                        <div className="button_wrapp">
                            <Button
                                type="bag_link"
                                runAction={() => { console.log('added to car') }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;