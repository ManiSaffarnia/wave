const isEmpty = require('./is_empty');
const _ = require('lodash');

module.exports = (data) => {
    /*Register data:
        name - string, required, min=2, max:40
        email - string, required, max=255
        password - string, required, min=8, max=20
    */
    const errors = {};
    let { name, email, password, passwordConfirm } = _.pick(data, ['name', 'email', 'password', 'passwordConfirm']);

    name = !isEmpty(name) ? name : '';
    email = !isEmpty(email) ? email : '';
    password = !isEmpty(password) ? password : '';
    passwordConfirm = !isEmpty(passwordConfirm) ? passwordConfirm : '';


    /*NAME*/
    if (isEmpty(name)) errors.name = 'Name field is required';
    else {
        const nameRex = /^[\u0600-\u06FF\u0750-\u077Fa-zA-Z ]*$/;

        if (!nameRex.test(name)) {
            errors.name = 'name can not contain numbers';
        } else {
            if (!validator.isLength(name, { min: 2, max: 40 }))
                errors.name = 'name should be between 2-40 charachters';
        }
    }

    /*EMAIL*/
    if (isEmpty(email)) errors.email = 'Email field is required';
    else {
        if (!validator.isEmail(email)) errors.email = 'Email format is wrong';
    }

    /*PASSWORD*/
    if (isEmpty(password)) errors.password = 'Password field is required';
    else {
        if (!validator.isLength(password, { min: 8, max: 20 })) errors.password = 'Password should be between 8-20 characters';
    }

    /*PASSWORD_CONFRIM*/
    if (isEmpty(passwordConfirm)) errors.passwordConfirm = 'Password confirmation is required';
    else {
        if (password !== passwordConfirm) {
            errors.password = 'Password and Passwrod confirmation are not match';
            errors.passwordConfirm = 'Password and Passwrod confirmation are not match';
        }
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }

};