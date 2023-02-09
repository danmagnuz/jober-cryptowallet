import React, {useMemo} from "react";
import PageTabs from "components/PageTabs";
import {defineMessages, useIntl} from "react-intl";
import exchangeDollar from "@iconify-icons/ri/exchange-dollar-fill";
import Trade from "./components/Trade";
import percent from "@iconify-icons/ri/percent-fill";
import Fee from "./components/Fee";

const messages = defineMessages({
    trade: {defaultMessage: "Trades"},
    fee: {defaultMessage: "Fee"},
    title: {defaultMessage: "Exchange"}
});

const Exchange = () => {
    const intl = useIntl();

    const tabs = useMemo(() => {
        return [
            {
                value: "trade",
                label: intl.formatMessage(messages.trade),
                icon: exchangeDollar,
                component: <Trade />
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
            initial="trade"
            title={intl.formatMessage(messages.title)}
            tabs={tabs}
        />
    );
};

export default Exchange;
