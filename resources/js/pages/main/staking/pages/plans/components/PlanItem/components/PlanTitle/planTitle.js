import React from "react";
import {Stack, Typography} from "@mui/material";
import IconBuilder from "components/IconBuilder";

const PlanTitle = ({plan}) => {
    return (
        <Stack alignItems="center" spacing={1}>
            <IconBuilder
                icon={plan.wallet.coin.svgIcon()}
                sx={{fontSize: "40px"}}
            />

            <Typography
                variant="subtitle2"
                sx={{maxWidth: 200}}
                color="text.primary"
                noWrap={true}>
                {plan.title}
            </Typography>
        </Stack>
    );
};

export default PlanTitle;
