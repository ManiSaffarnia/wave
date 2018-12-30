import React, { Component } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';


class CollapseRadio extends Component {

    state = {
        open: false,
        selectedValue: '0'
    };

    componentDidMount() {
        if (this.props.initState) {
            this.setState({
                open: this.props.initState
            })
        }
    }

    //for collapse
    onClickHandler = () => {
        this.setState((prevState) => (
            {
                open: !prevState.open
            }
        ));
    };


    //radio button
    onRadioHandleChange = e => {
        this.setState({
            selectedValue: e.target.value
        });
        this.props.handleFilters(e.target.value, this.props.category);
    };

    render() {
        return (
            <div className="collapse_items_wrapper">
                <List style={{ borderBottom: '1px solid #dbdbdb' }}>
                    <ListItem onClick={this.onClickHandler} style={{ padding: '10px 23px 10px 0' }}>
                        <ListItemText
                            primary={this.props.title}
                            className="collapse_title"
                        />

                        {this.state.open ? <FontAwesomeIcon icon={faAngleUp} className="icon" /> : <FontAwesomeIcon icon={faAngleDown} className="icon" />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <RadioGroup
                                aria-label="price"
                                name="prices"
                                value={this.state.selectedValue}
                                onChange={this.onRadioHandleChange}
                            >
                                {this.props.list ?
                                    this.props.list.map((item) =>
                                        <FormControlLabel
                                            key={item._id}
                                            value={`${item._id}`}
                                            control={<Radio />}
                                            label={item.name}
                                        />)
                                    :
                                    null
                                }


                            </RadioGroup>
                        </List>
                    </Collapse>
                </List>
            </div>
        );
    }
}

export default CollapseRadio;