import React from "react";
import Label from "components/Label";
import {FormattedMessage} from "react-intl";

const StatusTableCell = ({status}) => {
    switch (status) {
        case "holding":
            return (
                <Label variant="ghost" color="warning">
                    <FormattedMessage defaultMessage="Holding" />
                </Label>
            );
        case "redeemed":
            return (
                <Label variant="ghost" color="success">
                    <FormattedMessage defaultMessage="Redeemed" />
                </Label>
            );
        case "pending":
            return (
                <Label variant="ghost" color="info">
                    <FormattedMessage defaultMessage="Pending" />
                </Label>
            );
        default:
            return null;
    }
};

export default StatusTableCell;
