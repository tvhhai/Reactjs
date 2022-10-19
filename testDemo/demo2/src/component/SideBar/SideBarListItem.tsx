import React from "react";
import {useLocation} from "react-router-dom";
import {
    Box,
    Divider,
    List,
    ListItemText,
} from "@mui/material";
import {SideBarList} from "../../constant/SideBar/SideBarList";
import {useTranslation} from "react-i18next";
import SideBarItem from "./SideBarItem";
import SideBarItemCollapse from "./SideBarItemCollapse";
import logo from "../../asset/logo.svg";

function SideBarListItem() {
    const location = useLocation();
    const {t} = useTranslation();

    const [lists, setList] = React.useState([
        SideBarList.home,
        SideBarList.exercises,
    ]);

    const handleExpand = (expands: boolean, i: number, id: string) => {
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

    React.useEffect(() => {
        lists.map((list) => {
            list.apps.map((app) => {
                app.expand = false;
                app.active = false;
                if (app.child && app.child.length > 0) {
                    app.child.map((child) => {
                        if (child.url === location.pathname) {
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
        <>
            <List className={"sideBar"}>
                <Box sx={{height: '64px'}}>
                    <img src={logo} className={'img-fit'} alt={''}/>
                </Box>
                <Divider  />
                {
                    lists.map((sectionItem) => (
                        <div key={sectionItem.id} id={sectionItem.id} className={"sideBarSection"}>
                            <ListItemText className={"sideBarSectionItem"}
                                          primary={t(sectionItem.i18nKey)}/>
                            {
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
                                            <SideBarItem sx={{pt:.5, pb:.5}} sideBarItem={value}/>
                                        </div>
                                    )
                                )
                            }
                            <Divider  />
                        </div>
                    ))
                }
            </List>
        </>
    );
}

export default SideBarListItem;
