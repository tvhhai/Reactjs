import {
    Snackbar,
    Alert,
    SnackbarCloseReason,
    IconButton,
    Button,
} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {getAlert} from "./NotificationSlice";
import {useSnackbar} from "notistack";
import CloseIcon from "@mui/icons-material/Close";

export const Notification = (): JSX.Element => {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const notification = useSelector(getAlert);

    return (
        <span className='d-none'>
            {
                notification.open && notification.message ? enqueueSnackbar(notification.message, {
                    // variant could be success, error, warning, info, or default
                    variant: notification.type,
                    action: (key) => (
                        <React.Fragment>
                            <IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={() => closeSnackbar(key)}
                            >
                                <CloseIcon fontSize="small"/>
                            </IconButton>
                        </React.Fragment>
                    ),
                }) : (<span className='d-none'></span>)
            }
        </span>

    );
};
