import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBrands, getWoods, addProduct, clearAddedProduct } from '../../../store/actions/product';

import UserDashboardLayout from '../../hoc/UserDashboardLayout';
import FormField from '../../utils/Form_component/FormField';
import FileUpload from '../../utils/FileUpload';
import { formAction, generateData, isFormValid, populateOptionField, resetFormField } from '../../utils/Form_actions/formAction';



class AddProduct extends Component {

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
                    placeholder: "Enter Product's name",
                    label: "Product name"
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true
            },
            description: {
                element: "textarea",
                value: "",
                config: {
                    name: "description",
                    type: "text",
                    placeholder: "Enter description",
                    label: "Product description"
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true
            },
            price: {
                element: "input",
                value: "",
                config: {
                    name: "price",
                    type: "number",
                    placeholder: "Enter Product price",
                    label: "Product price"
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true
            },
            brand: {
                element: "select",
                value: "",
                config: {
                    name: "brand",
                    label: "Product brand",
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true
            },
            wood: {
                element: "select",
                value: "",
                config: {
                    name: "wood",
                    label: "Wood material",
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true
            },
            frets: {
                element: "select",
                value: "",
                config: {
                    name: "frets",
                    label: "Frets",
                    options: [
                        { key: 20, value: 20 },
                        { key: 21, value: 21 },
                        { key: 22, value: 22 },
                        { key: 24, value: 24 }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true
            },
            shipping: {
                element: "select",
                value: "",
                config: {
                    name: "shipping",
                    label: "Shipping",
                    options: [
                        { key: true, value: 'Yes' },
                        { key: false, value: 'No' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true
            },
            available: {
                element: "select",
                value: "",
                config: {
                    name: "available",
                    label: "Available, in stock",
                    options: [
                        { key: true, value: 'Yes' },
                        { key: false, value: 'No' },

                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true
            },
            publish: {
                element: "select",
                value: "",
                config: {
                    name: "publish",
                    label: "Publish",
                    options: [
                        { key: true, value: 'Publish' },
                        { key: false, value: 'Hidden' },

                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true
            },
            images: {
                value: [],
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: "",
                showLabel: false
            }
        }
    };

    componentDidMount() {
        const formData = this.state.formData; //make a copy

        //get brands
        this.props.dispatch(getBrands()).then(response => {
            const newFromData = populateOptionField(formData, this.props.products.brands, 'brand');
            this.setState({
                formData: newFromData
            })
        });

        //get woods
        this.props.dispatch(getWoods()).then(response => {
            const newFromData = populateOptionField(formData, this.props.products.woods, 'wood');
            this.setState({
                formData: newFromData
            })
        });


    }

    componentWillUnmount() {
        this.props.dispatch(clearAddedProduct());
    }

    formResetHandler = () => {
        const newFromData = resetFormField(this.state.formData, 'addProduct');
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
        const data = generateData(this.state.formData, 'addProduct');
        const { isValid } = isFormValid(this.state.formData, 'addProduct')

        //Show error
        if (!isValid) this.setState({ formError: true });

        //add product
        else {
            this.props.dispatch(addProduct(data)).then(response => {
                if (this.props.products.addedProduct.success) {
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
        const changedFormState = formAction(e, this.state.formData, 'addProduct');
        this.setState({
            formError: false,
            formErrorMessage: '',
            formData: changedFormState
        });
    };//end input change

    imagesHandler = (images) => {
        const newFormData = { ...this.state.formData };
        newFormData['images'].value = images;
        newFormData['images'].valid = true;

        this.setState({
            formData: newFormData
        });
    };

    render() {
        return (
            <UserDashboardLayout>
                <div>
                    <h1>Add Product</h1>

                    <form onSubmit={this.onSubmitFormHandler}>

                        {/**TODO: IMAGE UPLOADER */}

                        <FileUpload
                            imagesHandler={this.imagesHandler}
                            reset={this.state.formSuccess}
                        />

                        {/**Name */}
                        <FormField
                            id={'name'}
                            formData={this.state.formData.name}
                            onChange={this.onChangeHandler}
                        />

                        {/**Description */}
                        <FormField
                            id={'description'}
                            formData={this.state.formData.description}
                            onChange={this.onChangeHandler}
                        />

                        {/**Price */}
                        <FormField
                            id={'price'}
                            formData={this.state.formData.price}
                            onChange={this.onChangeHandler}
                        />

                        <div className="form_devider"></div>

                        {/**Brand */}
                        <FormField
                            id={'brand'}
                            formData={this.state.formData.brand}
                            onChange={this.onChangeHandler}
                        />

                        {/**Shipping */}
                        <FormField
                            id={'shipping'}
                            formData={this.state.formData.shipping}
                            onChange={this.onChangeHandler}
                        />

                        {/**Available */}
                        <FormField
                            id={'available'}
                            formData={this.state.formData.available}
                            onChange={this.onChangeHandler}
                        />

                        <div className="form_devider"></div>

                        {/**Wood */}
                        <FormField
                            id={'wood'}
                            formData={this.state.formData.wood}
                            onChange={this.onChangeHandler}
                        />

                        {/**Frets */}
                        <FormField
                            id={'frets'}
                            formData={this.state.formData.frets}
                            onChange={this.onChangeHandler}
                        />

                        <div className="form_devider"></div>

                        {/**Publish */}
                        <FormField
                            id={'publish'}
                            formData={this.state.formData.publish}
                            onChange={this.onChangeHandler}
                        />

                        {/**FORM SUCCESS */}
                        {this.state.formSuccess && <div className="form_success">Success</div>}

                        <div>
                            {/**Error hai ke az samte server miad ya error haye koli */}
                            {this.state.formError && <div className="error_label">{this.state.formErrorMessage}</div>}

                            <button onClick={this.onSubmitFormHandler}>Add Product</button>
                        </div>


                    </form>
                </div>
            </UserDashboardLayout>

        );
    }
}

const mapStateToProps = (state) => ({
    products: state.products
});

export default connect(mapStateToProps)(AddProduct);