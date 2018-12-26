import React from 'react';
import Slider from 'react-slick';
import Button from '../utils/Button';

const HomeSlider = (props) => {

    const slides = [
        {
            img: './images/featured/featured_home.jpg',
            title: 'Fender',
            subtitle: 'Custom shop',
            linkTitle: 'Shop now',
            linkTo: '/shop'
        },
        {
            img: './images/featured/featured_home_2.jpg',
            title: 'B-Stock',
            subtitle: 'Awesome discounts',
            linkTitle: 'View offers',
            linkTo: '/shop'
        }
    ];


    return (
        <div className="featured_container">
            <Slider
                dots={false}
                infinite={true}
                speed={500}
                sliderToShow={1}
                slidesToScroll={1}
                arrows={false}
            >
                {slides.map((slide, index) => (
                    <div key={index}>
                        <div className="featured_image" style={{ background: `url(${slide.img})`, height: `${window.innerHeight}px` }}>
                            <div className="featured_action">
                                <div className="tag title">{slide.title}</div>
                                <div className="tag low_title">{slide.subtitle}</div>
                                <div>
                                    <Button
                                        type="default"
                                        title={slide.linkTitle}
                                        linkTo={slide.linkTo}
                                        addStyles={{ margin: '10px 0 0 0' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HomeSlider;