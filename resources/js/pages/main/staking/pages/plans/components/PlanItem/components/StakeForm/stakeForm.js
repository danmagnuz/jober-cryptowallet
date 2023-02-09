import React, {useCallback, useMemo} from "react";
import Form, {TextField} from "components/Form";
import {defineMessages, FormattedMessage, useIntl} from "react-intl";
import {errorHandler, route, useFormRequest} from "services/Http";
import {useWalletAccounts} from "hooks/account";
import {defaultTo, find, round} from "lodash";
import ModalContent from "components/ModalContent";
import {Divider, InputAdornment, Stack, Typography} from "@mui/material";
import ModalActions from "components/ModalActions";
import {LoadingButton} from "@mui/lab";
import dayjs from "utils/dayjs";
import {notify} from "utils/index";
import router from "router/router";
import {useNavigate} from "react-router-dom";

const messages = defineMessages({
    amount: {defaultMessage: "Locked Amount"},
    success: {defaultMessage: "Your stake was successful."}
});

const StakeForm = ({plan, rate, closeModal}) => {
    const [form] = Form.useForm();
    const intl = useIntl();
    const {data: accounts} = useWalletAccounts();
    const [formRequest, formLoading] = useFormRequest(form);
    const navigate = useNavigate();
    const symbol = plan.wallet.coin.symbol;

    const account = useMemo(() => {
        return find(accounts, (o) => o.wallet.id === plan.wallet.id);
    }, [accounts, plan]);

    const available = defaultTo(account?.available, 0);

    const redemption = useMemo(() => {
        return dayjs().add(rate.days, "day");
    }, [rate]);

    const calcInterest = useCallback(() => {
        const interest = (form.getFieldValue("amount") * rate.rate) / 100;
        return round(interest, plan.wallet.coin.precision);
    }, [form, plan, rate]);

    const canSubmit = useCallback(() => {
        const amount = form.getFieldValue("amount");
        return amount > 0 && available >= amount;
    }, [available, form]);

    const submitForm = useCallback(
        (values) => {
            const url = route("stake-plan.stake", {plan: plan.id});

            values.rate = rate.id;

            formRequest
                .post(url, values)
                .then(() => {
                    notify.success(intl.formatMessage(messages.success));
                    navigate(router.generatePath("main.staking.manage"));
                })
                .catch(errorHandler());
        },
        [plan, rate, formRequest, intl, navigate]
    );

    return (
        <Form form={form} onFinish={submitForm}>
            <ModalContent spacing={2}>
                <Form.Item
                    name="amount"
                    label={intl.formatMessage(messages.amount)}
                    normalize={(v) => v && parseFloat(v)}
                    rules={[
                        {
                            required: true,
                            type: "number",
                            min: rate.min_value,
                            max: rate.max_value
                        }
                    ]}>
                    <TextField
                        type="number"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        helperText={
                            <FormattedMessage
                                defaultMessage="Available: {amount}"
                                values={{amount: available}}
                            />
                        }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {symbol}
                                </InputAdornment>
                            )
                        }}
                    />
                </Form.Item>

                <Stack spacing={2}>
                    <SummaryItem
                        title={
                            <Typography variant="body2" color="text.secondary">
                                <FormattedMessage defaultMessage="Annual Rate" />
                            </Typography>
                        }
                        value={
                            <Typography variant="subtitle2">
                                {`${rate.annual_rate}%`}
                            </Typography>
                        }
                    />

                    <SummaryItem
                        title={
                            <Typography variant="body2" color="text.secondary">
                                <FormattedMessage defaultMessage="Redemption" />
                            </Typography>
                        }
                        value={
                            <Typography variant="subtitle2">
                                {redemption.format("L")}
                            </Typography>
                        }
                    />

                    <SummaryItem
                        title={
                            <Typography variant="body2" color="text.secondary">
                                <FormattedMessage defaultMessage="Stake Period" />
                            </Typography>
                        }
                        value={
                            <Typography variant="subtitle2">
                                {`${rate.days} days`}
                            </Typography>
                        }
                    />

                    <Form.Item dependencies={["amount"]}>
                        {() => (
                            <SummaryItem
                                title={
                                    <Typography
                                        color="text.secondary"
                                        variant="body2">
                                        <FormattedMessage defaultMessage="Est. Interest" />
                                    </Typography>
                                }
                                value={
                                    <Typography variant="subtitle2">
                                        {`${calcInterest() || 0} ${symbol}`}
                                    </Typography>
                                }
                            />
                        )}
                    </Form.Item>
                </Stack>
            </ModalContent>

            <ModalActions>
                <Form.Item dependencies={["amount"]}>
                    {() => (
                        <LoadingButton
                            variant="contained"
                            disabled={!canSubmit()}
                            loading={formLoading}
                            type="submit">
                            <FormattedMessage defaultMessage="Stake Now" />
                        </LoadingButton>
                    )}
                </Form.Item>
            </ModalActions>
        </Form>
    );
};

const SummaryItem = ({title, value}) => {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            {title}
            <Divider sx={{flexGrow: 1}} light />
            {value}
        </Stack>
    );
};

export default StakeForm;
