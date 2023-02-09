import React, {forwardRef, useMemo} from "react";
import PropTypes from "prop-types";
import {Box, IconButton} from "@mui/material";
import {m} from "framer-motion";

const IconButtonAnimate = forwardRef((props, ref) => {
    const {children, size = "medium", ...otherProps} = props;

    return (
        <AnimateWrap size={size}>
            <IconButton size={size} ref={ref} {...otherProps}>
                {children}
            </IconButton>
        </AnimateWrap>
    );
});

const AnimateWrap = ({size, children}) => {
    const variants = useMemo(() => {
        switch (size) {
            case "small":
                return {
                    hover: {scale: 1.1},
                    tap: {scale: 0.95}
                };
            case "large":
                return {
                    hover: {scale: 1.08},
                    tap: {scale: 0.99}
                };
            default:
                return {
                    hover: {scale: 1.09},
                    tap: {scale: 0.97}
                };
        }
    }, [size]);

    return (
        <Box
            component={m.div}
            sx={{display: "inline-flex"}}
            variants={variants}
            whileTap="tap"
            whileHover="hover">
            {children}
        </Box>
    );
};

IconButtonAnimate.propTypes = {
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
    size: PropTypes.oneOf(["small", "medium", "large"])
};

AnimateWrap.prototype = {
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOf(["small", "medium", "large"])
};

export default IconButtonAnimate;
