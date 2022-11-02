import React from 'react';
import AppDialog from "../component/common/Dialog/AppDialog";
import Button from "@mui/material/Button";

function About() {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="Test">
            <h1 className="d-flex">About component</h1>
            <Button variant="outlined" onClick={handleClickOpen}>
                Slide in alert dialog
            </Button>
            <AppDialog i18nKeyTitle='common.delete'/>
        </div>
    );
}

export default About;