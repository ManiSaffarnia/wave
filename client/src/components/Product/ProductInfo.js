import React from 'react';
import Button from '../utils/Button';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

const ProductInfo = (props) => {

    const showProductTags = () => {
        return (
            <div className="product_tags">
                {/**SHIPPING */}
                {props.detail.shipping &&
                    <div className="tag">
                        <FontAwesomeIcon icon={faTruck} />
                        <div className="tag_text">
                            <div>Free shipping</div>
                            <div>And return</div>
                        </div>
                    </div>
                }

                {/**Availability */}
                {props.detail.available ?
                    <div className="tag">
                        <FontAwesomeIcon icon={faCheck} />
                        <div className="tag_text">
                            <div>Available</div>
                            <div>in store</div>
                        </div>
                    </div>
                    :
                    <div className="tag">
                        <FontAwesomeIcon icon={faTimes} />
                        <div className="tag_text">
                            <div>Not Available</div>
                            <div>Preorder</div>
                        </div>
                    </div>
                }

            </div>
        )
    }

    const showProductActions = () => {
        return (
            <div className="product_actions">
                <div className="price">$ {props.detail.price}</div>
                <div className="cart">
                    <Button
                        type="add_to_cart_link"
                        runAction={() => {
                            console.log('add to cart');
                        }}
                    />
                </div>
            </div>
        )
    }

    const showProductSpecifications = () => {
        return (
            <div className="product_specifications">
                <h2>Specs:</h2>
                <div>
                    <div className="item">
                        <strong>Frets:</strong> {props.detail.frets}
                    </div>
                    <div className="item">
                        <strong>Wood:</strong> {props.detail.wood.name}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h1>{props.detail.brand.name} {props.detail.name}</h1>
            <p>{props.detail.description}</p>

            {showProductTags()}

            {showProductActions()}

            {showProductSpecifications()}
        </div>
    );
};

export default ProductInfo;