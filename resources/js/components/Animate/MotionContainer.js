import React from "react";
import PropTypes from "prop-types";
import {Box} from "@mui/material";
import {varContainer} from "./variants";
import {m} from "framer-motion";

const MotionContainer = ({
    animate,
    action = false,
    children,
    ...otherProps
}) => {
    if (action) {
        return (
            <Box
                component={m.div}
                initial={false}
                variants={varContainer()}
                animate={animate ? "animate" : "exit"}
                {...otherProps}>
                {children}
            </Box>
        );
    }

    return (
        <Box
            component={m.div}
            initial="initial"
            exit="exit"
            animate="animate"
            variants={varContainer()}
            {...otherProps}>
            {children}
        </Box>
    );
};

MotionContainer.propTypes = {
    action: PropTypes.bool,
    children: PropTypes.node.isRequired,
    animate: PropTypes.bool
};

export default MotionContainer;
