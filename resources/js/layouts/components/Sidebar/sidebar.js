import React from "react";
import {Drawer} from "@mui/material";
import PropTypes from "prop-types";
import {styled} from "@mui/material/styles";
import useSidebarAutoClose from "hooks/useSidebarAutoClose";
import useScreenType from "hooks/useScreenType";
import useNavbarDrawer from "hooks/useNavbarDrawer";
import SidebarContent from "./components/SidebarContent";
import {NAVBAR_CONFIG} from "layouts/config";
import cssStyle from "utils/cssStyle";

const Sidebar = ({isOpenSidebar, onCloseSidebar, links, action, extras}) => {
    const {isDesktop} = useScreenType();
    const {
        isCollapse,
        collapseClick,
        collapseHover,
        onHoverEnter,
        onHoverLeave
    } = useNavbarDrawer();

    useSidebarAutoClose(isOpenSidebar, onCloseSidebar);

    return (
        <SidebarContainer
            isCollapse={isCollapse}
            collapseClick={collapseClick}
            isDesktop={isDesktop}>
            {isDesktop ? (
                <Drawer
                    open={true}
                    onMouseEnter={onHoverEnter}
                    onMouseLeave={onHoverLeave}
                    variant="permanent"
                    PaperProps={{
                        sx: (theme) => ({
                            bgcolor: "background.default",
                            width: NAVBAR_CONFIG.DASHBOARD_WIDTH,
                            borderRightStyle: "dashed",
                            transition: theme.transitions.create("width", {
                                duration: theme.transitions.duration.standard
                            }),
                            ...(isCollapse && {
                                width: NAVBAR_CONFIG.DASHBOARD_COLLAPSE_WIDTH
                            }),
                            ...(collapseHover && {
                                boxShadow: theme.customShadows.z24,
                                ...cssStyle(theme).bgBlur()
                            })
                        })
                    }}>
                    <SidebarContent
                        action={action}
                        links={links}
                        extras={extras}
                    />
                </Drawer>
            ) : (
                <Drawer
                    open={isOpenSidebar}
                    PaperProps={{sx: {width: NAVBAR_CONFIG.DASHBOARD_WIDTH}}}
                    onClose={onCloseSidebar}>
                    <SidebarContent
                        action={action}
                        links={links}
                        extras={extras}
                    />
                </Drawer>
            )}
        </SidebarContainer>
    );
};

const SidebarContainer = styled("div", {
    shouldForwardProp: (prop) => prop === "children"
})(({theme, isCollapse, collapseClick}) => ({
    [theme.breakpoints.up("lg")]: {
        width: isCollapse
            ? NAVBAR_CONFIG.DASHBOARD_COLLAPSE_WIDTH
            : NAVBAR_CONFIG.DASHBOARD_WIDTH,
        transition: theme.transitions.create("width", {
            duration: theme.transitions.duration.shorter
        }),
        flexShrink: 0
    },
    ...(collapseClick && {
        position: "absolute"
    })
}));

Sidebar.propTypes = {
    isOpenSidebar: PropTypes.bool,
    onCloseSidebar: PropTypes.func
};

export default Sidebar;
