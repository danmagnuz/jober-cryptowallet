import React, {useMemo} from "react";
import {defineMessages, FormattedMessage, useIntl} from "react-intl";
import CoinTableCell from "components/TableCells/CoinTableCell";
import {route} from "services/Http";
import {Card, Chip, Stack} from "@mui/material";
import TrapScrollBox from "components/TrapScrollBox";
import AsyncTable from "components/AsyncTable";
import ActionBar from "./components/ActionBar";
import Label from "components/Label";
import PlanDelete from "./components/PlanDelete";
import PlanEdit from "./components/PlanEdit";

const messages = defineMessages({
    coin: {defaultMessage: "Coin"},
    stakes: {defaultMessage: "Stakes"},
    status: {defaultMessage: "Status"},
    title: {defaultMessage: "Title"},
    rates: {defaultMessage: "Rates (APR)"},
    action: {defaultMessage: "Action"}
});

const Plans = () => {
    const intl = useIntl();

    const columns = useMemo(
        () => [
            {
                field: "wallet",
                width: 70,
                headerName: intl.formatMessage(messages.coin),
                align: "center",
                renderCell: ({value}) => <CoinTableCell value={value.coin} />
            },
            {
                field: "title",
                minWidth: 100,
                flex: 0.5,
                headerName: intl.formatMessage(messages.title)
            },
            {
                field: "rates",
                minWidth: 150,
                flex: 1,
                headerName: intl.formatMessage(messages.rates),
                renderCell: ({value: rates}) => (
                    <Stack direction="row" spacing={1}>
                        {rates.map((rate) => (
                            <Chip
                                key={rate.id}
                                label={`${rate.annual_rate}%`}
                                size="small"
                            />
                        ))}
                    </Stack>
                )
            },
            {
                field: "stakes_count",
                width: 70,
                headerName: intl.formatMessage(messages.stakes),
                headerAlign: "center",
                align: "center"
            },
            {
                field: "status",
                minWidth: 100,
                flex: 0.5,
                headerName: intl.formatMessage(messages.status),
                headerAlign: "center",
                align: "center",
                renderCell: ({value}) => {
                    return value ? (
                        <Label variant="ghost" color="success">
                            <FormattedMessage defaultMessage="Active" />
                        </Label>
                    ) : (
                        <Label variant="ghost" color="error">
                            <FormattedMessage defaultMessage="Paused" />
                        </Label>
                    );
                }
            },
            {
                field: "action",
                minWidth: 100,
                flex: 0.5,
                headerName: intl.formatMessage(messages.action),
                headerAlign: "right",
                align: "right",
                renderCell: ({row: plan}) => (
                    <Stack direction="row" spacing={1}>
                        <PlanEdit plan={plan} />
                        <PlanDelete plan={plan} />
                    </Stack>
                )
            }
        ],
        [intl]
    );

    const url = route("admin.stake-plan.paginate");

    return (
        <Card>
            <TrapScrollBox>
                <AsyncTable
                    components={{Toolbar: ActionBar}}
                    url={url}
                    columns={columns}
                />
            </TrapScrollBox>
        </Card>
    );
};

export default Plans;
