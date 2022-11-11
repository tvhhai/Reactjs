import React from "react";
import {useLocation} from "react-router-dom";
import {
    Divider,
    List,
    ListItemText, Stack,
} from "@mui/material";
import {SideBarConfigList} from "./SideBarConfigList";
import {useTranslation} from "react-i18next";
import SideBarItem from "./SideBarItem";
import SideBarItemCollapse from "./SideBarItemCollapse";
import logo from "../../asset/logo.svg";
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles(
    {
        divider: {
            "&.MuiDivider-root": {
                margin: "24px 0 4px 0",
                "&::before": {
                    borderTop: "thin solid rgb(113, 108, 134)"
                },
                "&::after": {
                    borderTop: "thin solid rgb(113, 108, 134)"
                }
            },
            "& .MuiDivider-wrapper": {
                fontSize: 16
            }
        },
        divider2: {
            "&.MuiDivider-root": {
                borderColor: "rgb(113, 108, 134)",
                opacity: 1
            }

        }
    }
);

function SideBarListItem({list}: any) {
    const location = useLocation();
    const {t} = useTranslation();
    const classes = useStyles();
    const [lists, setList] = React.useState([
        // SideBarConfigList.home,
        SideBarConfigList.exercises,
        SideBarConfigList.administration
    ]);

    //TODO: Optimization
    const handleExpand = (expands: boolean, i: number, id: string) => {
        // Close Collapse when clicking on another Collapse
        lists.map((list) => {
            if (list.id === id) {
                list.apps[i].expand = !expands;
            } else {
                list.apps.map((app) => {
                    app.expand = false;
                });
            }
        });
        setList([...lists]);
    };

    //TODO: Optimization
    React.useEffect(() => {
        // Keep active menu
        lists.map((list) => {
            list.apps.map((app) => {
                app.expand = false;
                app.active = false;
                if (app.child && app.child.length > 0) {
                    app.child.map((child) => {
                        if (location.pathname.includes(child.url)) {
                            app.expand = true;
                            app.active = true;
                        }
                    });
                }
            });
        });
        setList([...lists]);
    }, [location]);

    return (
        <List className={"sideBar"}>
            <Stack sx={{height: '64px'}}>
                <img src={logo} className={'img-fit'} alt={''}/>
            </Stack>

            <Divider className={classes.divider2} light/>

            <SideBarItem sx={{mt: 3}} sideBarItem={SideBarConfigList.dashboard}/>

            {
                lists.map((sectionItem) => (
                    <div key={sectionItem.id} id={sectionItem.id} className={"sideBarSection"}>
                        <Divider className={classes.divider} textAlign="left">
                            <ListItemText className={"sideBarSectionItem"}
                                          primary={t(sectionItem.i18nKey)}/>
                        </Divider>

                        {
                            //TODO: Optimization
                            sectionItem.apps.map((value, index) =>
                                value.child && value.child.length > 0 ? (
                                    <SideBarItemCollapse key={index}
                                                         sideBarItem={value}
                                                         sectionId={sectionItem.id}
                                                         index={index}
                                                         handleExpandItem={handleExpand}
                                    />
                                ) : (
                                    <div key={index}>
                                        <SideBarItem sideBarItem={value}/>
                                    </div>
                                )
                            )
                        }
                        <Divider/>
                    </div>
                ))
            }
        </List>
    );
}

export default SideBarListItem;
