import React, {forwardRef, useMemo} from "react";
import PropTypes from "prop-types";
import {m} from "framer-motion";
import {useTheme} from "@mui/material/styles";
import {Box, Fab} from "@mui/material";

const FabButtonAnimate = forwardRef((props, ref) => {
    const theme = useTheme();

    const {
        color = "primary",
        size = "large",
        children,
        sx,
        sxWrap,
        ...otherProps
    } = props;

    if (
        color === "default" ||
        color === "inherit" ||
        color === "primary" ||
        color === "secondary"
    ) {
        return (
            <AnimateWrap size={size} sxWrap={sxWrap}>
                <Fab
                    ref={ref}
                    size={size}
                    color={color}
                    sx={sx}
                    {...otherProps}>
                    {children}
                </Fab>
            </AnimateWrap>
        );
    }

    return (
        <AnimateWrap size={size} sxWrap={sxWrap}>
            <Fab
                {...otherProps}
                ref={ref}
                sx={{
                    color: theme.palette[color].contrastText,
                    bgcolor: theme.palette[color].main,
                    "&:hover": {bgcolor: theme.palette[color].dark},
                    boxShadow: theme.customShadows[color],
                    ...sx
                }}
                size={size}>
                {children}
            </Fab>
        </AnimateWrap>
    );
});

const AnimateWrap = ({size, children, sxWrap}) => {
    const variants = useMemo(() => {
        switch (size) {
            case "small":
                return {
                    hover: {scale: 1.07},
                    tap: {scale: 0.97}
                };
            case "large":
                return {
                    hover: {scale: 1.05},
                    tap: {scale: 0.99}
                };
            default:
                return {
                    hover: {scale: 1.06},
                    tap: {scale: 0.98}
                };
        }
    }, [size]);

    return (
        <Box
            whileTap="tap"
            component={m.div}
            variants={variants}
            whileHover="hover"
            sx={{
                display: "inline-flex",
                ...sxWrap
            }}>
            {children}
        </Box>
    );
};

FabButtonAnimate.propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.oneOf([
        "inherit",
        "default",
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error"
    ]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
    sx: PropTypes.object,
    sxWrap: PropTypes.object
};

AnimateWrap.propTypes = {
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOf(["small", "medium", "large"]),
    sxWrap: PropTypes.object
};

export default FabButtonAnimate;
