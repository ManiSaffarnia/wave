export const loginValidation = (element, formState = {}) => {
    let error = {
        isValid: true,
        message: ''
    };


    //Required
    if (element.validation.required) {
        const isValid = element.value.trim() !== '';
        const message = isValid ? '' : `${element.config.name} field is required.`;
        error = {
            isValid,
            message
        };
    }

    //Email validation
    if (element.validation.email && error.isValid) {
        const isValid = element.value.match(/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@(([0-9a-zA-Z])+([-\w]*[0-9a-zA-Z])*\.)+[a-zA-Z]{2,9})$/);
        const message = isValid ? '' : 'Email is not valid';
        error = {
            isValid,
            message
        };
    }

    //confirm
    if (element.validation.confirm && error.isValid) {
        const isValid = element.value === formState[element.validation.confirm].value;
        const message = isValid ? '' : `${element.config.name} is not match ${formState[element.validation.confirm].config.name}`;
        error = {
            isValid,
            message
        }
    }

    return error
}