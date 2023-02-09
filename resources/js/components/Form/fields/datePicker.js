import React, {useContext, useMemo} from "react";
import TextField from "@mui/material/TextField";
import {FormInputContext} from "../contexts";
import {DatePicker as BaseDatePicker} from "@mui/x-date-pickers";
import {isEmpty} from "lodash";

const DatePicker = ({
    inputFormat = "L",
    defaultValue = null,
    onChange,
    value,
    helperText,
    ...baseProps
}) => {
    const {
        isRequired,
        label,
        validateStatus,
        errors = []
    } = useContext(FormInputContext);

    const content = useMemo(
        () => (value?.isValid() ? value : defaultValue),
        [value, defaultValue]
    );

    switch (validateStatus) {
        case "error":
            baseProps.error = true;
            break;
        case "success":
            baseProps.color = "primary";
            break;
        default:
            baseProps.color = "info";
    }

    helperText = isEmpty(errors) ? helperText : errors.join(", ");

    return (
        <BaseDatePicker
            label={label}
            inputFormat={inputFormat}
            onChange={onChange}
            value={content}
            renderInput={(renderParams) => (
                <TextField
                    {...renderParams}
                    {...baseProps}
                    helperText={helperText}
                    required={isRequired}
                />
            )}
        />
    );
};

export default DatePicker;
