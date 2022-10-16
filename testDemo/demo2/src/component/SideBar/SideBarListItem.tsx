import React from 'react';
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {List, ListItem, Collapse, ListItemText, ListItemIcon, ListItemButton} from "@mui/material";
import {SideBarItem} from "../../constant/SideBar/SideBarItem";
import {NavLink} from "react-router-dom";
import {useStyles} from "./SideBarStyle";
import {useLocation} from 'react-router-dom';


const ListNavLink = React.forwardRef<any, any>((props, ref) => (
    <NavLink
        ref={ref}
        to={props.to}
        onClick={props.onClick}
        className={({isActive}) => `${props.className} ${isActive ? props.activeClassName : ''}`}
    >
        {props.children}
    </NavLink>
));

function SideBarListItem() {

    const classes = useStyles();
    const location = useLocation();

    const [list, setList] = React.useState(SideBarItem);

    const handleExpand = (expands: boolean, i: number, e: any) => {
        list.map((item, index) => {
            item.expand = false
        })
        list[i].expand = !expands;
        setList([...list]);
    };

    React.useEffect(() => {
        list.map(val => {
            if (val.child.length > 0) {
                val.child.map((valChild) => {
                    if (valChild.link === location.pathname) {
                        return val.expand = true;
                    }
                })
            } else {
                list.map((item, index) => {
                    item.expand = false
                })
            }
        });
        setList([...list]);
    }, [location])


    return (
        <List className={'sideBar'}>
            {list.map((value, index) =>
                value.nested ? (
                    <div key={index}>
                        <ListItemButton onClick={(e) => handleExpand(value.expand, index, e)} key={index}
                                        className={value.expand ? classes.openCollapse : ''}>
                            <ListItemIcon className={'sideBarIcon'}>{value.icon}</ListItemIcon>
                            <ListItemText className={'sideBarTitle'} primary={value.text}/>
                            {value.expand ? <ExpandMore className={'sideBarIcon'}/> :
                                <ExpandLess className={'sideBarIcon'}/>}
                        </ListItemButton>

                        <Collapse in={value.expand} timeout="auto" unmountOnExit>
                            {value.nested && value.child.map((childItem, i) => (
                                <List component="div" disablePadding key={i}>
                                    <ListItemButton sx={{pl: 4}} component={ListNavLink} to={childItem.link}
                                                    activeClassName={classes.activeLink}>
                                        <ListItemIcon className={'sideBarIcon'}>{childItem.icon}</ListItemIcon>
                                        <ListItemText className={'sideBarTitle'} primary={childItem.text}/>
                                    </ListItemButton>
                                </List>
                            ))}
                        </Collapse>

                    </div>
                ) : (
                    <ListItem key={index} disablePadding>
                        <ListItemButton component={ListNavLink} to={value.link} activeClassName={classes.activeLink}>
                            <ListItemIcon className={'sideBarIcon'}>{value.icon}</ListItemIcon>
                            <ListItemText className={'sideBarTitle'} primary={value.text}/>
                        </ListItemButton>
                    </ListItem>
                )
            )}
        </List>
    );
}

export default SideBarListItem;