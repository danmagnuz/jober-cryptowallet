import React from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {SettingsProvider} from "contexts/SettingsContext";
import ThemeOverride from "theme";
import PropTypes from "prop-types";
import RtlLayout from "components/RtlLayout";
import {MotionLazyContainer} from "components/Animate";
import {NavbarDrawerProvider} from "contexts/NavbarDrawerContext";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {dayjs} from "utils/index";
import NotistackProvider from "components/NotistackProvider";
import {ModalProvider} from "utils/modal";

const MuiBootstrap = ({children}) => {
    return (
        <MotionLazyContainer>
            <LocalizationProvider
                dateLibInstance={dayjs}
                dateAdapter={AdapterDayjs}
                adapterLocale={"en"}>
                <SettingsProvider>
                    <ThemeOverride>
                        <RtlLayout>
                            <NavbarDrawerProvider>
                                <NotistackProvider />
                                <ModalProvider />
                                {children}
                            </NavbarDrawerProvider>
                        </RtlLayout>
                    </ThemeOverride>
                </SettingsProvider>
            </LocalizationProvider>
        </MotionLazyContainer>
    );
};

MuiBootstrap.propTypes = {children: PropTypes.node};

export default MuiBootstrap;
