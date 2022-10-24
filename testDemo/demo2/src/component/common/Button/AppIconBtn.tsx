import React from 'react';
import {Button, Tooltip} from "@mui/material";
import {useStyles} from "./style";
import {useTranslation} from "react-i18next";

interface Props {
    children: React.ReactNode
    variant?: "text" | "outlined" | "contained" | undefined,
    className?: object | string,
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined,
    disabled?: boolean
    onclick?: any,
    tooltip?: any
}

const AppIconBtn = ({children, variant, className, color, disabled, onclick, tooltip}: Props) => {
    const classes = useStyles();
    const {t} = useTranslation();
    return (
        <Tooltip title={disabled ? '' : t(tooltip)}>
            <Button className={`${className} ${classes.root}`}
                    variant={variant}
                    size={"small"}
                    color={color}
                    disabled={disabled}
                    onClick={onclick}>
                {children}
            </Button>
        </Tooltip>
    );
};

export default AppIconBtn;