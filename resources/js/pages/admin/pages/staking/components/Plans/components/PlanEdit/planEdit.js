import React, {Fragment, useCallback, useContext, useMemo} from "react";
import {IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {defineMessages, useIntl} from "react-intl";
import {useModal} from "utils/modal";
import Form from "components/Form";
import TableContext from "contexts/TableContext";
import {errorHandler, route, useFormRequest} from "services/Http";
import PlanForm from "../PlanForm";
import {notify} from "utils/index";

const messages = defineMessages({
    success: {defaultMessage: "Plan was updated."},
    editPlan: {defaultMessage: "Edit Plan"}
});

const PlanEdit = ({plan}) => {
    const intl = useIntl();
    const [modal, modalElements] = useModal();

    const editPlan = useCallback(() => {
        modal.confirm({
            title: intl.formatMessage(messages.editPlan),
            content: <EditForm plan={plan} />,
            dialog: {fullWidth: true}
        });
    }, [modal, intl, plan]);

    return (
        <Fragment>
            <IconButton onClick={editPlan}>
                <EditIcon />
            </IconButton>

            {modalElements}
        </Fragment>
    );
};

const EditForm = ({closeModal, plan}) => {
    const [form] = Form.useForm();
    const intl = useIntl();
    const [formRequest, formLoading] = useFormRequest(form);
    const {reload: reloadTable} = useContext(TableContext);

    const initialValues = useMemo(
        () => ({
            title: plan.title,
            rates: plan.rates.map((rate) => ({
                id: rate.id,
                min_value: rate.min_value,
                max_value: rate.max_value,
                days: rate.days,
                rate: rate.rate
            }))
        }),
        [plan]
    );

    const submitForm = useCallback(
        (values) => {
            const url = route("admin.stake-plan.update", {plan: plan.id});

            formRequest
                .put(url, values)
                .then(() => {
                    notify.success(intl.formatMessage(messages.success));
                    closeModal();
                    reloadTable();
                })
                .catch(errorHandler());
        },
        [formRequest, plan, intl, closeModal, reloadTable]
    );

    return (
        <PlanForm
            submitForm={submitForm}
            initialValues={initialValues}
            formLoading={formLoading}
            form={form}
        />
    );
};

export default PlanEdit;
