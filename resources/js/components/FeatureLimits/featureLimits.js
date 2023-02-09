import React, {useCallback, useEffect, useMemo, useState} from "react";
import {CardContent, CardHeader, Chip, Stack, Typography} from "@mui/material";
import {errorHandler, route, useRequest} from "services/Http";
import {defineMessages, FormattedMessage, useIntl} from "react-intl";
import FeatureLimit from "models/FeatureLimit";
import ResponsiveCard from "../ResponsiveWidgets/responsiveCard";
import Spin from "../Spin";
import {isEmpty} from "lodash";
import Scrollbar from "../Scrollbar";
import {calculatePercent} from "utils/helpers";
import {useVerification} from "hooks/user";
import Result from "components/Result";
import CircularProgress from "components/CircularProgress";

const messages = defineMessages({
    unverified: {defaultMessage: "Unverified"},
    basic: {defaultMessage: "Basic"},
    advanced: {defaultMessage: "Advanced"},
    empty: {defaultMessage: "No Record!"}
});

const FeatureLimits = () => {
    const intl = useIntl();
    const [request, loading] = useRequest();
    const [features, setFeatures] = useState([]);
    const {level} = useVerification();

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
        <ResponsiveCard
            sx={{
                display: "flex",
                flexDirection: "column",
                maxHeight: "100%"
            }}>
            <CardHeader
                title={<FormattedMessage defaultMessage="Account Limits" />}
                action={tags[level]}
            />

            <Scrollbar>
                <CardContent>
                    <Spin spinning={loading}>
                        {!isEmpty(features) ? (
                            <Stack spacing={3}>
                                {features.map((data) => (
                                    <FeatureItem key={data.name} data={data} />
                                ))}
                            </Stack>
                        ) : (
                            <Result iconSize={150} />
                        )}
                    </Spin>
                </CardContent>
            </Scrollbar>
        </ResponsiveCard>
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

FeatureLimits.dimensions = {
    lg: {w: 3, h: 3, isResizable: false},
    md: {w: 4, h: 3, isResizable: false},
    sm: {w: 2, h: 3, isResizable: false},
    xs: {w: 1, h: 3, isResizable: false}
};

export default FeatureLimits;
