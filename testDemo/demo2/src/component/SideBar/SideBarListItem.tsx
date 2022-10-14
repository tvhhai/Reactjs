import React from 'react';
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {List, ListItem, Collapse, ListItemText, ListItemIcon, ListItemButton} from "@mui/material";
import {SideBarItem} from "../../constant/SideBar/SideBarItem";
import {NavLink} from "react-router-dom";
import {useStyles} from "./SideBarStyle";


const ListNavLink = React.forwardRef<any, any>((props, ref) => (
    <NavLink
        ref={ref}
        to={props.to}
        className={({isActive}) => `${props.className} ${isActive ? props.activeClassName : ''}`}
    >
        {props.children}
    </NavLink>
));

function SideBarListItem() {

    const classes = useStyles();
    const [list, setList] = React.useState(SideBarItem);

    const handleExpand = (expands: boolean, i: number) => {
        list[i].expand = !expands;
        setList([...list]);
    };

    return (
        <List>
            {list.map((value, index) =>
                value.nested ? (
                    <div key={index}>
                        <ListItemButton onClick={() => handleExpand(value.expand, index)} key={index}>
                            <ListItemIcon>{value.icon}</ListItemIcon>
                            <ListItemText primary={value.text}/>
                            {value.expand ? <ExpandLess/> : <ExpandMore/>}
                        </ListItemButton>

                        <Collapse in={value.expand} timeout="auto" unmountOnExit>
                            {value.nested && value.child.map((childItem, i) => (
                                <List component="div" disablePadding key={i}>
                                    <ListItemButton sx={{pl: 4}} component={ListNavLink} to={childItem.link}
                                                    activeClassName={classes.activeLink}>
                                        <ListItemIcon>{childItem.icon}</ListItemIcon>
                                        <ListItemText primary={childItem.text}/>
                                    </ListItemButton>
                                </List>
                            ))}
                        </Collapse>

                    </div>
                ) : (
                    <ListItem key={index} disablePadding>
                        <ListItemButton component={ListNavLink} to={value.link} activeClassName={classes.activeLink}>
                            <ListItemIcon>{value.icon}</ListItemIcon>
                            <ListItemText primary={value.text}/>
                        </ListItemButton>
                    </ListItem>
                )
            )}
        </List>
    );
}

export default SideBarListItem;