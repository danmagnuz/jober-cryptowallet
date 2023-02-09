import React, {useRef} from "react";
import PropTypes from "prop-types";
import SnackbarComponent from "./components/SnackbarComponent";
import {SnackbarProvider} from "notistack";

function NotistackProvider(props) {
    const notistackRef = useRef();

    return (
        <SnackbarProvider
            {...props}
            ref={notistackRef}
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            Components={{
                info: SnackbarComponent,
                success: SnackbarComponent,
                warning: SnackbarComponent,
                error: SnackbarComponent
            }}
            maxSnack={5}
            autoHideDuration={3000}
            dense={true}
            preventDuplicate
            variant="info"
        />
    );
}

NotistackProvider.propTypes = {
    children: PropTypes.node
};

export default NotistackProvider;
