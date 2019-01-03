import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getWoods } from '../../../store/actions/product';
import FormField from '../../utils/Form_component/FormField';
import { formAction, generateData, isFormValid, resetFormField } from '../../utils/Form_actions/formAction';


class AddWood extends Component {
    render() {
        return (
            <div>
                Add Wood
                </div>
        );
    }
}

export default connect()(AddWood);