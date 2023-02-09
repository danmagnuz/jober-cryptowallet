import React from "react";
import PropTypes from "prop-types";
import {m} from "framer-motion";
import {Box} from "@mui/material";
import {varFade} from "./variants";

const TextAnimate = ({text, variants, sx, ...otherProps}) => {
    return (
        <Box
            component={m.h1}
            sx={{
                overflow: "hidden",
                display: "inline-flex",
                typography: "h1",
                ...sx
            }}
            {...otherProps}>
            {text.split("").map((letter, index) => (
                <m.span key={index} variants={variants || varFade().inUp}>
                    {letter}
                </m.span>
            ))}
        </Box>
    );
};

TextAnimate.propTypes = {
    text: PropTypes.string.isRequired,
    variants: PropTypes.object,
    sx: PropTypes.object
};

export default TextAnimate;
