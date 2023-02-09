import React, {useCallback, useEffect, useMemo, useState} from "react";
import {defineMessages, useIntl} from "react-intl";
import {errorHandler, route, useRequest} from "services/Http";
import Label from "components/Label";
import Spin from "components/Spin";
import CardTabs from "components/CardTabs";
import {Card} from "@mui/material";
import Table from "./components/Table";

const messages = defineMessages({
    all: {defaultMessage: "All"},
    holding: {defaultMessage: "Holding"},
    redeemed: {defaultMessage: "Redeemed"},
    pending: {defaultMessage: "Pending"}
});

const Subscription = () => {
    const intl = useIntl();
    const [request, loading] = useRequest();

    const [statistics, setStatistics] = useState({
        all: 0,
        holding: 0,
        redeemed: 0,
        pending: 0
    });

    const fetchStatistics = useCallback(() => {
        request
            .get(route("admin.stake.get-statistics"))
            .then((data) => setStatistics(data))
            .catch(errorHandler());
    }, [request]);

    useEffect(() => {
        fetchStatistics();
    }, [fetchStatistics]);

    const tabs = useMemo(
        () => [
            {
                label: intl.formatMessage(messages.all),
                icon: <Label color="default">{statistics.all}</Label>,
                component: <Table />
            },
            {
                label: intl.formatMessage(messages.holding),
                icon: <Label color="warning">{statistics.holding}</Label>,
                component: <Table status="holding" />
            },
            {
                label: intl.formatMessage(messages.redeemed),
                icon: <Label color="success">{statistics.redeemed}</Label>,
                component: <Table status="redeemed" />
            },
            {
                label: intl.formatMessage(messages.pending),
                icon: <Label color="info">{statistics.pending}</Label>,
                component: <Table status="pending" />
            }
        ],
        [intl, statistics]
    );

    return (
        <Card>
            <Spin spinning={loading}>
                <CardTabs
                    variant="scrollable"
                    allowScrollButtonsMobile
                    scrollButtons="auto"
                    tabs={tabs}
                />
            </Spin>
        </Card>
    );
};

export default Subscription;
