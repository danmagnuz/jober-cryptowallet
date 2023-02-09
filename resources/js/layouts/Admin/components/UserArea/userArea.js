import React from "react";
import {Icon} from "@iconify/react";
import globalFill from "@iconify-icons/ri/global-fill";
import {Link as RouterLink} from "react-router-dom";
import {IconButton} from "@mui/material";
import router from "router";

const UserArea = () => {
    return (
        <IconButton
            component={RouterLink}
            to={router.generatePath("main.home")}>
            <Icon icon={globalFill} />
        </IconButton>
    );
};

export default UserArea;
