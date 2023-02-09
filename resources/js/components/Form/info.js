import React from "react";
import {FormControl, FormHelperText} from "@mui/material";

const Info = ({errors, margin = "normal"}) => {
    return (
        <FormControl margin={margin}>
            {errors.map((error, i) => (
                <FormHelperText key={i} error>
                    {error}
                </FormHelperText>
            ))}
        </FormControl>
    );
};

export default Info;
