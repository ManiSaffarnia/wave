import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const CollapseCheckboxItem = (props) => {
    const item = props.item;

    const onChangeHandler = () => {
        props.onChange(item._id);
    };

    return (
        <ListItem key={item._id} style={{ padding: '10px 0' }}>
            <ListItemText primary={item.name} />
            <ListItemSecondaryAction>
                <Checkbox color="primary" onChange={onChangeHandler} checked={props.checked} />
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default CollapseCheckboxItem;