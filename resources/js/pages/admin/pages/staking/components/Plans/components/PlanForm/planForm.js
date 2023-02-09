import React, {Fragment, useState} from "react";
import Form, {TextField} from "components/Form";
import ModalContent from "components/ModalContent";
import WalletSelect from "components/WalletSelect";
import {Button, Divider, InputAdornment, Stack} from "@mui/material";
import {defineMessages, FormattedMessage, useIntl} from "react-intl";
import {isEmpty} from "lodash";
import AddIcon from "@mui/icons-material/Add";
import ModalActions from "components/ModalActions";
import {LoadingButton} from "@mui/lab";
import RemoveIcon from "@mui/icons-material/Remove";

const messages = defineMessages({
    title: {defaultMessage: "Title"},
    days: {defaultMessage: "Days"},
    rate: {defaultMessage: "Rate"},
    minValue: {defaultMessage: "Min Value"},
    maxValue: {defaultMessage: "Max Value"},
    wallet: {defaultMessage: "Wallet"}
});

const PlanForm = ({form, initialValues, formLoading, submitForm}) => {
    const intl = useIntl();
    const editMode = !isEmpty(initialValues);
    const [wallet, setWallet] = useState();

    return (
        <Form form={form} initialValues={initialValues} onFinish={submitForm}>
            <ModalContent spacing={2}>
                {!editMode && (
                    <Form.Item
                        name="wallet"
                        label={intl.formatMessage(messages.wallet)}
                        rules={[{required: true}]}>
                        <WalletSelect fullWidth onSelect={setWallet} />
                    </Form.Item>
                )}

                <Form.Item
                    name="title"
                    label={intl.formatMessage(messages.title)}
                    rules={[{required: true}]}>
                    <TextField fullWidth />
                </Form.Item>

                <Divider>
                    <FormattedMessage defaultMessage="Rates" />
                </Divider>

                <Form.List name="rates">
                    {(fields, action, meta) => (
                        <Fragment>
                            <Stack spacing={3}>
                                {fields.map((field, index) => (
                                    <RateFields
                                        key={field.key}
                                        remove={() => action.remove(index)}
                                        field={field}
                                        editMode={editMode}
                                        wallet={wallet}
                                    />
                                ))}
                            </Stack>

                            {!isEmpty(meta.errors) && (
                                <Form.Info errors={meta.errors} />
                            )}

                            {!editMode && (
                                <Button
                                    variant="contained"
                                    onClick={() => action.add()}
                                    disabled={fields.length >= 5}
                                    startIcon={<AddIcon />}
                                    size="small"
                                    color="inherit"
                                    fullWidth>
                                    <FormattedMessage defaultMessage="Add Rate" />
                                </Button>
                            )}
                        </Fragment>
                    )}
                </Form.List>
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

const RateFields = ({wallet, field, remove, editMode}) => {
    const intl = useIntl();

    return (
        <Stack spacing={2}>
            {editMode && (
                <Form.Item name={[field.name, "id"]} isListField>
                    <TextField sx={{display: "none"}} />
                </Form.Item>
            )}

            <Stack direction="row" spacing={1}>
                <Form.Item
                    name={[field.name, "days"]}
                    label={intl.formatMessage(messages.days)}
                    rules={[{required: true}]}
                    isListField>
                    <TextField
                        type="number"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <FormattedMessage defaultMessage="days" />
                                </InputAdornment>
                            )
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name={[field.name, "rate"]}
                    label={intl.formatMessage(messages.rate)}
                    rules={[{required: true}]}
                    isListField>
                    <TextField
                        type="number"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <FormattedMessage defaultMessage="%" />
                                </InputAdornment>
                            )
                        }}
                    />
                </Form.Item>
            </Stack>

            <Stack direction="row" spacing={1}>
                <Form.Item
                    name={[field.name, "min_value"]}
                    label={intl.formatMessage(messages.minValue)}
                    rules={[{required: true}]}
                    isListField>
                    <TextField
                        type="number"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {wallet?.coin.symbol}
                                </InputAdornment>
                            )
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name={[field.name, "max_value"]}
                    label={intl.formatMessage(messages.maxValue)}
                    rules={[{required: true}]}
                    isListField>
                    <TextField
                        type="number"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {wallet?.coin.symbol}
                                </InputAdornment>
                            )
                        }}
                    />
                </Form.Item>
            </Stack>

            {!editMode && (
                <Button
                    onClick={remove}
                    startIcon={<RemoveIcon />}
                    size="small"
                    color="primary"
                    fullWidth>
                    <FormattedMessage defaultMessage="Remove Rate" />
                </Button>
            )}
        </Stack>
    );
};

export default PlanForm;
