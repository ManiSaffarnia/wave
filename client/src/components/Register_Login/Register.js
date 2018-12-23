import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../utils/Form_component/FormField';
import { formAction, generateData, isFormValid } from '../utils/Form_actions/formAction';
import { registerUser } from '../../store/actions/user';
import Dialog from '@material-ui/core/Dialog';

class Register extends Component {

    state = {
        formSuccess: false,
        formError: null,
        formErrorMessage: "Please check your inputs",
        formData: {
            name: {
                element: "input",
                value: "",
                config: {
                    name: "name",
                    type: "text",
                    placeholder: "Enter your name"
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ""
            },
            lastname: {
                element: "input",
                value: "",
                config: {
                    name: "lastname",
                    type: "text",
                    placeholder: "Enter your last name"
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ""
            },
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
            },
            passwordConfirm: {
                element: "input",
                value: "",
                config: {
                    name: "passwordConfirm",
                    type: "password",
                    placeholder: "Please Re-type your password"
                },
                validation: {
                    required: true,
                    confirm: 'password'
                },
                valid: false,
                touched: false,
                validationMessage: ""
            }
        }
    };


    onChangeHandler = (e) => {
        const changedFormState = formAction(e, this.state.formData, 'register');
        this.setState({
            formError: false,
            formErrorMessage: '',
            formData: changedFormState
        });
    };//end input change


    onSubmitHandler = (e) => {
        e.preventDefault();
        const data = generateData(this.state.formData, 'register');
        const { isValid } = isFormValid(this.state.formData, 'register')

        //Show error
        if (!isValid) this.setState({ formError: true });

        //Login Process
        else {
            console.log(data);
            this.props.dispatch(registerUser(data)).then(response => {
                if (response.success) {
                    this.setState({ formSuccess: true });
                    setTimeout(() => {
                        this.props.history.push('/register_login')
                    }, 5000);
                } else {
                    this.setState({
                        formError: true,
                        formErrorMessage: response.error
                    })
                }
            });
        }
    };//end submit form


    render() {
        return (
            <div className="page_wrapper">
                <div className="container">
                    <div className="register_login_container">
                        <div className="left">
                            <form onSubmit={this.onSubmitHandler}>
                                <h2>Personal Information</h2>

                                <div className="form_block_two">
                                    <div className="block">
                                        {/**Name Feild */}
                                        <FormField
                                            id={'name'}
                                            formData={this.state.formData.name}
                                            onChange={this.onChangeHandler}
                                        />
                                    </div>

                                    <div className="block">
                                        {/**LastName Feild */}
                                        <FormField
                                            id={'lastname'}
                                            formData={this.state.formData.lastname}
                                            onChange={this.onChangeHandler}
                                        />
                                    </div>
                                </div>

                                <div className="block">
                                    {/**Email Feild */}
                                    <FormField
                                        id={'email'}
                                        formData={this.state.formData.email}
                                        onChange={this.onChangeHandler}
                                    />
                                </div>


                                <h2>Verify Password</h2>
                                <div className="form_block_two">
                                    <div className="block">
                                        {/**password Feild */}
                                        <FormField
                                            id={'password'}
                                            formData={this.state.formData.password}
                                            onChange={this.onChangeHandler}
                                        />
                                    </div>
                                    <div className="block">
                                        {/**passwordConfirm Feild */}
                                        <FormField
                                            id={'passwordConfirm'}
                                            formData={this.state.formData.passwordConfirm}
                                            onChange={this.onChangeHandler}
                                        />
                                    </div>
                                </div>


                                <div>
                                    {/**Error hai ke az samte server miad ya error haye koli */}
                                    {this.state.formError && <div className="error_label">{this.state.formErrorMessage}</div>}

                                    <button onClick={this.onSubmitHandler}>Create an account</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>


                {/**DIALOG */}
                <Dialog open={this.state.formSuccess}>
                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                    <div className="dialog_alert--center">
                        <div>Congratulations !!</div>
                        <div>Please verify your Email, and then try to login.</div>
                        <div>❤️</div>
                    </div>
                </Dialog>

            </div>
        );
    }
}

export default connect()(Register);