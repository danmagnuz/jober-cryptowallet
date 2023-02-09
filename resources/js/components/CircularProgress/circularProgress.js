import React from "react";
import {Box, CircularProgress as BaseCircularProgress} from "@mui/material";
import {experimentalStyled as styled} from "@mui/material/styles";

const CircularProgress = ({value, thickness = 4, ...otherProps}) => {
    return (
        <Box sx={{position: "relative", display: "inline-flex"}}>
            <ProgressBackground
                {...otherProps}
                variant="determinate"
                thickness={thickness}
                value={100}
            />

            <BaseCircularProgress
                {...otherProps}
                variant="determinate"
                thickness={thickness}
                value={value}
            />
        </Box>
    );
};

const ProgressBackground = styled(BaseCircularProgress)(({theme}) => ({
    position: "absolute",
    color: theme.palette.background.neutral,
    top: 0,
    left: 0
}));

export default CircularProgress;
