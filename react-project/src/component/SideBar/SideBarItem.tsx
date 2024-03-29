import React from 'react';
import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {NavLink} from "react-router-dom";
// import {useStyles} from "./SideBarStyle.style";
import {useTranslation} from "react-i18next";
import {ISideBarItem} from "../../model/ISideBar";


interface Props {
    sideBarItem: ISideBarItem,
    sx?: any;
    showIcon?: boolean,
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


const SideBarItem = ({sideBarItem, sx, showIcon = true}: Props) => {
    // const classes = useStyles();
    const {t} = useTranslation();

    return (
        <>
            <ListItem disablePadding>
                <ListItemButton
                    sx={sx}
                    component={ListNavLink}
                    to={sideBarItem.url}
                    className={'sideBarLink'}
                    activeClassName={'activeLink'}
                >
                    {
                        showIcon ? (
                            <ListItemIcon sx={{minWidth: '40px'}} className={"sideBarIcon"}>
                                {sideBarItem.icon}
                            </ListItemIcon>
                        ) : (<div className={"dot"}/>)
                    }

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