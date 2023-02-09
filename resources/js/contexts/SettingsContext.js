import React, {createContext, useState} from "react";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import getColorPresets, {
    colorPresets,
    defaultPreset
} from "theme/utils/getColorPresets";
import {errorHandler, route, useRequest} from "services/Http";
import {get} from "lodash";

const initialState = {
    themeMode: "dark",
    themeDirection: "ltr",
    themeColor: "default",
    themeStretch: false,
    themeLayout: "horizontal",
    toasterPosition: "top-right",
    themeContrast: "default"
};

const SettingsContext = createContext({
    ...initialState,
    // MODE
    onToggleMode: () => {},
    onChangeMode: () => {},

    // DIRECTION
    onChangeDirection: () => {},

    // LAYOUT
    onChangeLayout: () => {},

    // CONTRAST
    onChangeContrast: () => {},

    // COLOR
    activeColor: defaultPreset,
    onChangeColor: () => {},
    colorOption: [],

    // STRETCH
    onToggleStretch: () => {},

    // RESET
    onResetSetting: () => {}
});

function SettingsProvider({children}) {
    const [request] = useRequest();

    const saved = useSelector((state) => {
        return get(state, "settings.theme");
    });

    const [settings, setSettings] = useState({
        ...initialState,
        themeMode: saved.mode,
        themeDirection: saved.direction,
        themeColor: saved.color
    });

    const saveSettings = (path, value) => {
        request.post(route(path), {value}).catch(errorHandler());
    };

    // MODE
    const onChangeMode = (mode) => {
        setSettings({...settings, themeMode: mode});
        saveSettings("admin.theme.set-mode", mode);
    };

    const onToggleMode = () => {
        const mode = settings.themeMode === "light" ? "dark" : "light";
        setSettings({...settings, themeMode: mode});
    };

    // DIRECTION
    const onChangeDirection = (direction) => {
        setSettings({...settings, themeDirection: direction});
        saveSettings("admin.theme.set-direction", direction);
    };

    // LAYOUT
    const onChangeLayout = (layout) => {
        setSettings({...settings, themeLayout: layout});
    };

    // CONTRAST
    const onChangeContrast = (contrast) => {
        setSettings({...settings, themeContrast: contrast});
    };

    // COLOR
    const onChangeColor = (color) => {
        setSettings({...settings, themeColor: color});
        saveSettings("admin.theme.set-color", color);
    };

    // STRETCH
    const onToggleStretch = () => {
        setSettings({...settings, themeStretch: !settings.themeStretch});
    };

    return (
        <SettingsContext.Provider
            value={{
                ...settings,
                // MODE
                onToggleMode,
                onChangeMode,

                // DIRECTION
                onChangeDirection,

                // LAYOUT
                onChangeLayout,

                // CONTRAST
                onChangeContrast,

                // STRETCH
                onToggleStretch,

                // COLOR
                onChangeColor,
                activeColor: getColorPresets(settings.themeColor),
                colorOption: colorPresets.map((color) => ({
                    name: color.name,
                    value: color.main
                }))
            }}>
            {children}
        </SettingsContext.Provider>
    );
}

SettingsProvider.propTypes = {children: PropTypes.node};

export {SettingsProvider, SettingsContext};
