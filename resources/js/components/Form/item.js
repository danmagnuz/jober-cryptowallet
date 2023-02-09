import React, {
    cloneElement,
    isValidElement,
    memo,
    useContext,
    useRef
} from "react";
import {FormContext, FormInputContext} from "./contexts";
import {
    castArray,
    forOwn,
    isArray,
    isEmpty,
    isFunction,
    isUndefined
} from "lodash";
import {Field} from "rc-field-form";
import {getFieldId} from "./helpers";
import warning from "rc-util/lib/warning";

function Item(props) {
    const {
        name,
        dependencies,
        shouldUpdate,
        rules,
        children,
        label,
        valuePropName = "value",
        messageVariables = {},
        trigger = "onChange",
        validateTrigger
    } = props;

    const hasName = hasValidName(name);
    const {name: formName} = useContext(FormContext);
    const isRenderProps = isFunction(children);

    const inputRef = useRef(0);

    const renderLayout = (baseChildren, inputContext) => {
        if (!isEmpty(inputContext)) {
            return (
                <FormInputContext.Provider value={inputContext}>
                    {baseChildren}
                </FormInputContext.Provider>
            );
        } else {
            return baseChildren;
        }
    };

    if (!hasName && !isRenderProps && !dependencies) {
        return renderLayout(children);
    }

    inputRef.current += 1;

    const variables = {...messageVariables};

    if (typeof label === "string") {
        variables.label = label;
    } else if (name) {
        variables.label = String(name);
    }

    return (
        <Field
            {...props}
            messageVariables={variables}
            validateTrigger={validateTrigger}
            trigger={trigger}>
            {(control, meta, context) => {
                const {errors = []} = meta;
                const namePath = isUndefined(name) ? [] : castArray(meta.name);
                const fieldId = getFieldId(namePath, formName);

                const isRequired = rules?.some((rule) => {
                    if (rule.required) {
                        return true;
                    } else if (isFunction(rule)) {
                        const entity = rule(context);
                        return entity?.required;
                    } else {
                        return false;
                    }
                });

                let inputContext, childNode;

                if (isValidElement(children)) {
                    inputContext = {};
                    const childProps = {...children.props, ...control};

                    if (!childProps.id) {
                        childProps.id = fieldId;
                    }

                    forOwn(control, (event, eventName) => {
                        if (isFunction(event)) {
                            childProps[eventName] = (...args) => {
                                children.props[eventName]?.(...args);
                                control[eventName]?.(...args);
                            };
                        }
                    });

                    if (meta?.validating) {
                        inputContext.validateStatus = "validating";
                    } else if (meta?.errors?.length) {
                        inputContext.validateStatus = "error";
                    } else if (meta?.touched) {
                        inputContext.validateStatus = "success";
                    }

                    inputContext.label = label;
                    inputContext.isRequired = isRequired;
                    inputContext.errors = errors;

                    childNode = (
                        <MemoInput
                            disabled={childProps["disabled"]}
                            value={childProps[valuePropName || "value"]}
                            update={inputRef.current}>
                            {cloneElement(children, childProps)}
                        </MemoInput>
                    );
                } else if (isRenderProps) {
                    warning(
                        Boolean(shouldUpdate || dependencies),
                        "[Form.Item] render props only work with `shouldUpdate` or `dependencies`."
                    );

                    childNode = !hasName && children(context);
                } else {
                    warning(
                        !(dependencies && !hasName),
                        "[Form.Item] Must set `name` or use render props when `dependencies` is set."
                    );

                    warning(
                        !(isArray(children) && hasName),
                        "[Form.Item] `children` is array of render props cannot have `name`."
                    );

                    childNode = children;
                }

                return renderLayout(childNode, inputContext);
            }}
        </Field>
    );
}

const MemoInput = memo(
    (props) => props.children,
    (prev, next) => {
        return (
            prev.value === next.value &&
            prev.disabled === next.disabled &&
            prev.update === next.update
        );
    }
);

function hasValidName(name) {
    return !(name === undefined || name === null);
}

export default Item;
