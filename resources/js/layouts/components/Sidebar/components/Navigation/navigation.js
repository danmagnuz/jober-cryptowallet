import React from "react";
import PropTypes from "prop-types";
import {experimentalStyled as styled} from "@mui/material/styles";
import {isEmpty} from "lodash";
import {Box, List, ListSubheader} from "@mui/material";
import useNavbarDrawer from "hooks/useNavbarDrawer";
import NavRoot from "./components/NavRoot";

function Navigation({config, ...other}) {
    const {isCollapse} = useNavbarDrawer();

    return (
        <Box {...other}>
            {config.map((group) => {
                const groupItems = group.items.filter((e) => !isEmpty(e));
                if (isEmpty(groupItems)) return null;

                return (
                    <List key={group.key} disablePadding sx={{px: 2}}>
                        <StyledListSubheader
                            isCollapse={isCollapse}
                            disableSticky>
                            {group.title}
                        </StyledListSubheader>

                        {groupItems.map((item) => (
                            <NavRoot key={item.key} item={item} />
                        ))}
                    </List>
                );
            })}
        </Box>
    );
}

const StyledListSubheader = styled(({isCollapse, ...props}) => (
    <ListSubheader disableSticky disableGutters {...props} />
))(({theme, isCollapse}) => ({
    ...theme.typography.overline,
    color: theme.palette.text.primary,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    transition: theme.transitions.create("opacity", {
        duration: theme.transitions.duration.shorter
    }),
    ...(isCollapse && {opacity: 0})
}));

Navigation.propTypes = {
    config: PropTypes.array
};

export default Navigation;
