import React from 'react';
import Button from '../utils/Button';

const HomePromotion = (props) => {

    const promotions = [
        {
            img: './images/featured/featured_home_3.jpg',
            title: 'Up to 40% off',
            subtitle: 'In second hand guitars',
            linkTitle: 'Shop now',
            linkTo: '/shop'
        }
    ];

    return (
        <div className="home_promotion">
            {promotions.map((promotion, index) => (
                <div className="home_promotion_img" style={{ background: `url(${promotion.img})` }} key={index}>
                    <div className="tag title">{promotion.title}</div>
                    <div className="tag low_title">{promotion.subtitle}</div>
                    <div>
                        <Button
                            type="default"
                            title={promotion.linkTitle}
                            linkTo={promotion.linkTo}
                            addStyles={{ margin: '10px 0 0 0' }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomePromotion;