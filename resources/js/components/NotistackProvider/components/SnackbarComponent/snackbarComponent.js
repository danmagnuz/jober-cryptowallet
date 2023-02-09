import React, {forwardRef, useMemo} from "react";
import {SnackbarContent} from "notistack";
import {alpha, styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import checkmarkCircle from "@iconify/icons-eva/checkmark-circle-2-fill";
import alertTriangleFill from "@iconify/icons-eva/alert-triangle-fill";
import alertCircleFill from "@iconify/icons-eva/alert-circle-fill";
import infoFill from "@iconify/icons-eva/info-fill";
import {Icon} from "@iconify/react";

const SnackbarComponent = forwardRef((props, ref) => {
    const {id, variant, message, action, style} = props;

    let actionNode = action;

    if (typeof action === "function") {
        actionNode = action(id);
    }

    const icon = useMemo(() => {
        switch (variant) {
            case "error":
                return alertCircleFill;
            case "warning":
                return alertTriangleFill;
            case "success":
                return checkmarkCircle;
            default:
                return infoFill;
        }
    }, [variant]);

    return (
        <StyledSnackbarContent ref={ref} variant={variant} style={style}>
            <StyledIcon icon={icon} color={variant} />
            <div className="message">{message}</div>
            {actionNode && <div className="action">{actionNode}</div>}
        </StyledSnackbarContent>
    );
});

const StyledIcon = ({icon, color}) => {
    return (
        <Box
            component="span"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 1.5,
                width: 40,
                flexShrink: 0,
                height: 40,
                bgcolor: (theme) => alpha(theme.palette[color].main, 0.16),
                color: `${color}.main`,
                mr: 1.5
            }}>
            <Icon icon={icon} width={24} height={24} />
        </Box>
    );
};

const StyledSnackbarContent = styled(SnackbarContent, {
    shouldForwardProp: (prop) => !["variant"].includes(prop)
})(({theme, variant}) => ({
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    alignItems: "center",
    width: "100%",
    color: theme.palette.text.primary,
    boxShadow: theme.customShadows.z8,
    margin: theme.spacing(0.25, 0),
    flexWrap: "nowrap",
    "& .message": {
        ...theme.typography.subtitle2,
        flexGrow: 1
    },
    "& .action": {
        marginLeft: theme.spacing(1)
    },
    [theme.breakpoints.up("md")]: {
        minWidth: 240
    }
}));

export default SnackbarComponent;
