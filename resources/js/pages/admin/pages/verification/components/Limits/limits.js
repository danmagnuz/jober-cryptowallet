import React from "react";
import {Grid} from "@mui/material";
import UpdateLimits from "./components/UpdateLimits";
import UpdateSettings from "./components/UpdateSettings";

const Limits = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <UpdateLimits />
            </Grid>

            <Grid item xs={12} md={4}>
                <UpdateSettings />
            </Grid>
        </Grid>
    );
};

export default Limits;
