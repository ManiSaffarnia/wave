import React from 'react';
import { Link } from 'react-router-dom';

const Button = (props) => {

    //in function ba tavajoh be parameter hai ke behesh pas dade mishe noe button ke bayad sakhte beshe ro tashkhis mide va misaze
    const pickButton = () => {
        let jsxTemplate = '';
        switch (props.type) {
            case "default":
                jsxTemplate = <Link to={props.linkTo} className="link_default"  {...props.addStyles}>{props.title}</Link>
                break;
            default:
                jsxTemplate = '';
        }
        return jsxTemplate;
    };

    return (
        <div className="my_link">
            {pickButton()}
        </div>
    );
};

export default Button;