import React, {useMemo} from "react";
import PageTabs from "components/PageTabs";
import {defineMessages, useIntl} from "react-intl";
import survey from "@iconify-icons/ri/survey-fill";
import rocket from "@iconify-icons/ri/rocket-fill";
import Plans from "./components/Plans";
import Subscription from "./components/Subscription";

const messages = defineMessages({
    title: {defaultMessage: "Staking"},
    plans: {defaultMessage: "Plans"},
    subscription: {defaultMessage: "Subscription"}
});

const Staking = () => {
    const intl = useIntl();

    const tabs = useMemo(() => {
        return [
            {
                value: "plans",
                label: intl.formatMessage(messages.plans),
                icon: survey,
                component: <Plans />
            },
            {
                value: "subscription",
                label: intl.formatMessage(messages.subscription),
                icon: rocket,
                component: <Subscription />
            }
        ];
    }, [intl]);

    return (
        <PageTabs
            title={intl.formatMessage(messages.title)}
            tabs={tabs}
            initial="plans"
        />
    );
};

export default Staking;
