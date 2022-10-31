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
    onClick?: any,
    tooltip?: any
}

const AppIconBtn = ({children, variant, className, color, disabled, onClick, tooltip}: Props) => {
    const classes = useStyles();
    const {t} = useTranslation();
    return (
        <Tooltip title={disabled ? '' : t(tooltip)}>
            <Button className={`${className} ${classes.root}`}
                    variant={variant}
                    size={"small"}
                    color={color}
                    disabled={disabled}
                    onClick={onClick}>
                {children}
            </Button>
        </Tooltip>
    );
};

export default AppIconBtn;