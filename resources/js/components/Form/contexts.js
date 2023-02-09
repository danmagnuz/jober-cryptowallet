import React, {createContext} from "react";
import {FormProvider as RcFormProvider} from "rc-field-form";

export const FormContext = createContext({});

export const FormInputContext = createContext({
    errors: [],
    isRequired: false
});

export const FormProvider = (props) => {
    return <RcFormProvider {...props} />;
};
