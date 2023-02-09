import React from "react";
import {experimentalStyled as styled, useTheme} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import {EmptyIllustration} from "assets/index";

const Result = ({
    title,
    description,
    icon: Illustration = EmptyIllustration,
    iconProps = {},
    iconSize = 240,
    extra,
    ...other
}) => {
    const theme = useTheme();
    const {sx: iconSx, ...otherIconProps} = iconProps;

    return (
        <ResultContainer {...other}>
            <Illustration
                sx={{
                    width: iconSize,
                    height: "auto",
                    margin: theme.spacing(3),
                    ...iconSx
                }}
                {...otherIconProps}
            />

            {title && (
                <Typography variant={description ? "h6" : "body2"} gutterBottom>
                    {title}
                </Typography>
            )}

            {description && (
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {description}
                </Typography>
            )}

            {extra && <Box>{extra}</Box>}
        </ResultContainer>
    );
};

const ResultContainer = styled("div")(({theme}) => ({
    padding: theme.spacing(4),
    display: "flex",
    height: "100%",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
}));

export default Result;
