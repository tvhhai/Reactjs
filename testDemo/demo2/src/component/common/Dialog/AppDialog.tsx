import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import i18n from "i18next";
import {Breakpoint} from "@mui/material";


interface dialogProps {
    suppressBtnCancel?: boolean,
    suppressBtnApply?: boolean,
    fullWidth?: boolean,
    size?: false | Breakpoint | undefined,
    position?: "top" | "center" | undefined,
    i18nKeyTitle: string,
    labelCancel?: string,
    labelApply?: string,
    children?: React.ReactNode,
    textContent?: string,
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const AppDialog = (props: dialogProps) => {
    const {
        suppressBtnCancel = false,
        suppressBtnApply = false,
        fullWidth = true,
        size,
        position = 'top',
        i18nKeyTitle,
        labelCancel = 'common.btn.cancel',
        labelApply = 'common.btn.apply',
        children,
        textContent
    }
        = props
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Slide in alert dialog
            </Button>

            <Dialog
                sx={{
                    "& .MuiDialog-container": {
                        justifyContent: "center",
                        alignItems: `${position === 'center' ? 'center' : 'flex-start'}`
                    }
                }}
                fullWidth={fullWidth}
                maxWidth={size}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <>
                        {i18n.t(i18nKeyTitle)}
                    </>
                </DialogTitle>

                <DialogContent dividers>
                    {
                        textContent && <DialogContentText id="alert-dialog-slide-description">
                            {textContent}
                        </DialogContentText>
                    }

                    {
                        children
                    }
                </DialogContent>

                <DialogActions>
                    <>
                        {
                            !suppressBtnCancel && <Button variant='contained' color='inherit' onClick={handleClose}><>
                                {i18n.t(labelCancel)}
                            </>
                            </Button>
                        }
                        {
                            !suppressBtnApply && <Button variant='contained' onClick={handleClose}><>
                                {i18n.t(labelApply)}
                            </>
                            </Button>
                        }
                    </>


                </DialogActions>

            </Dialog>
        </div>
    );
};

export default AppDialog;