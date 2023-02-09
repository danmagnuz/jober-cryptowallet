import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Chip,
    Stack,
    Typography
} from "@mui/material";
import Spin from "components/Spin";
import {defineMessages, FormattedMessage, useIntl} from "react-intl";
import {errorHandler, route, useRequest} from "services/Http";
import Result from "components/Result";
import {isEmpty} from "lodash";
import FeatureLimit from "models/FeatureLimit";
import {useVerification} from "hooks/user";
import {calculatePercent} from "utils/helpers";
import CircularProgress from "components/CircularProgress";

const messages = defineMessages({
    unverified: {defaultMessage: "Unverified"},
    basic: {defaultMessage: "Basic"},
    advanced: {defaultMessage: "Advanced"},
    empty: {defaultMessage: "No Record!"}
});

const Limits = () => {
    const [request, loading] = useRequest();
    const {level} = useVerification();
    const [features, setFeatures] = useState([]);
    const intl = useIntl();

    const fetchFeatures = useCallback(() => {
        request
            .get(route("feature-limit.all"))
            .then((features) => setFeatures(features))
            .catch(errorHandler());
    }, [request]);

    useEffect(() => {
        fetchFeatures();
    }, [fetchFeatures]);

    const tags = useMemo(() => {
        return {
            unverified: (
                <Chip
                    label={intl.formatMessage(messages.unverified)}
                    size="small"
                    variant="outlined"
                />
            ),
            basic: (
                <Chip
                    label={intl.formatMessage(messages.basic)}
                    size="small"
                    color="default"
                />
            ),
            advanced: (
                <Chip
                    label={intl.formatMessage(messages.advanced)}
                    size="small"
                    color="primary"
                />
            )
        };
    }, [intl]);

    return (
        <Card>
            <CardHeader
                title={<FormattedMessage defaultMessage="Limits" />}
                action={tags[level]}
            />

            <CardContent>
                <Spin spinning={loading}>
                    {!isEmpty(features) ? (
                        <Stack spacing={2}>
                            {features.map((data) => (
                                <FeatureItem key={data.name} data={data} />
                            ))}
                        </Stack>
                    ) : (
                        <Result iconSize={150} />
                    )}
                </Spin>
            </CardContent>
        </Card>
    );
};

const FeatureItem = ({data}) => {
    const feature = FeatureLimit.use(data);
    const percent = calculatePercent(feature.usage, feature.limit);

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <CircularProgress value={percent} thickness={10} />

            <Stack flexGrow={1} sx={{minWidth: 100}}>
                <Typography variant="body2" noWrap>
                    {feature.title}
                </Typography>

                <Typography variant="caption" color="text.secondary" noWrap>
                    <FormattedMessage
                        defaultMessage="{usage} / {limit} (per {period})"
                        values={{
                            usage: feature.format(feature.usage),
                            limit: feature.format(feature.limit),
                            period: feature.period
                        }}
                    />
                </Typography>
            </Stack>
        </Stack>
    );
};

export default Limits;
