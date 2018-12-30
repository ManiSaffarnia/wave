import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';
import CollapseCheckboxItem from './CollapseCheckboxItem';

class CollapseCheckbox extends Component {

    state = {
        open: false,
        checked: []
    };


    componentDidMount() {
        if (this.props.initState) {
            this.setState({
                open: this.props.initState
            })
        }
    }

    onClickHandler = () => {
        this.setState((prevState) => (
            {
                open: !prevState.open
            }
        ));
    };

    onChangeHandler = itemID => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(itemID);
        const newChecked = [...checked];

        if (currentIndex === -1) newChecked.push(itemID);
        else newChecked.splice(currentIndex, 1);

        this.setState({
            checked: newChecked,
        }, () => {
            this.props.handleFilters(newChecked, this.props.category);
        });
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
                            {this.props.list ?
                                this.props.list.map((item) => <CollapseCheckboxItem item={item} onChange={this.onChangeHandler} key={item._id} checked={this.state.checked.indexOf(item._id) !== -1} />)
                                :
                                null
                            }
                        </List>
                    </Collapse>
                </List>

            </div>
        );
    }
}

export default CollapseCheckbox;