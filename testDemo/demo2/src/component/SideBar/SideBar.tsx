import React from 'react';
import {Outlet} from "react-router-dom";
import {styled, useTheme} from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SideBarListItem from "../../component/SideBar/SideBarListItem";
import Togglei18n from "../Togglei18n/Togglei18n";

//ICON
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./style.scss"
import {Stack} from "@mui/material";


const drawerWidth = 240;

const Main = styled("main", {shouldForwardProp: (prop) => prop !== "open"})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));


interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));


export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <Stack direction="row">
            <CssBaseline/>
            <AppBar position="fixed" open={open} sx={{background: "white", color: "black", zIndex: 10}}>
                <Toolbar className='justify-content-between'>
                    {
                        open ? (
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === "ltr" ? (<ChevronLeftIcon/>) : (<ChevronRightIcon/>)}
                                </IconButton>
                            ) :
                            (
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start">
                                    <MenuIcon/>
                                </IconButton>
                            )
                    }

                    <div>
                        <Togglei18n/>
                    </div>

                </Toolbar>


            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    zIndex: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                // style={{ zIndex: 9 }}
                variant="persistent"
                anchor="left"
                open={open}
            >

                <SideBarListItem/>

            </Drawer>
            <Main open={open} className={'main'}>
                <DrawerHeader/>
                <div className={'mainWrapper'}>
                    <Outlet/>
                </div>
            </Main>
        </Stack>
    );
}
