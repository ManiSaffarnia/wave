import React from 'react';
import Card from './Card';

const CardList = (props) => {

    const renderCards = () => (
        props.cardList ? props.cardList.map((card, index) => (
            <Card key={index} {...card} />
        )) : null
    );

    return (
        <div className="card_block">
            <div className="container">
                {/**List title */}
                {props.title && <div className="title">{props.title}</div>}

                {/**List cards */}
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {/**each Card */}
                    {renderCards()}
                </div>
            </div>
        </div>
    );
};

export default CardList;