import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faShoppingBag from '@fortawesome/fontawesome-free-solid/faShoppingBag';

const Button = (props) => {

    //in function ba tavajoh be parameter hai ke behesh pas dade mishe noe button ke bayad sakhte beshe ro tashkhis mide va misaze
    const pickButton = () => {
        let jsxTemplate = '';
        switch (props.type) {
            case "default":
                jsxTemplate = <Link to={props.linkTo} className={props.altClass ? props.altClass : "link_default"}  {...props.addStyles}>{props.title}</Link>
                break;
            case "bag_link":
                jsxTemplate = <div className="bag_link" onClick={props.runAction}><FontAwesomeIcon icon={faShoppingBag} /></div>
                break;
            case "add_to_cart_link":
                jsxTemplate = <div className="add_to_cart_link" onClick={props.runAction}><FontAwesomeIcon icon={faShoppingBag} />Add To Cart</div>
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