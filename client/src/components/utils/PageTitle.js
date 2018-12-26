import React from 'react';

const PageTitle = (props) => {
    return (
        <div className="page_top">
            <div className="container">
                {props.title}
            </div>
        </div>
    );
};

export default PageTitle;