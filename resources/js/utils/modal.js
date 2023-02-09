import React, {
    cloneElement,
    isValidElement,
    useEffect,
    useMemo,
    useState
} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material";
import {usePatchElement} from "hooks/usePatchElement";
import {LoadingButton} from "@mui/lab";
import {isFunction} from "lodash";
import {mountHandler} from "./helpers";

export let enqueue;
let modalKey = 0;

const Modal = ({
    title,
    content,
    dialog,
    cancelProps,
    submitProps,
    onCancel,
    onSubmit,
    cancelText,
    submitText,
    afterClose = () => {}
}) => {
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const closeModal = () => setOpen(false);

    useEffect(() => {
        const handler = mountHandler();
        if (!open) setTimeout(() => handler.execute(afterClose), 1000);
        return () => handler.unmount();
    }, [open, afterClose]);

    const handleCancel = () => {
        if (!onCancel?.length) {
            return !onCancel?.() && closeModal?.();
        } else {
            onCancel?.(closeModal);
        }
    };

    const handleSubmit = () => {
        if (!onSubmit?.length) {
            return !onSubmit?.() && closeModal?.();
        } else {
            onSubmit?.(closeModal, setLoading);
        }
    };

    const showAction = useMemo(() => {
        return isFunction(onSubmit) && isFunction(onCancel);
    }, [onSubmit, onCancel]);

    const dialogContent = isValidElement(content)
        ? cloneElement(content, {closeModal})
        : content;

    return (
        <Dialog {...dialog} onClose={closeModal} open={open}>
            {title && <DialogTitle>{title}</DialogTitle>}

            <DialogContent sx={{overflowX: "hidden"}}>
                {dialogContent}
            </DialogContent>

            {showAction && (
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={handleCancel}
                        {...cancelProps}>
                        {cancelText}
                    </Button>

                    <LoadingButton
                        variant="contained"
                        color="inherit"
                        loading={loading}
                        onClick={handleSubmit}
                        {...submitProps}>
                        {submitText}
                    </LoadingButton>
                </DialogActions>
            )}
        </Dialog>
    );
};

const ModalProvider = () => {
    const [elements, patch] = usePatchElement();

    useEffect(() => {
        enqueue = patch;
    }, [patch]);

    return elements;
};

function useModal() {
    const [elements, patch] = usePatchElement();

    const api = useMemo(
        () => ({
            confirm(modalProps) {
                let removeModal = () => {};
                modalKey = modalKey + 1;

                const content = (
                    <Modal
                        {...modalProps}
                        key={`modal-${modalKey}`}
                        afterClose={() => {
                            removeModal?.();
                        }}
                    />
                );

                removeModal = patch(content);
            }
        }),
        [patch]
    );

    return [api, elements];
}

const modal = {
    confirm(modalProps) {
        let removeModal = () => {};
        modalKey = modalKey + 1;

        const content = (
            <Modal
                {...modalProps}
                key={`modal-${modalKey}`}
                afterClose={() => {
                    removeModal?.();
                }}
            />
        );

        removeModal = enqueue(content);
    }
};

export {useModal, ModalProvider};
export default modal;
