import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {IconButton} from "@mui/material";
import {useSnackbar, VariantType, WithSnackbarProps} from "notistack";

interface IProps {
    setUseNotifyRef: (showSnackbar: WithSnackbarProps) => void;
}

const InnerNotificationUtilsConfigurator: React.FC<IProps> = (props: IProps) => {
    props.setUseNotifyRef(useSnackbar());
    return null;
};

let useNotifyRef: WithSnackbarProps;

const setUseNotifyRef = (useNotifyRefProp: WithSnackbarProps) => {
    useNotifyRef = useNotifyRefProp;
};

export const NotificationUtilsConfigurator = () => {
    return (
        <InnerNotificationUtilsConfigurator setUseNotifyRef={setUseNotifyRef}/>
    );
};

export default {
    success(msg: string | any) {
        this.toast(msg, "success");
    },
    warning(msg: string | any) {
        this.toast(msg, "warning");
    },
    info(msg: string | any) {
        this.toast(msg, "info");
    },
    error(msg: string | any) {
        this.toast(msg, "error");
    },
    toast(msg: string, variant: VariantType = "default") {
        useNotifyRef.enqueueSnackbar(msg, {
            variant,
            autoHideDuration: 5000,
            action: (key) => (
                <React.Fragment>
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={() => useNotifyRef.closeSnackbar(key)}
                    >
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                </React.Fragment>
            ),
        });
    },
};
