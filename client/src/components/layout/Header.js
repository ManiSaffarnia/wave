import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header className="bck_b_light">
                <div className="container">
                    <div className="left">
                        <div className="logo">WAVES</div>
                    </div>
                    <div className="right">
                        <div className="top">
                            Links1
                        </div>
                        <div className="bottom">
                            Links2
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;