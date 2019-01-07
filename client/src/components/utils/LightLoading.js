import React from 'react';

const LightLoading = () => {
    return (
        <div className="myLoading">
            <div className="spinnerContainer">
                <div className="mySpinner">
                    <div className="sk-folding-cube">
                        <div className="sk-cube1 sk-cube"></div>
                        <div className="sk-cube2 sk-cube"></div>
                        <div className="sk-cube4 sk-cube"></div>
                        <div className="sk-cube3 sk-cube"></div>
                    </div>
                    Loading...
                </div>
            </div>
        </div>
    );
};

export default LightLoading;