import React, { Component } from 'react';
import ImageLightBox from '../utils/ImageLightBox';

class ProductImage extends Component {

    state = {
        isOpen: false,
        imagePosition: 0,
        lightboxImages: []
    }

    componentDidMount() {
        if (this.props.detail.images.length > 0) {
            const images = this.props.detail.images.map(item => {
                return { src: item.url }
            });

            this.setState({ lightboxImages: images });
        }
    }

    renderImage = () => {
        return this.props.detail.images.length > 0 ? this.props.detail.images[0].url : '/images/image_not_availble.png'
    };

    handleLightBox = (imageIndex) => {
        if (this.props.detail.images.length > 0) {
            this.setState({
                isOpen: true,
                imagePosition: imageIndex
            })
        }
    };

    handleLightBoxClose = () => {
        this.setState({
            isOpen: false
        })
    };

    render() {
        console.log(this.state.lightboxImages);
        return (
            <div className="product_image_container">
                {/**Main Image */}
                <div className="main_pic">
                    <div
                        style={{ background: `url(${this.renderImage()}) no-repeat` }}
                        onClick={() => { this.handleLightBox(0) }}
                    >

                    </div>
                </div>

                {/**Secondary Images */}
                <div className="main_thumbs">
                    {this.props.detail.images.map((item, index) => (
                        (index > 0) ?
                            <div key={index} onClick={() => { this.handleLightBox(index) }} className="thumb" style={{ background: `url(${item.url}) no-repeat` }}></div>
                            : null
                    ))}
                </div>

                {/**Ligth box */}
                {this.state.isOpen &&
                    <ImageLightBox
                        id={this.props.detail.id}
                        images={this.state.lightboxImages}
                        open={this.state.isOpen}
                        position={this.state.imagePosition}
                        onclose={this.handleLightBoxClose}
                    />
                }
            </div>
        );
    }
}

export default ProductImage;