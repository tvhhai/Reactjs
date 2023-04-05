import React, {useEffect} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {styled, useTheme} from "@mui/material/styles";
// import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SideBarListItem from "../../component/SideBar/SideBarListItem";
import Togglei18n from "../Togglei18n/Togglei18n";
import _ from 'lodash'

//ICON
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./style.scss"
import {Stack, SwipeableDrawer, useMediaQuery} from "@mui/material";


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
    ismdup?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open" && prop !== "ismdup",
})<AppBarProps>(({theme, open, ismdup}) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && ismdup && {
        width: `calc(100% - ${drawerWidth}px)`,
        // marginLeft: `${drawerWidth}px`,
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
    const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const location = useLocation();
    React.useEffect(() => {
        let del_str = _.replace(location.pathname, '/', '');
        document.title = _.capitalize(del_str);
    }, [location]);

    useEffect(() => {
        setOpen(isMdUp)
    }, [isMdUp])

    return (
        <Stack direction="row">
            <CssBaseline/>
            <AppBar position="fixed" open={open} ismdup={isMdUp} sx={{background: "white", color: "black", zIndex: 1}}>
                <Toolbar className='justify-content-between'>
                    {
                        open ? (
                                <IconButton onClick={toggleDrawer}>
                                    {theme.direction === "ltr" ? (<ChevronLeftIcon/>) : (<ChevronRightIcon/>)}
                                </IconButton>
                            ) :
                            (
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={toggleDrawer}
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
            <SwipeableDrawer
                sx={{
                    width: drawerWidth,
                    marginLeft: open ? 0 : `-${drawerWidth}px`,
                    flexShrink: 0,
                    zIndex: 1,
                    transition: ' margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,width 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        marginLeft: open ? 0 : `-${drawerWidth}px`,
                        boxSizing: "border-box"
                    },
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                variant={isMdUp ? "persistent" : "temporary"}
                anchor="left"
                open={open}
                onClose={toggleDrawer}
                onOpen={toggleDrawer}
            >

                <SideBarListItem/>

            </SwipeableDrawer>
            <Main open={open} className={'main'}>
                <DrawerHeader/>
                <div className={'mainWrapper'}>
                    <Outlet/>
                </div>
            </Main>
        </Stack>
    );
}
