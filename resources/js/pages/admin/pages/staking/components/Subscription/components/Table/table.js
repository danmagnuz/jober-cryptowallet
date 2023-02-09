import React, {useMemo} from "react";
import {defineMessages, FormattedMessage, useIntl} from "react-intl";
import CoinTableCell from "components/TableCells/CoinTableCell";
import {parseDate} from "utils/form";
import StatusTableCell from "components/TableCells/StakeTable/StatusTableCell";
import UserTableCell from "components/TableCells/UserTableCell";
import {route} from "services/Http";
import AsyncTable from "components/AsyncTable";
import TrapScrollBox from "components/TrapScrollBox";
import StakeRedeem from "./components/StakeRedeem";
import {Stack} from "@mui/material";

const messages = defineMessages({
    coin: {defaultMessage: "Coin"},
    user: {defaultMessage: "User"},
    action: {defaultMessage: "Action"},
    amount: {defaultMessage: "Amount"},
    yield: {defaultMessage: "Yield"},
    status: {defaultMessage: "Status"},
    redemption: {defaultMessage: "Redemption"},
    subscription: {defaultMessage: "Subscription"},
    period: {defaultMessage: "Period"},
    rate: {defaultMessage: "Est. APR"}
});

const Table = ({status}) => {
    const intl = useIntl();

    const columns = useMemo(
        () => [
            {
                field: "coin",
                width: 70,
                align: "center",
                headerName: intl.formatMessage(messages.coin),
                renderCell: ({value}) => <CoinTableCell value={value} />
            },
            {
                field: "wallet_account",
                width: 200,
                headerName: intl.formatMessage(messages.user),
                renderCell: ({value}) => <UserTableCell user={value.user} />
            },
            {
                field: "value",
                minWidth: 150,
                flex: 1,
                headerName: intl.formatMessage(messages.amount),
                renderCell: ({value, row}) => {
                    return `${value} ${row.coin.symbol}`;
                }
            },
            {
                field: "yield",
                minWidth: 150,
                flex: 1,
                headerName: intl.formatMessage(messages.yield),
                renderCell: ({value, row}) => {
                    return `${value} ${row.coin.symbol}`;
                }
            },
            {
                field: "days",
                minWidth: 100,
                flex: 1,
                headerName: intl.formatMessage(messages.period),
                renderCell: ({value}) => {
                    return (
                        <FormattedMessage
                            defaultMessage="{days} days"
                            values={{days: value}}
                        />
                    );
                }
            },
            {
                field: "annual_rate",
                minWidth: 100,
                flex: 1,
                headerName: intl.formatMessage(messages.rate),
                renderCell: ({value}) => {
                    return `${value}%`;
                }
            },
            {
                field: "created_at",
                minWidth: 150,
                flex: 1,
                headerName: intl.formatMessage(messages.subscription),
                renderCell: ({value}) => {
                    return parseDate(value).format("ll");
                }
            },
            {
                field: "redemption_date",
                minWidth: 150,
                flex: 1,
                headerName: intl.formatMessage(messages.redemption),
                renderCell: ({value}) => {
                    return parseDate(value).format("ll");
                }
            },
            {
                field: "status",
                minWidth: 100,
                flex: 0.5,
                align: "center",
                headerName: intl.formatMessage(messages.status),
                renderCell: ({value}) => <StatusTableCell status={value} />
            },
            {
                field: "action",
                minWidth: 100,
                flex: 0.5,
                headerAlign: "right",
                align: "right",
                headerName: intl.formatMessage(messages.action),
                renderCell: ({row: stake}) => {
                    return (
                        <Stack direction="row" spacing={1}>
                            <StakeRedeem stake={stake} />
                        </Stack>
                    );
                }
            }
        ],
        [intl]
    );

    const url = route("admin.stake.paginate", {status});

    return (
        <TrapScrollBox>
            <AsyncTable columns={columns} url={url} />
        </TrapScrollBox>
    );
};

export default Table;
