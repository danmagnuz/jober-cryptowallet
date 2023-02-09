import React from "react";
import {ICON_CONFIG, NAVBAR_CONFIG} from "layouts/config";
import PropTypes from "prop-types";
import {
    Box,
    Link,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import {isFunction} from "lodash";
import {NavLink as RouterLink} from "react-router-dom";
import {alpha, styled} from "@mui/material/styles";
import Iconify from "components/Iconify";
import useNavbarDrawer from "hooks/useNavbarDrawer";
import arrowIosDownwardFill from "@iconify/icons-eva/arrow-ios-downward-fill";
import arrowIosForwardFill from "@iconify/icons-eva/arrow-ios-forward-fill";

const NavItem = ({item, level, active, onToggle, open = false}) => {
    const isSubItem = level > 0;
    const {isCollapse} = useNavbarDrawer();

    const renderContent = (
        <React.Fragment>
            {isSubItem ? (
                <DotIcon active={active} />
            ) : (
                item.icon && (
                    <StyledListItemIcon>
                        <Iconify height="100%" icon={item.icon} width="100%" />
                    </StyledListItemIcon>
                )
            )}

            <StyledListItemText
                disableTypography
                isCollapse={isCollapse}
                primary={item.title}
            />

            {!isCollapse && isFunction(onToggle) && (
                <Iconify
                    icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
                    sx={{width: 16, height: 16, ml: 1}}
                />
            )}
        </React.Fragment>
    );

    return isExternal(item.path) ? (
        <StyledListItem
            component={Link}
            subItem={isSubItem}
            href={item.path}
            target="_blank"
            disabled={item.disabled}
            rel="noopener">
            {renderContent}
        </StyledListItem>
    ) : isFunction(onToggle) ? (
        <StyledListItem
            onClick={onToggle}
            subItem={isSubItem}
            disabled={item.disabled}
            active={active}>
            {renderContent}
        </StyledListItem>
    ) : (
        <StyledListItem
            subItem={isSubItem}
            component={RouterLink}
            to={item.path}
            disabled={item.disabled}
            active={active}>
            {renderContent}
        </StyledListItem>
    );
};

const DotIcon = ({active}) => {
    return (
        <StyledListItemIcon>
            <Box
                component="span"
                sx={(theme) => ({
                    height: 4,
                    borderRadius: "50%",
                    width: 4,
                    bgcolor: "text.disabled",
                    transition: theme.transitions.create("transform", {
                        duration: theme.transitions.duration.shorter
                    }),
                    ...(active && {
                        transform: "scale(2)",
                        bgcolor: "primary.main"
                    })
                })}
            />
        </StyledListItemIcon>
    );
};

function isExternal(path) {
    return path?.startsWith("http");
}

// prettier-ignore
const StyledListItem = styled(ListItemButton, {
    shouldForwardProp: (prop) => !["active", "subItem"].includes(prop)
})(({active = false, subItem = false, theme}) => ({
    ...theme.typography.body2,
    position: "relative",
    color: theme.palette.text.secondary,
    height: NAVBAR_CONFIG.DASHBOARD_ITEM_ROOT_HEIGHT,
    borderRadius: theme.shape.borderRadius,
    paddingRight: theme.spacing(1.5),
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(0.5),
    textTransform: "capitalize",
    ...(subItem && {
        height: NAVBAR_CONFIG.DASHBOARD_ITEM_SUB_HEIGHT
    }),
    ...(active && !subItem && {
        ...theme.typography.subtitle2,
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        color: theme.palette.primary.main,
    }),
    ...(active && subItem && {
        ...theme.typography.subtitle2,
        color: theme.palette.text.primary
    })
}));

const StyledListItemText = styled(ListItemText, {
    shouldForwardProp: (prop) => prop !== "isCollapse"
})(({isCollapse, theme}) => ({
    whiteSpace: "nowrap",
    overflow: "hidden",
    transition: theme.transitions.create("width", {
        duration: theme.transitions.duration.shorter
    }),
    ...(isCollapse && {
        width: theme.spacing(0)
    })
}));

const StyledListItemIcon = styled(ListItemIcon)({
    display: "flex",
    height: ICON_CONFIG.NAVBAR_ITEM,
    width: ICON_CONFIG.NAVBAR_ITEM,
    justifyContent: "center",
    "& svg": {width: "100%", height: "100%"},
    alignItems: "center"
});

NavItem.propTypes = {
    item: PropTypes.object.isRequired,
    level: PropTypes.number.isRequired,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
    active: PropTypes.bool
};

export default NavItem;
