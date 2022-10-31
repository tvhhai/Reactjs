import React from 'react';
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import TransferList from "../TransferList/AppTransferList";
import i18n from "i18next";
import {useDispatch, useSelector} from "react-redux";
import {getStateAg, setCancel} from "../AppAgGrid/AppAgGridSlice";
import {arrNotEmpty} from "../../../helper/commonHelper";

interface ConfirmationDialogRawProps {
    id: string;
    keepMounted: boolean;
    columns: object[];
    open: boolean;
    onClose: (value?: string) => void;
    apply: (value?: any) => void;
}

const AppDialogTransfer = (props: ConfirmationDialogRawProps) => {
    const {columns: columnsProp, open, apply, onClose, ...other} = props;
    const dispatch = useDispatch<any>();
    const {cancel} = useSelector(getStateAg);

    const [disable, setDisabled] = React.useState(false);

    const [columns, setCol] = React.useState<object[]>([]);
    const [hideColumns, setHideCol] = React.useState<object[]>([]);


    React.useEffect(() => {
        !arrNotEmpty(columns) ? setDisabled(true) : setDisabled(false)
    }, [columns]);

    React.useEffect(() => {
        setCol(columnsProp);
    }, [columnsProp]);


    const handleCancel = () => {
        dispatch(setCancel(!cancel));
        onClose();
    };

    const handleOk = () => {
        apply({columns, hideColumns});
        onClose();
    };

    return (
        <Dialog
            sx={{
                "& .MuiDialog-container": {
                    justifyContent: "center",
                    alignItems: "flex-start"
                },
                '& .MuiDialog-paper': {width: '100%'}
            }}
            maxWidth="md"
            open={open}
            {...other}
        >
            <DialogTitle>
                <>
                    {i18n.t('common.selectColShow')}
                </>
            </DialogTitle>

            <DialogContent dividers>
                <TransferList setShowCol={setCol} setHideCol={setHideCol}/>
            </DialogContent>

            <DialogActions>
                <Button variant='contained' color='inherit' onClick={handleCancel}>
                    <>
                        {i18n.t('common.btn.cancel')}
                    </>
                </Button>
                <Button variant='contained' disabled={disable} onClick={handleOk}>
                    <>
                        {i18n.t('common.btn.save')}
                    </>
                </Button>
            </DialogActions>
        </Dialog>
    );

};

export default AppDialogTransfer;