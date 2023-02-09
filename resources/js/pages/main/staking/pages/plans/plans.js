import React, {forwardRef} from "react";
import {Container, Skeleton} from "@mui/material";
import HeaderBreadcrumbs from "components/HeaderBreadcrumbs";
import Page from "components/Page";
import {defineMessages, FormattedMessage, useIntl} from "react-intl";
import {route} from "services/Http";
import Result from "components/Result";
import MasonryLoader from "components/MasonryLoader";
import PlanItem from "./components/PlanItem";

const messages = defineMessages({
    title: {defaultMessage: "Staking Plans"}
});

const Plans = () => {
    const intl = useIntl();

    return (
        <Page title={intl.formatMessage(messages.title)}>
            <Container>
                <HeaderBreadcrumbs />

                <MasonryLoader
                    url={route("stake-plan.paginate")}
                    columns={{xs: 1, sm: 2, md: 3}}
                    spacing={3}
                    renderItem={(item) => (
                        <PlanItem key={item.id} item={item} />
                    )}
                    renderEmpty={() => (
                        <Result
                            title={
                                <FormattedMessage defaultMessage="No staking plans yet." />
                            }
                            description={
                                <FormattedMessage defaultMessage="We are working on it, please check back later." />
                            }
                        />
                    )}
                    renderSkeleton={(ref) => <PlanLoader ref={ref} />}
                />
            </Container>
        </Page>
    );
};

const PlanLoader = forwardRef((props, ref) => {
    return [...Array(3)].map((_, index) => (
        <Skeleton
            key={index}
            {...(index === 0 && {ref})}
            variant="rectangular"
            sx={{borderRadius: 2}}
            height={350}
        />
    ));
});

export default Plans;
