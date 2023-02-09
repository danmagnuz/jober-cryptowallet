import React from "react";
import PropTypes from "prop-types";
import {createTheme, ThemeProvider, useTheme} from "@mui/material/styles";
import {enUS} from "@mui/material/locale";

const ThemeLocalization = ({children}) => {
    const defaultTheme = useTheme();
    const theme = createTheme(defaultTheme, enUS);

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

ThemeLocalization.propTypes = {
    children: PropTypes.node.isRequired
};

export default ThemeLocalization;
