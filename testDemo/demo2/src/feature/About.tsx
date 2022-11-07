import React from 'react';
import AppDialog from "../component/common/Dialog/AppDialog";
import Button from "@mui/material/Button";
import {test} from "../service/phoneService";
import {STATUS_CODE} from "../constant/commonConstant";
import {arrNotEmpty} from "../helper/commonHelper";

function About() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleApply = (val: any) => {
        console.log('handleApply', val)
    }

    React.useEffect(() => {
        test().then((res) => {
            if (res.status === STATUS_CODE.SUCCESS && arrNotEmpty(res.data.response)) {
                console.log(res.data.response)
            }
        })
    })

    return (
        <div className="Test">
            <h1 className="d-flex">About component</h1>
            <Button variant="outlined" onClick={handleClickOpen}>
                Slide in alert dialog
            </Button>
            <AppDialog i18nKeyTitle='common.delete'
                       open={open}
                       closeFunction={handleClose}
                       applyFunction={handleApply}
            />
        </div>
    );
}

export default About;