import React from "react";
import PropTypes from "prop-types";
import {m, AnimatePresence} from "framer-motion";
import {Dialog, Box, Paper} from "@mui/material";
import {varFade} from "./variants";

const DialogAnimate = ({
    open = false,
    variants,
    onClose,
    children,
    sx,
    ...otherProps
}) => {
    return (
        <AnimatePresence>
            {open && (
                <Dialog
                    maxWidth="xs"
                    open={open}
                    onClose={onClose}
                    fullWidth
                    PaperComponent={(props) => (
                        <Box
                            component={m.div}
                            {...(variants ||
                                varFade({
                                    durationOut: 0.24,
                                    durationIn: 0.32,
                                    easeIn: "easeInOut",
                                    distance: 120
                                }).inUp)}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: "100%"
                            }}>
                            <Box
                                onClick={onClose}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    position: "fixed"
                                }}
                            />
                            <Paper sx={sx} {...props}>
                                {props.children}
                            </Paper>
                        </Box>
                    )}
                    {...otherProps}>
                    {children}
                </Dialog>
            )}
        </AnimatePresence>
    );
};

DialogAnimate.propTypes = {
    sx: PropTypes.object,
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    variants: PropTypes.object
};

export default DialogAnimate;
