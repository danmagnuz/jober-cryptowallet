import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {
    alpha,
    createTheme,
    ThemeProvider,
    useTheme
} from "@mui/material/styles";
import useSettings from "hooks/useSettings";
import {deepmerge} from "@mui/utils";
import override from "./overrides";

const ThemeContrast = ({children}) => {
    const {themeContrast} = useSettings();
    const defaultTheme = useTheme();

    const hasContrast = themeContrast === "bold";
    const isLight = defaultTheme.palette.mode === "light";

    const shadowColor = isLight
        ? defaultTheme.palette.grey[500]
        : defaultTheme.palette.common.black;

    const bgColor = isLight
        ? defaultTheme.palette.grey[100]
        : defaultTheme.palette.grey[900];

    const themeOptions = useMemo(() => {
        return hasContrast
            ? deepmerge(defaultTheme, {
                  palette: {
                      background: {
                          default: bgColor
                      }
                  }
              })
            : defaultTheme;
    }, [defaultTheme, bgColor, hasContrast]);

    const baseTheme = createTheme(themeOptions);

    // prettier-ignore
    const cardStyle = useMemo(() => ({
        position: 'relative',
        boxShadow: `0 0 1px 0 ${alpha(shadowColor, 0.48)}, 0 2px 4px -1px ${alpha(shadowColor, 0.24)}`,
        borderRadius: Number(defaultTheme.shape.borderRadius) * 2,
        zIndex: 0,
    }), [defaultTheme, shadowColor]);

    const theme = createTheme(baseTheme, {
        components: {
            ...override(baseTheme),
            ...(hasContrast && {
                MuiCard: {
                    styleOverrides: {
                        root: cardStyle
                    }
                }
            })
        }
    });

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

ThemeContrast.propTypes = {
    children: PropTypes.node
};

export default ThemeContrast;
