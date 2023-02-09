import {useTheme} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material";

const useScreenType = () => {
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
    const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

    return {
        isMobile,
        isDesktop,
        isTablet
    };
};

export default useScreenType;
