import React, {useMemo} from "react";
import {CssBaseline} from "@mui/material";
import override from "./overrides";
import useSettings from "hooks/useSettings";
import typography from "./typography";
import breakpoints from "./breakpoints";
import palette from "./palette";
import shadows, {customShadows} from "./shadows";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import ThemeColorPresets from "./ThemeColorPresets";
import ThemeContrast from "./ThemeContrast";
import ThemeLocalization from "./ThemeLocalization";

const ThemeContainer = ({children}) => {
    const {themeMode, themeDirection} = useSettings();

    const isLight = themeMode === "light";

    const themeOptions = useMemo(
        () => ({
            palette: isLight ? palette.light : palette.dark,
            typography,
            breakpoints,
            direction: themeDirection,
            shadows: isLight ? shadows.light : shadows.dark,
            customShadows: isLight ? customShadows.light : customShadows.dark,
            shape: {borderRadius: 8}
        }),
        [isLight, themeDirection]
    );

    const baseTheme = createTheme(themeOptions);
    const theme = createTheme(baseTheme, {
        components: override(baseTheme)
    });

    return (
        <ThemeProvider theme={theme}>
            <ThemeColorPresets>
                <ThemeContrast>
                    <ThemeLocalization>
                        <CssBaseline />
                        {children}
                    </ThemeLocalization>
                </ThemeContrast>
            </ThemeColorPresets>
        </ThemeProvider>
    );
};

export default ThemeContainer;
