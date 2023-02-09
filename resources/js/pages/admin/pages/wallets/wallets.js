import React, {useMemo} from "react";
import {defineMessages, useIntl} from "react-intl";
import fileList from "@iconify-icons/ri/file-list-2-fill";
import history from "@iconify-icons/ri/history-fill";
import percent from "@iconify-icons/ri/percent-fill";
import List from "./components/List";
import Transactions from "./components/Transactions";
import Fee from "./components/Fee";
import PageTabs from "components/PageTabs";

const messages = defineMessages({
    list: {defaultMessage: "List"},
    transactions: {defaultMessage: "Transactions"},
    fee: {defaultMessage: "Fee"},
    title: {defaultMessage: "Wallets"}
});

const Wallets = () => {
    const intl = useIntl();

    const tabs = useMemo(() => {
        return [
            {
                value: "list",
                label: intl.formatMessage(messages.list),
                icon: fileList,
                component: <List />
            },
            {
                value: "transactions",
                label: intl.formatMessage(messages.transactions),
                icon: history,
                component: <Transactions />
            },
            {
                value: "fee",
                label: intl.formatMessage(messages.fee),
                icon: percent,
                component: <Fee />
            }
        ];
    }, [intl]);

    return (
        <PageTabs
            initial="list"
            title={intl.formatMessage(messages.title)}
            tabs={tabs}
        />
    );
};

export default Wallets;
