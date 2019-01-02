import React from 'react';

const FormField = ({ formData, onChange, id }) => {

    const renderTemplate = () => {
        let jsxTemplate = null

        switch (formData.element) {
            case "input":
                jsxTemplate = (
                    <div className="formBlock">
                        {formData.showLabel &&
                            <label className="label_inputs" htmlFor={formData.config.name}>
                                {formData.config.label}
                            </label>
                        }
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
            case "select":
                jsxTemplate = (
                    <div className="formBlock">
                        {formData.showLabel &&
                            <label className="label_inputs" htmlFor={formData.config.name}>
                                {formData.config.label}
                            </label>
                        }
                        <select
                            value={formData.value}
                            onBlur={(event) => onChange({ event, id, blur: true })}
                            onChange={(event) => onChange({ event, id })}
                        >
                            <option value="">Select one</option>
                            {
                                formData.config.options.map((item) => (
                                    <option key={item.key} value={item.key}>{item.value}</option>
                                ))
                            }
                        </select>
                        {(!formData.valid && formData.validation) && (<div className="error_label">{formData.validationMessage}</div>)}
                    </div>
                );
                break;
            case "textarea":
                jsxTemplate = (
                    <div className="formBlock">
                        {formData.showLabel &&
                            <label className="label_inputs" htmlFor={formData.config.name}>
                                {formData.config.label}
                            </label>
                        }
                        <textarea
                            {...formData.config}
                            value={formData.value}
                            onBlur={(event) => onChange({ event, id, blur: true })}
                            onChange={(event) => onChange({ event, id })}
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