import React from "react";
import {Box} from "@mui/material";
import PropTypes from "prop-types";
import {varContainer} from "./variants";
import {m} from "framer-motion";
import useScreenType from "hooks/useScreenType";

const MotionViewport = ({
    children,
    disableAnimatedMobile = true,
    ...otherProps
}) => {
    const {isMobile} = useScreenType();

    if (isMobile && disableAnimatedMobile) {
        return <Box {...otherProps}>{children}</Box>;
    }

    return (
        <Box
            {...otherProps}
            whileInView="animate"
            component={m.div}
            viewport={{once: true, amount: 0.3}}
            variants={varContainer()}
            initial="initial">
            {children}
        </Box>
    );
};

MotionViewport.propTypes = {
    children: PropTypes.node.isRequired,
    disableAnimatedMobile: PropTypes.bool
};

export default MotionViewport;
