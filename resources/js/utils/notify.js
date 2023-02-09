import {closeSnackbar, enqueueSnackbar} from "notistack";

const notify = {
    success(message, options) {
        this.toast(message, "success", options);
    },
    info(message, options) {
        this.toast(message, "info", options);
    },
    warning(message, options) {
        this.toast(message, "warning", options);
    },
    error(message, options) {
        this.toast(message, "error", options);
    },
    toast(message, variant = "info", options = {}) {
        enqueueSnackbar(message, {...options, variant});
    },
    close(key) {
        closeSnackbar(key);
    }
};

export default notify;
