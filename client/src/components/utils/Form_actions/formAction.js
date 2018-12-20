import { loginValidation } from '../Validation/login';


//FORM ACTION
export const formAction = (e, state) => {
    //1-create a copy from FORM state - chon mikhay ke mutate konimesh
    const stateCopy = {
        ...state
    };

    //2-estekhraj parameter haye marboot be in input khas ke EVENT roosh etefagh oftade
    const element = {
        ...stateCopy[e.id]
    };

    //3-set kardan value input = controlled input
    element.value = e.event.target.value; //meghdar type shode dakhel input ro mizarim 

    //4-Validate kardan meghdat vared shode dat input
    if (e.blur) { //yani zamani ke event BLUR rokh dad -> validation ro anjam midim
        const validationResult = loginValidation(element, state);
        element.valid = validationResult.isValid;
        element.validationMessage = validationResult.message;
    }

    element.touched = e.blur;

    stateCopy[e.id] = element;

    return stateCopy
};

/*********************************************************************************************** */
//GENERATE DATA
export const generateData = (formData, formName) => {
    const data = {};

    for (let key in formData) {
        data[key] = formData[key].value
    }

    return data;
};

/*********************************************************************************************** */
//FORM DATA VALID
export const isFormValid = (formData, formName) => {
    let error = {
        isValid: true,
        message: ''
    };

    for (let key in formData) {
        error.isValid = formData[key].valid && error.isValid;
    }

    return error
};