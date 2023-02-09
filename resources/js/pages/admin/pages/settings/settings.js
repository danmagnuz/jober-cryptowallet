import React, {useMemo} from "react";
import PageTabs from "components/PageTabs";
import {defineMessages, useIntl} from "react-intl";
import settings from "@iconify-icons/ri/settings-3-fill";
import bug from "@iconify-icons/ri/bug-fill";
import SystemLogs from "./components/SystemLogs";
import General from "./components/General";

const messages = defineMessages({
    title: {defaultMessage: "Settings"},
    documents: {defaultMessage: "Documents"},
    limits: {defaultMessage: "Limits"},
    systemLogs: {defaultMessage: "System Logs"},
    general: {defaultMessage: "General"}
});

const Settings = () => {
    const intl = useIntl();

    const tabs = useMemo(() => {
        return [
            {
                value: "general",
                label: intl.formatMessage(messages.general),
                icon: settings,
                component: <General />
            },
            {
                value: "system-logs",
                label: intl.formatMessage(messages.systemLogs),
                icon: bug,
                component: <SystemLogs />
            }
        ];
    }, [intl]);

    return (
        <PageTabs
            title={intl.formatMessage(messages.title)}
            tabs={tabs}
            initial="general"
        />
    );
};

export default Settings;
