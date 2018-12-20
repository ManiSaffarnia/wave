import React from 'react';
import Button from '../utils/Button';
import Login from './Login';
const RegisterLogin = (props) => {
    return (
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        <h1>New Customer</h1>
                        <p> Bacon ipsum dolor amet shank pig doner shoulder, ground round buffalo hamburger biltong tri-tip boudin andouille kielbasa.</p>
                        <Button
                            type="default"
                            title="Create an account"
                            linkTo="/register"
                            addStyles={{ margin: '10px 0 0 0' }}
                        />
                    </div>
                    <div className="right">
                        <h2>Register customers</h2>
                        <p>If you have an account please log in.</p>
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterLogin;