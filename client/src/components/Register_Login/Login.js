import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FormField from '../utils/Form_component/FormField';
import { formAction, generateData, isFormValid } from '../utils/Form_actions/formAction';
import { loginUser } from '../../store/actions/user';

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
        formError: null,
        formErrorMessage: "Please check your inputs"
    };

    //On Form Submit Hander
    onSubmitHandler = (e) => {
        e.preventDefault();
        const data = generateData(this.state.formData, 'login');
        const { isValid } = isFormValid(this.state.formData, 'login')

        //Show error
        if (!isValid) this.setState({ formError: true });

        //Login Process
        else {
            this.props.dispatch(loginUser(data)).then(response => {
                if (response.loginSuccess) {
                    this.props.history.push('/user/dashboard');
                } else {
                    this.setState({
                        formError: true,
                        formErrorMessage: response.error
                    })
                }
            });
        }
    };//end submit form

    //On Input Change Handler
    onChangeHandler = (e) => {
        const changedFormState = formAction(e, this.state.formData, 'login');
        this.setState({
            formError: false,
            formErrorMessage: '',
            formData: changedFormState
        });
    };

    render() {
        return (
            <div className="signin_wrapper">
                <form onSubmit={this.onSubmitHandler}>
                    {/**Email Feild */}
                    <FormField
                        id={'email'}
                        formData={this.state.formData.email}
                        onChange={this.onChangeHandler}
                    />

                    {/**Password Field */}
                    <FormField
                        id={'password'}
                        formData={this.state.formData.password}
                        onChange={this.onChangeHandler}
                    />


                    {/**Error hai ke az samte server miad ya error haye koli */}
                    {this.state.formError && <div className="error_label">{this.state.formErrorMessage}</div>}


                    <button onClick={this.onSubmitHandler}>Log in</button>

                </form>
            </div>
        );
    }
}
// const mapStateToProps = (storeState) => ({

// });

// const mapDispatchToProps = (dispatch) => ({
//     loginUser: (data) => { dispatch(loginUser(data)) }
// });

export default connect()(withRouter(Login));