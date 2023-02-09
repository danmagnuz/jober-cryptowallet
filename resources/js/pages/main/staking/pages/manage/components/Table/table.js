import React, {useMemo} from "react";
import {defineMessages, FormattedMessage, useIntl} from "react-intl";
import TrapScrollBox from "components/TrapScrollBox";
import AsyncTable from "components/AsyncTable";
import {route} from "services/Http";
import StatusTableCell from "components/TableCells/StakeTable/StatusTableCell";
import CoinTableCell from "components/TableCells/CoinTableCell";
import {parseDate} from "utils/form";

const messages = defineMessages({
    coin: {defaultMessage: "Coin"},
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
            }
        ],
        [intl]
    );

    const url = route("stake.paginate", {status});

    return (
        <TrapScrollBox>
            <AsyncTable columns={columns} url={url} />
        </TrapScrollBox>
    );
};

export default Table;
