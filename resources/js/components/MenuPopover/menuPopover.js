import React from "react";
import PropTypes from "prop-types";
import {alpha, styled} from "@mui/material/styles";
import {Popover} from "@mui/material";

function MenuPopover({children, sx, ...otherProps}) {
    return (
        <Popover
            PaperProps={{
                sx: (theme) => ({
                    mt: 1.5,
                    ml: 0.5,
                    overflow: "inherit",
                    border: `solid 1px ${theme.palette.grey[500_8]}`,
                    boxShadow: theme.customShadows.z20,
                    width: 200,
                    ...sx
                })
            }}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            {...otherProps}>
            <MenuArrow className="arrow" />
            {children}
        </Popover>
    );
}

const MenuArrow = styled("span")(({theme}) => ({
    [theme.breakpoints.up("sm")]: {
        zIndex: 1,
        width: 12,
        right: 20,
        height: 12,
        top: -7,
        background: theme.palette.background.paper,
        borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
        borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
        position: "absolute",
        transform: "rotate(-135deg)",
        borderRadius: "0 0 4px 0",
        content: "''"
    }
}));

MenuPopover.propTypes = {
    children: PropTypes.node.isRequired,
    sx: PropTypes.object
};

export default MenuPopover;
