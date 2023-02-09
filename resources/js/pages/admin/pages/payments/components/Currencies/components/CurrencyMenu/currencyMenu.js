import React, {
    Fragment,
    useCallback,
    useContext,
    useEffect,
    useMemo
} from "react";
import {errorHandler, route, useFormRequest, useRequest} from "services/Http";
import {useModal} from "utils/modal";
import {defineMessages, FormattedMessage, useIntl} from "react-intl";
import {notify} from "utils/index";
import {
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Switch
} from "@mui/material";
import {isEmpty, toUpper} from "lodash";
import Dropdown from "components/Dropdown";
import LoadingIcon from "components/LoadingIcon";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Form, {ControlLabel, TextField} from "components/Form";
import {LoadingButton} from "@mui/lab";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TuneIcon from "@mui/icons-material/Tune";
import StarRateIcon from "@mui/icons-material/StarRate";
import {useExchangeBaseCurrency} from "hooks/settings";
import TableContext from "contexts/TableContext";
import ModalActions from "components/ModalActions";
import ModalContent from "components/ModalContent";

const messages = defineMessages({
    updateRate: {defaultMessage: "Update Rate"},
    defaultSuccess: {defaultMessage: "Currency was set as default."},
    minAmount: {defaultMessage: "Min Amount"},
    maxAmount: {defaultMessage: "Max Amount"},
    updateSuccess: {defaultMessage: "Currency was updated."},
    updateLimit: {defaultMessage: "Update Limit"},
    auto: {defaultMessage: "Auto"},
    manual: {defaultMessage: "Manual"},
    rate: {defaultMessage: "Rate"},
    currency: {defaultMessage: "Currency"}
});

const CurrencyMenu = ({currency}) => {
    const intl = useIntl();
    const {reload: reloadTable} = useContext(TableContext);
    const [request, loading] = useRequest();
    const [modal, modalElements] = useModal();

    const baseCurrency = useExchangeBaseCurrency();

    const makeDefault = useCallback(() => {
        const url = route("admin.supported-currency.make-default", {
            currency: currency.code
        });

        request
            .post(url)
            .then(() => {
                notify.success(intl.formatMessage(messages.defaultSuccess));
                reloadTable();
            })
            .catch(errorHandler());
    }, [request, currency, intl, reloadTable]);

    const updateLimit = useCallback(() => {
        modal.confirm({
            title: intl.formatMessage(messages.updateLimit),
            content: <UpdateLimitForm currency={currency} />,
            dialog: {fullWidth: true}
        });
    }, [modal, currency, intl]);

    const updateRate = useCallback(() => {
        modal.confirm({
            title: intl.formatMessage(messages.updateRate),
            content: <UpdateRateForm currency={currency} />,
            dialog: {fullWidth: true}
        });
    }, [modal, currency, intl]);

    const menuItems = useMemo(() => {
        const items = [];

        if (toUpper(baseCurrency) !== toUpper(currency.code)) {
            items.push(
                <MenuItem key={1} onClick={updateRate}>
                    <TrendingUpIcon sx={{mr: 2}} />
                    <FormattedMessage defaultMessage="Update Rate" />
                </MenuItem>
            );
        }

        items.push(
            <MenuItem key={2} onClick={updateLimit}>
                <TuneIcon sx={{mr: 2}} />
                <FormattedMessage defaultMessage="Update Limit" />
            </MenuItem>
        );

        if (!currency.default) {
            items.push(
                <MenuItem key={0} onClick={makeDefault}>
                    <StarRateIcon sx={{mr: 2}} />
                    <FormattedMessage defaultMessage="Make Default" />
                </MenuItem>
            );
        }

        return items;
    }, [makeDefault, currency, updateRate, updateLimit, baseCurrency]);

    if (isEmpty(menuItems)) {
        return null;
    }

    return (
        <Fragment>
            <Dropdown menuItems={menuItems} component={IconButton}>
                <LoadingIcon component={MoreVertIcon} loading={loading} />
            </Dropdown>

            {modalElements}
        </Fragment>
    );
};

const UpdateRateForm = ({closeModal, currency}) => {
    const [form] = Form.useForm();
    const intl = useIntl();
    const [formRequest, formLoading] = useFormRequest(form);
    const {reload: reloadTable} = useContext(TableContext);

    const submitForm = useCallback(
        (values) => {
            const url = route("admin.supported-currency.update-rate", {
                currency: currency.code
            });

            formRequest
                .post(url, values)
                .then(() => {
                    notify.success(intl.formatMessage(messages.updateSuccess));
                    closeModal();
                    reloadTable();
                })
                .catch(errorHandler());
        },
        [closeModal, formRequest, intl, reloadTable, currency]
    );

    useEffect(() => {
        if (!isEmpty(currency)) {
            form.resetFields();
        }
    }, [currency, form]);

    return (
        <Form form={form} onFinish={submitForm}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={6} sm={4}>
                    <Form.Item
                        name="manual"
                        label={intl.formatMessage(messages.manual)}
                        initialValue={currency.exchange_type === "manual"}
                        valuePropName="checked">
                        <ControlLabel>
                            <Switch />
                        </ControlLabel>
                    </Form.Item>
                </Grid>

                <Grid item xs={6} sm={8}>
                    <Form.Item
                        name="exchange_rate"
                        label={intl.formatMessage(messages.rate)}
                        getValueProps={(value) => {
                            const disabled = !form.getFieldValue("manual");
                            return {value, disabled};
                        }}
                        dependencies={["manual"]}
                        initialValue={currency.exchange_rate}
                        rules={[{required: true}]}>
                        <TextField type="number" fullWidth />
                    </Form.Item>
                </Grid>
            </Grid>

            <ModalActions>
                <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={formLoading}>
                    <FormattedMessage defaultMessage="Submit" />
                </LoadingButton>
            </ModalActions>
        </Form>
    );
};

const UpdateLimitForm = ({closeModal, currency}) => {
    const [form] = Form.useForm();
    const intl = useIntl();
    const [formRequest, formLoading] = useFormRequest(form);
    const {reload: reloadTable} = useContext(TableContext);

    const submitForm = useCallback(
        (values) => {
            const url = route("admin.supported-currency.update-limit", {
                currency: currency.code
            });

            formRequest
                .post(url, values)
                .then(() => {
                    notify.success(intl.formatMessage(messages.updateSuccess));
                    closeModal();
                    reloadTable();
                })
                .catch(errorHandler());
        },
        [closeModal, formRequest, intl, reloadTable, currency]
    );

    useEffect(() => {
        if (!isEmpty(currency)) {
            form.resetFields();
        }
    }, [currency, form]);

    return (
        <Form form={form} onFinish={submitForm}>
            <ModalContent spacing={2}>
                <Form.Item
                    name="min_amount"
                    label={intl.formatMessage(messages.minAmount)}
                    initialValue={currency.min_amount}
                    rules={[{required: true}]}>
                    <TextField
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {currency.code}
                                </InputAdornment>
                            )
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name="max_amount"
                    label={intl.formatMessage(messages.maxAmount)}
                    initialValue={currency.max_amount}
                    rules={[{required: true}]}>
                    <TextField
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {currency.code}
                                </InputAdornment>
                            )
                        }}
                    />
                </Form.Item>
            </ModalContent>

            <ModalActions>
                <LoadingButton
                    variant="contained"
                    loading={formLoading}
                    type="submit">
                    <FormattedMessage defaultMessage="Submit" />
                </LoadingButton>
            </ModalActions>
        </Form>
    );
};

export default CurrencyMenu;
