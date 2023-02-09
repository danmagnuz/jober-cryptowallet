import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {deepmerge} from "@mui/utils";
import useSettings from "hooks/useSettings";
import override from "./overrides";
import {
    alpha,
    ThemeProvider,
    createTheme,
    useTheme
} from "@mui/material/styles";

const ThemeColorPresets = ({children}) => {
    const defaultTheme = useTheme();
    const {activeColor} = useSettings();

    const themeOptions = useMemo(() => {
        return deepmerge(defaultTheme, {
            palette: {
                primary: activeColor
            },
            customShadows: {
                primary: `0 8px 16px 0 ${alpha(activeColor.main, 0.24)}`
            }
        });
    }, [defaultTheme, activeColor]);

    const baseTheme = createTheme(themeOptions);
    const theme = createTheme(baseTheme, {
        components: override(baseTheme)
    });

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

ThemeColorPresets.propTypes = {
    children: PropTypes.node
};

export default ThemeColorPresets;
