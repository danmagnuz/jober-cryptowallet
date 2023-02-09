import React from "react";
import PropTypes from "prop-types";
import UserAvatar from "components/UserAvatar";
import {FormattedMessage} from "react-intl";
import ProfileLink from "components/ProfileLink";
import {Box, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {useAuth} from "models/Auth";

const AccountCard = ({isCollapse, action}) => {
    const auth = useAuth();

    const username = (
        <ProfileLink user={auth.user}>
            <b>{auth.user.name}</b>
        </ProfileLink>
    );

    return (
        <AccountContainer isCollapse={isCollapse}>
            <UserAvatar user={auth.user} />

            <ContentWrapper isCollapse={isCollapse}>
                <Typography variant="subtitle2" noWrap>
                    <FormattedMessage
                        defaultMessage="Welcome, {name}"
                        values={{name: username}}
                    />
                </Typography>

                {action && <Box>{action}</Box>}
            </ContentWrapper>
        </AccountContainer>
    );
};

const ContentWrapper = styled(Box, {
    shouldForwardProp: (prop) => prop !== "isCollapse"
})(({theme, isCollapse}) => ({
    whiteSpace: "nowrap",
    transition: theme.transitions.create(["width"], {
        duration: theme.transitions.duration.shorter
    }),
    marginLeft: theme.spacing(2),
    overflow: "hidden",
    ...(isCollapse && {
        marginLeft: theme.spacing(0),
        width: theme.spacing(0)
    })
}));

const AccountContainer = styled("div", {
    shouldForwardProp: (prop) => prop !== "isCollapse"
})(({theme, isCollapse}) => ({
    display: "flex",
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: theme.palette.grey[500_12],
    alignItems: "center",
    transition: theme.transitions.create("background-color", {
        duration: theme.transitions.duration.shorter
    }),
    ...(isCollapse && {
        backgroundColor: "transparent"
    })
}));

AccountCard.propTypes = {
    isCollapse: PropTypes.bool
};

export default AccountCard;
