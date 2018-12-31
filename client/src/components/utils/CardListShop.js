import React from 'react';
import Card from './Card';

const CardListShop = (props) => {

    const renderCards = () => {
        return props.list.map((item, index) => (
            <Card key={item._id} {...item} grid={props.grid} />
        ));
    };

    return (
        <div className="card_block_shop">
            <div>
                <div>
                    {props.list ? (props.list.length === 0) ?
                        <div className="no_result">
                            Sorry, no results
                        </div>
                        : renderCards()
                        : null
                    }
                </div>
            </div>
        </div>
    );
};

export default CardListShop;