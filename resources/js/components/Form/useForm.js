import React from "react";
import {useForm as useRcForm} from "rc-field-form";
import scrollIntoView from "scroll-into-view-if-needed";
import {castArray} from "lodash";
import {getFieldId} from "./helpers";

export default function useForm(form) {
    const [rcForm] = useRcForm();

    const wrapForm = React.useMemo(
        () =>
            form ?? {
                ...rcForm,
                scrollToField: (name) => {
                    const fieldId = getFieldId(
                        castArray(name),
                        wrapForm.__NAME__
                    );

                    const targetNode = document.getElementById(fieldId);

                    if (targetNode) {
                        scrollIntoView(targetNode, {
                            block: "nearest",
                            scrollMode: "if-needed"
                        });
                    }
                }
            },
        [form, rcForm]
    );

    return [wrapForm];
}
