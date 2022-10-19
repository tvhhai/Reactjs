import React, {ReactNode} from 'react';
import {Collapse, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useStyles} from "./SideBarStyle";
import {useTranslation} from "react-i18next";
import SideBarItem from "./SideBarItem";

interface Props {
    index: number,
    sideBarItem: { active: boolean, expand: boolean, icon: ReactNode, i18nKey: string, child: { i18nKey: string, url: string, icon: JSX.Element }[] },
    sectionId: string,
    handleExpandItem: (expand: boolean, i: number, id: string,) => void;
}

const SideBarItemCollapse = ({index, sideBarItem, sectionId, handleExpandItem}: Props) => {
    const classes = useStyles();
    const {t} = useTranslation();
    const [expand, setExpand] = React.useState(sideBarItem.expand);
    const [active, setActive] = React.useState(sideBarItem.active);

    React.useEffect(() => {
        setExpand(sideBarItem.expand);
        setActive(sideBarItem.active);
    }, [sideBarItem.expand, sideBarItem.active]);

    return (
        <div>
            <ListItemButton
                onClick={() => handleExpandItem(expand, index, sectionId)}
                className={active ? classes.activeCollapse : expand ? classes.openCollapse : ""}
            >
                <ListItemIcon className={"sideBarIcon"}>
                    {sideBarItem.icon}
                </ListItemIcon>
                <ListItemText
                    className={"sideBarTitle"}
                    primary={t(sideBarItem.i18nKey)}
                />
                {expand ? (
                    <ExpandMore className={"sideBarIcon"}/>
                ) : (
                    <ExpandLess className={"sideBarIcon"}/>
                )}
            </ListItemButton>

            <Collapse in={expand} timeout="auto" unmountOnExit>
                {sideBarItem.child.map((childItem: any, i: number) => (
                    <SideBarItem sx={{pl: 4}} key={i} sideBarItem={childItem}/>
                ))}
            </Collapse>
        </div>
    );
};

export default SideBarItemCollapse;