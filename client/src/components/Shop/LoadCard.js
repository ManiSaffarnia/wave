import React from 'react';
import CardListShop from '../utils/CardListShop';

const LoadCard = (props) => {
    return (
        <div>
            <div>
                <CardListShop
                    grid={props.grid}
                    list={props.products}
                />
            </div>

            {/**LOAD MORE */}
            {props.size >= props.limit &&
                <div className="load_more_container">
                    <span onClick={props.loadMore}>
                        Load More
                    </span>
                </div>
            }
        </div>
    );
};

export default LoadCard;