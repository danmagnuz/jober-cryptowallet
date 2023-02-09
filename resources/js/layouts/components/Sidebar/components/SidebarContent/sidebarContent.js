import React from "react";
import {Stack} from "@mui/material";
import Logo from "components/Logo";
import {styled} from "@mui/material/styles";
import Scrollbar from "components/Scrollbar";
import useScreenType from "hooks/useScreenType";
import useNavbarDrawer from "hooks/useNavbarDrawer";
import CollapseButton from "../CollapseButton";
import AccountCard from "../AccountCard";
import router from "router/router";
import Navigation from "../Navigation";

const SidebarContent = ({links, action, extras}) => {
    const {isCollapse, onToggleCollapse, collapseClick} = useNavbarDrawer();
    const {isDesktop} = useScreenType();

    return (
        <StyledScrollbar>
            <ContentContainer isCollapse={isCollapse} spacing={3}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center">
                    <Logo to={router.generatePath("main.home")} />

                    {isDesktop && !isCollapse && (
                        <CollapseButton
                            onToggleCollapse={onToggleCollapse}
                            collapseClick={collapseClick}
                        />
                    )}
                </Stack>

                <AccountCard isCollapse={isCollapse} action={action} />
            </ContentContainer>

            <Navigation config={links} sx={{flexGrow: 1}} />

            {/* {extras}*/}
        </StyledScrollbar>
    );
};

const StyledScrollbar = styled(Scrollbar)({
    height: "100%",
    "& .simplebar-content": {
        display: "flex",
        flexDirection: "column",
        height: "100%"
    }
});

const ContentContainer = styled(Stack, {
    shouldForwardProp: (prop) => prop !== "isCollapse"
})(({theme, isCollapse}) => ({
    flexShrink: 0,
    padding: theme.spacing(3, 2.5, 2),
    ...(isCollapse && {
        alignItems: "center"
    })
}));

export default SidebarContent;
