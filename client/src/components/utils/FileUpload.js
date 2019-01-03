import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import CircularProgress from '@material-ui/core/CircularProgress';

class FileUpload extends Component {
    state = {
        uploadedFiles: [],
        uploading: false
    }


    onDropHandler = (uploadedFile) => {
        this.setState({ uploading: true });

        const formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        formData.append("file", uploadedFile[0]);

        axios.post('/api/users/uploadimage', formData, config).then(response => {
            this.setState((prevState) => ({
                uploading: false,
                uploadedFiles: [...prevState.uploadedFiles, response.data]
            }), () => {
                //callback of setState
                this.props.imagesHandler(this.state.uploadedFiles);
            });
        });
    };

    onRemoveImageHandler = (id) => {
        //TODO: show dialog box


        axios.get(`/api/users/removeimage?public_id=${id}`).then(response => {
            //TODO: check response from cloudinary

            const newUploadedImagesArray = this.state.uploadedFiles.filter(item => {
                return item.public_id !== id
            });

            this.setState({
                uploadedFiles: newUploadedImagesArray
            }, () => {
                this.props.imagesHandler(newUploadedImagesArray);
            })
        });
    };

    showUploadedImages = () => (
        this.state.uploadedFiles.map(item => (
            <div className="dropzone_box" key={item.public_id} onClick={() => { this.onRemoveImageHandler(item.public_id) }}>
                <div
                    className="wrap upload_image"
                    style={{ background: `url(${item.url}) no-repeat` }}
                >
                    <div className="overlay">
                        <FontAwesomeIcon icon={faTimes} className="remove_icon" />
                    </div>
                </div>
            </div>
        ))
    );

    static getDerivedStateFromProps(props, state) {
        if (props.reset) {
            return state = {
                uploadedFiles: [],
                uploading: false
            }
        }
        return null;
    }

    render() {
        return (
            <div>
                <section>
                    <div className="dropzone clear">
                        <Dropzone
                            onDrop={this.onDropHandler}
                            multiple={false}
                            className="dropzone_box"
                        >
                            <div className="wrap">
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </div>
                        </Dropzone>

                        {this.showUploadedImages()}


                        {this.state.uploading && <div className="dropzone_box" style={{ textAlign: 'center', paddingTop: '60px' }}><CircularProgress style={{ color: '#00bcd4' }} thickness={7} /></div>}
                    </div>
                </section>

            </div>
        );
    }
}

export default FileUpload;