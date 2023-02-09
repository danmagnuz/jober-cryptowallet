import React, {useCallback, useContext} from "react";
import {defineMessages, FormattedMessage, useIntl} from "react-intl";
import {StyledToolbar} from "styles/toolbar.style";
import SearchTable from "components/SearchTable";
import {useModal} from "utils/modal";
import AddIcon from "@mui/icons-material/Add";
import {Button} from "@mui/material";
import Form from "components/Form";
import {errorHandler, route, useFormRequest} from "services/Http";
import PlanForm from "../PlanForm";
import {notify} from "utils/index";
import TableContext from "contexts/TableContext";

const messages = defineMessages({
    search: {defaultMessage: "Search plan..."},
    createPlan: {defaultMessage: "Create Plan"},
    success: {defaultMessage: "Plan was created."}
});

const ActionBar = () => {
    const intl = useIntl();
    const [modal, modalElements] = useModal();

    const createPlan = useCallback(() => {
        modal.confirm({
            title: intl.formatMessage(messages.createPlan),
            content: <CreateForm />,
            dialog: {fullWidth: true}
        });
    }, [intl, modal]);

    return (
        <StyledToolbar>
            <SearchTable
                placeholder={intl.formatMessage(messages.search)}
                sx={{mr: 2}}
                field="title"
            />

            {modalElements}

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={createPlan}>
                <FormattedMessage defaultMessage="Create" />
            </Button>
        </StyledToolbar>
    );
};

const CreateForm = ({closeModal}) => {
    const [form] = Form.useForm();
    const intl = useIntl();
    const [formRequest, formLoading] = useFormRequest(form);
    const {reload: reloadTable} = useContext(TableContext);

    const submitForm = useCallback(
        (values) => {
            formRequest
                .post(route("admin.stake-plan.create"), values)
                .then(() => {
                    notify.success(intl.formatMessage(messages.success));
                    closeModal();
                    reloadTable();
                })
                .catch(errorHandler());
        },
        [formRequest, intl, reloadTable, closeModal]
    );

    return (
        <PlanForm
            submitForm={submitForm}
            formLoading={formLoading}
            form={form}
        />
    );
};

export default ActionBar;
