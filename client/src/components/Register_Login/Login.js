import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../utils/Form_component/FormField';

class Login extends Component {

    state = {
        formData: {
            email: {
                element: "input",
                value: "",
                config: {
                    name: "email",
                    type: "email",
                    placeholder: "Enter your email"
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ""
            },
            password: {
                element: "input",
                value: "",
                config: {
                    name: "password",
                    type: "password",
                    placeholder: "Enter your password"
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ""
            }
        },
        formSuccess: '',
        formError: null
    };

    onSubmitHandler = (e) => {
        e.preventDefault();
        console.log('submit');

    };

    onChangeHandler = (e) => {
        // this.setState((prevState) => ({
        //     'formData[e.id]':""
          // }));
    };

    render() {
        return (
            <div className="signin_wrapper">
                <form onSubmit={this.onSubmitHandler}>

                    <FormField
                        id={'email'}
                        formData={this.state.formData.email}
                        onChange={this.onChangeHandler}
                    />


                </form>
            </div>
        );
    }
}

export default connect()(Login);