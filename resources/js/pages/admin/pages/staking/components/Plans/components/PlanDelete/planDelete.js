import React, {useCallback, useContext} from "react";
import PopConfirm from "components/PopConfirm";
import {IconButton} from "@mui/material";
import LoadingIcon from "components/LoadingIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import {defineMessages, useIntl} from "react-intl";
import {errorHandler, route, useRequest} from "services/Http";
import {notify} from "utils/index";
import TableContext from "contexts/TableContext";

const messages = defineMessages({
    success: {defaultMessage: "Plan was removed."},
    confirm: {defaultMessage: "Are you sure?"}
});

const PlanDelete = ({plan}) => {
    const intl = useIntl();
    const {reload: reloadTable} = useContext(TableContext);
    const [request, loading] = useRequest();

    const deletePlan = useCallback(() => {
        const url = route("admin.stake-plan.delete", {plan: plan.id});

        request
            .delete(url)
            .then(() => {
                notify.success(intl.formatMessage(messages.success));
                reloadTable();
            })
            .catch(errorHandler());
    }, [request, intl, plan, reloadTable]);

    return (
        <PopConfirm
            component={IconButton}
            content={intl.formatMessage(messages.confirm)}
            onClick={deletePlan}>
            <LoadingIcon
                color="error"
                component={DeleteIcon}
                loading={loading}
            />
        </PopConfirm>
    );
};

export default PlanDelete;
