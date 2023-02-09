import {HEADER_CONFIG, NAVBAR_CONFIG} from "layouts/config";
import {alpha, experimentalStyled as styled} from "@mui/material/styles";
import {Box} from "@mui/material";

export const Dashboard = styled(Box)(({theme}) => ({
    [theme.breakpoints.up("lg")]: {
        display: "flex",
        minHeight: "100%"
    }
}));

export const DashboardContent = styled("main", {
    shouldForwardProp: (prop) => prop !== "collapseClick"
})(({collapseClick, theme}) => ({
    overflow: "auto",
    paddingTop: HEADER_CONFIG.MOBILE_HEIGHT + 24,
    paddingBottom: HEADER_CONFIG.MOBILE_HEIGHT + 24,
    flexGrow: 1,
    minHeight: "100%",
    [theme.breakpoints.up("lg")]: {
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingTop: HEADER_CONFIG.DASHBOARD_DESKTOP_HEIGHT + 24,
        paddingBottom: HEADER_CONFIG.DASHBOARD_DESKTOP_HEIGHT + 24,
        width: `calc(100% - ${NAVBAR_CONFIG.DASHBOARD_WIDTH}px)`,
        ...(collapseClick && {
            marginLeft: NAVBAR_CONFIG.DASHBOARD_COLLAPSE_WIDTH
        })
    }
}));

export const DocStyle = styled(Box)(({theme}) => ({
    padding: theme.spacing(2.5),
    borderRadius: theme.shape.borderRadius,
    backgroundColor:
        theme.palette.mode === "light"
            ? alpha(theme.palette.primary.main, 0.08)
            : theme.palette.primary.lighter
}));
