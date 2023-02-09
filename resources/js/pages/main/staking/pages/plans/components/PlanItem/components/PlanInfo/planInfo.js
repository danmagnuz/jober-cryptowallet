import React from "react";
import {Divider, Stack, Typography} from "@mui/material";
import {FormattedMessage} from "react-intl";

const PlanInfo = ({rate, plan}) => {
    return (
        <Stack spacing={2}>
            <SummaryItem
                title={
                    <Typography variant="body2" color="text.secondary">
                        <FormattedMessage defaultMessage="Annual Rate" />
                    </Typography>
                }
                value={
                    <Typography variant="subtitle2">
                        {`${rate.annual_rate}%`}
                    </Typography>
                }
            />

            <SummaryItem
                title={
                    <Typography variant="body2" color="text.secondary">
                        <FormattedMessage defaultMessage="Min Value" />
                    </Typography>
                }
                value={
                    <Typography variant="subtitle2">
                        {`${rate.min_value} ${plan.wallet.coin.symbol}`}
                    </Typography>
                }
            />

            <SummaryItem
                title={
                    <Typography variant="body2" color="text.secondary">
                        <FormattedMessage defaultMessage="Max Value" />
                    </Typography>
                }
                value={
                    <Typography variant="subtitle2">
                        {`${rate.max_value} ${plan.wallet.coin.symbol}`}
                    </Typography>
                }
            />
        </Stack>
    );
};

const SummaryItem = ({title, value}) => {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            {title}
            <Divider sx={{flexGrow: 1}} light />
            {value}
        </Stack>
    );
};

export default PlanInfo;
