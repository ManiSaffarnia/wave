import React from 'react';

const FormField = ({ formData, onChange, id }) => {

    const renderTemplate = () => {
        let jsxTemplate = null

        switch (formData.element) {
            case "input":
                jsxTemplate = (
                    <div className="formBlock">
                        <input
                            {...formData.config}
                            value={formData.value}
                            onBlur={(event) => onChange({ event, id, blur: true })}
                            onChange={(event) => onChange({ event, id })}
                            id={id}
                        />
                        {(!formData.valid && formData.validation) && (<div className="error_label">{formData.validationMessage}</div>)}
                    </div>
                );
                break;
            default:
                jsxTemplate = null;
        }

        return jsxTemplate;
    };

    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default FormField;