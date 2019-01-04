import React, { Component } from 'react';
import LightBox from 'react-images';

class ImageLightBox extends Component {

    state = {
        lightboxIsOpen: true,
        currentImage: this.props.position,
        images: [...this.props.images]
    };

    gotoPrevious = () => {
        const newIndex = (this.state.currentImage === 0) ? this.state.images.length - 1 : this.state.currentImage - 1
        this.setState({
            currentImage: newIndex
        })
    };

    gotoNext = () => {
        const newIndex = (this.state.currentImage === this.state.images.length - 1) ? 0 : this.state.currentImage + 1
        this.setState({
            currentImage: newIndex
        })
    };

    closeLightBox = () => {
        this.props.onclose();
    };

    render() {
        return (
            <LightBox
                currentImage={this.state.currentImage}
                images={this.state.images}
                isOpen={this.state.lightboxIsOpen}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNext}
                onClose={this.closeLightBox}
            />
        );
    }
}

export default ImageLightBox;