import React, {ReactNode} from 'react';
import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useStyles} from "./SideBarStyle";
import {useTranslation} from "react-i18next";


interface Props {
    sideBarItem: { url: string, icon: ReactNode, i18nKey: string },
    sx?: any
}

const ListNavLink = React.forwardRef<any, any>((props, ref) => (
    <NavLink
        ref={ref}
        to={props.to}
        onClick={props.onClick}
        className={({isActive}) =>
            `${props.className} ${isActive ? props.activeClassName : ""}`
        }
    >
        {props.children}
    </NavLink>
));


const SideBarItem = ({sideBarItem, sx}: Props) => {
    const classes = useStyles();
    const {t} = useTranslation();

    return (
        <>
            <ListItem disablePadding>
                <ListItemButton
                    sx={sx}
                    component={ListNavLink}
                    to={sideBarItem.url}
                    activeClassName={classes.activeLink}
                >
                    <ListItemIcon className={"sideBarIcon"}>
                        {sideBarItem.icon}
                    </ListItemIcon>
                    <ListItemText
                        className={"sideBarTitle"}
                        primary={t(sideBarItem.i18nKey)}
                    />
                </ListItemButton>
            </ListItem>
        </>
    );
};

export default SideBarItem;