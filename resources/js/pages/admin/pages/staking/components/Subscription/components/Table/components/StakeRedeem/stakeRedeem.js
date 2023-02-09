import React, {useCallback, useContext} from "react";
import {IconButton} from "@mui/material";
import LoadingIcon from "components/LoadingIcon";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PopConfirm from "components/PopConfirm";
import {defineMessages, useIntl} from "react-intl";
import TableContext from "contexts/TableContext";
import {errorHandler, route, useRequest} from "services/Http";
import {notify} from "utils/index";

const messages = defineMessages({
    success: {defaultMessage: "Redemption was successful."},
    confirm: {defaultMessage: "Are you sure?"}
});

const StakeRedeem = ({stake}) => {
    const intl = useIntl();
    const {reload: reloadTable} = useContext(TableContext);
    const [request, loading] = useRequest();

    const redeemStake = useCallback(() => {
        const url = route("admin.stake.redeem", {stake: stake.id});

        request
            .patch(url)
            .then(() => {
                notify.success(intl.formatMessage(messages.success));
                reloadTable();
            })
            .catch(errorHandler());
    }, [request, stake, intl, reloadTable]);

    if (stake.status !== "pending") return null;

    return (
        <PopConfirm
            component={IconButton}
            content={intl.formatMessage(messages.confirm)}
            onClick={redeemStake}>
            <LoadingIcon
                component={CheckCircleIcon}
                color="success"
                loading={loading}
            />
        </PopConfirm>
    );
};

export default StakeRedeem;
