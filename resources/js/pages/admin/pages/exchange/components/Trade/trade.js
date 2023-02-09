import React, {useMemo} from "react";
import {defineMessages, useIntl} from "react-intl";
import {route} from "services/Http";
import {Card, Stack} from "@mui/material";
import TrapScrollBox from "components/TrapScrollBox";
import AsyncTable from "components/AsyncTable";
import Cancel from "./components/Cancel";
import Complete from "./components/Complete";
import DateTableCell from "components/TableCells/DateTableCell";
import PaymentTableCell from "components/TableCells/ExchangeTable/PaymentTableCell";
import WalletTableCell from "components/TableCells/ExchangeTable/WalletTableCell";
import StatusTableCell from "components/TableCells/ExchangeTable/StatusTableCell";
import UserTableCell from "components/TableCells/UserTableCell";
import ActionBar from "./components/ActionBar";

const messages = defineMessages({
    user: {defaultMessage: "User"},
    transactions: {defaultMessage: "Transactions"},
    created: {defaultMessage: "Created"},
    completed: {defaultMessage: "Completed"},
    status: {defaultMessage: "Status"},
    title: {defaultMessage: "Title"},
    date: {defaultMessage: "Date"},
    coin: {defaultMessage: "Coin"},
    payment: {defaultMessage: "Payment"},
    wallet: {defaultMessage: "Wallet"},
    trader: {defaultMessage: "Trader"},
    operator: {defaultMessage: "Operator"},
    action: {defaultMessage: "Action"}
});

const Trade = () => {
    const intl = useIntl();

    const columns = useMemo(
        () => [
            {
                field: "wallet_account",
                headerName: intl.formatMessage(messages.user),
                width: 200,
                renderCell: ({value}) => <UserTableCell user={value.user} />
            },
            {
                field: "status",
                width: 100,
                headerName: intl.formatMessage(messages.status),
                align: "center",
                renderCell: ({row: trade}) => <StatusTableCell trade={trade} />
            },
            {
                field: "payment_value",
                headerName: intl.formatMessage(messages.payment),
                minWidth: 120,
                flex: 0.5,
                renderCell: ({row: trade}) => <PaymentTableCell trade={trade} />
            },
            {
                field: "wallet_value",
                headerName: intl.formatMessage(messages.wallet),
                minWidth: 120,
                flex: 0.5,
                renderCell: ({row: trade}) => <WalletTableCell trade={trade} />
            },
            {
                field: "created_at",
                headerName: intl.formatMessage(messages.created),
                width: 150,
                renderCell: ({value}) => <DateTableCell value={value} />
            },
            {
                field: "trader",
                headerName: intl.formatMessage(messages.trader),
                width: 200,
                renderCell: ({value}) => <UserTableCell user={value} />
            },
            {
                field: "action",
                headerName: intl.formatMessage(messages.action),
                width: 100,
                renderCell: ({row: trade}) => {
                    return (
                        <Stack direction="row" spacing={1}>
                            <Cancel trade={trade} />
                            <Complete trade={trade} />
                        </Stack>
                    );
                }
            }
        ],
        [intl]
    );

    const url = route("admin.exchange-trade.paginate");

    return (
        <Card>
            <TrapScrollBox>
                <AsyncTable
                    columns={columns}
                    components={{Toolbar: ActionBar}}
                    url={url}
                />
            </TrapScrollBox>
        </Card>
    );
};

export default Trade;
