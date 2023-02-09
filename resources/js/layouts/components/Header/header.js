import React from "react";
import {AppBar, Box, IconButton, Stack, Toolbar} from "@mui/material";
import {Icon} from "@iconify/react";
import menu2Fill from "@iconify-icons/ri/menu-2-fill";
import useNavbarDrawer from "hooks/useNavbarDrawer";
import useMinOffsetY from "hooks/useMinOffsetY";
import useScreenType from "hooks/useScreenType";
import {HEADER_CONFIG, NAVBAR_CONFIG} from "layouts/config";
import {styled} from "@mui/material/styles";
import cssStyle from "utils/cssStyle";

const Header = ({onOpenSidebar, content, actions}) => {
    const {isCollapse} = useNavbarDrawer();
    const isOffset = useMinOffsetY(HEADER_CONFIG.DASHBOARD_DESKTOP_HEIGHT);
    const {isDesktop} = useScreenType();

    return (
        <StyledAppBar
            isOffset={isOffset}
            isCollapse={isCollapse}
            isDesktop={isDesktop}>
            <StyledToolbar>
                {!isDesktop && (
                    <IconButton
                        sx={{mr: 2, color: "text.primary"}}
                        onClick={onOpenSidebar}>
                        <Icon icon={menu2Fill} />
                    </IconButton>
                )}

                {content}

                <Box sx={{flexGrow: 1}} />

                {actions && (
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={{xs: 0.5, sm: 1.5}}
                        alignItems="center">
                        {actions}
                    </Stack>
                )}
            </StyledToolbar>
        </StyledAppBar>
    );
};

const StyledAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => {
        return !["isCollapse", "isOffset", "isDesktop"].includes(prop);
    }
})(({isCollapse, isOffset, theme}) => ({
    ...cssStyle(theme).bgBlur(),
    height: HEADER_CONFIG.MOBILE_HEIGHT,
    boxShadow: "none",
    transition: theme.transitions.create(["width", "height"], {
        duration: theme.transitions.duration.shorter
    }),
    zIndex: theme.zIndex.appBar + 1,

    [theme.breakpoints.up("lg")]: {
        width: `calc(100% - ${NAVBAR_CONFIG.DASHBOARD_WIDTH + 1}px)`,
        height: HEADER_CONFIG.DASHBOARD_DESKTOP_HEIGHT,
        ...(isCollapse && {
            width: `calc(100% - ${NAVBAR_CONFIG.DASHBOARD_COLLAPSE_WIDTH}px)`
        }),
        ...(isOffset && {
            height: HEADER_CONFIG.DASHBOARD_DESKTOP_OFFSET_HEIGHT
        })
    }
}));

const StyledToolbar = styled(Toolbar)(({theme}) => ({
    minHeight: "100% !important",
    [theme.breakpoints.up("lg")]: {
        paddingRight: theme.spacing(5),
        paddingLeft: theme.spacing(5)
    }
}));

export default Header;
