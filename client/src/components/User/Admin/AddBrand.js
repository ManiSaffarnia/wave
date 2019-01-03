import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBrands, addBrand } from '../../../store/actions/product';
import FormField from '../../utils/Form_component/FormField';
import { formAction, generateData, isFormValid, resetFormField } from '../../utils/Form_actions/formAction';


class AddBrand extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formErrorMessage: 'Please check your inputs',
        formData: {
            name: {
                element: "input",
                value: "",
                config: {
                    name: "name",
                    type: "text",
                    placeholder: "Enter Brand's name"
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ""
            }
        }
    };

    componentDidMount() {
        this.props.dispatch(getBrands())
    }

    formResetHandler = () => {
        const newFromData = resetFormField(this.state.formData, 'addBrand');
        this.setState({
            formSuccess: true,
            formData: newFromData
        });

        //hide success message
        setTimeout(() => {
            this.setState({
                formSuccess: false
            })
        }, 3000);
    };

    onSubmitFormHandler = (e) => {
        e.preventDefault();
        const data = generateData(this.state.formData, 'addBrand');
        const { isValid } = isFormValid(this.state.formData, 'addBrand')

        //Show error
        if (!isValid) this.setState({ formError: true });

        //add Brand
        else {
            this.props.dispatch(addBrand(data)).then(response => {
                if (response.success) {
                    this.props.dispatch(getBrands())
                    //reset the form
                    this.formResetHandler();
                }
                else {
                    this.setState({ formError: true });
                }
            })
        }
    };

    onChangeHandler = (e) => {
        const changedFormState = formAction(e, this.state.formData, 'addBrand');
        this.setState({
            formError: false,
            formErrorMessage: '',
            formData: changedFormState
        });
    };//end input change

    showBrandsItems = () => (
        //TODO: delete brands
        this.props.products.brands ?
            this.props.products.brands.map(item => (
                <div className="category_item" key={item._id}>
                    {item.name}
                </div>
            )) : null
    );


    render() {
        return (
            <div className="admin_category_wrapper">
                <h1>Brands</h1>
                <div className="admin_two_column">
                    <div className="left">
                        <div className="brands_container">
                            {this.showBrandsItems()}
                        </div>
                    </div>
                    <div className="right">

                        <form onSubmit={this.onSubmitFormHandler}>

                            {/**NAME FIELD */}
                            <FormField
                                id={'name'}
                                formData={this.state.formData.name}
                                onChange={this.onChangeHandler}
                            />

                            {/**FORM SUCCESS */}
                            {this.state.formSuccess && <div className="form_success">Success</div>}

                            <div>
                                {/**Error hai ke az samte server miad ya error haye koli */}
                                {this.state.formError && <div className="error_label">{this.state.formErrorMessage}</div>}

                                <button onClick={this.onSubmitFormHandler}>Add Brand</button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    products: state.products
});

export default connect(mapStateToProps)(AddBrand);