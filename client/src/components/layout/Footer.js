import React from 'react';
import FontAwsomeIcon from '@fortawesome/react-fontawesome';
//Icons
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';


const Footer = () => {
    return (
        <footer className="bck_b_dark">
            <div className="container">
                <div className="logo">Waves</div>
                <div className="wrapper">
                    <div className="left">
                        <h2>Contact information</h2>
                        <div className="business_nfo">
                            {/**Compass */}
                            <div className="tag">
                                <FontAwsomeIcon icon={faCompass} className="icon" />
                                <div className="nfo">
                                    <div>Address</div>
                                    <div>Kramer 2345</div>
                                </div>
                            </div>

                            {/**Phone */}
                            <div className="tag">
                                <FontAwsomeIcon icon={faPhone} className="icon" />
                                <div className="nfo">
                                    <div>Phone</div>
                                    <div>555-123134</div>
                                </div>
                            </div>

                            {/**Clock */}
                            <div className="tag">
                                <FontAwsomeIcon icon={faClock} className="icon" />
                                <div className="nfo">
                                    <div>Working hours</div>
                                    <div>Mon-Sun / 9am-8pm</div>
                                </div>
                            </div>

                            {/**Email */}
                            <div className="tag">
                                <FontAwsomeIcon icon={faEnvelope} className="icon" />
                                <div className="nfo">
                                    <div>Email</div>
                                    <div>nfo@waves.com</div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/**Footer right side */}
                    <div className="left">
                        <h2>Be the first to know</h2>
                        <div>
                            <div>
                                Get all the latest information on events, sales and offers. You can miss out.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;