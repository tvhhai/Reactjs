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
        itemOne: {
            "&.MuiDivider-root": {
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
    }
);

function SideBarListItem({list}: any) {
    const location = useLocation();
    const {t} = useTranslation();
    const classes = useStyles();
    const [lists, setList] = React.useState([
        SideBarConfigList.home,
        SideBarConfigList.exercises,
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
            <Divider/>
            {
                lists.map((sectionItem) => (
                    <div key={sectionItem.id} id={sectionItem.id} className={"sideBarSection"}>
                        <Divider className={classes.itemOne} textAlign="left">
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

// function ListItem({listItem}: any) {
//     return (
//         <div>
//             <span>
//                 {Array.isArray(listItem) && <Lista list={listItem}/>}
//             </span>
//         </div>
//     );
// }
//
// function ListItemCollape({listItem}: any) {
//     return (
//         <div>
//             {Array.isArray(listItem) && <Lista list={listItem}/>}
//         </div>
//     );
// }
//
// function Lista({list}: any) {
//     // console.log(list)
//     return (
//         <ul>
//             {list.map((listItem: any, i: number) => (
//                 <div key={i}>
//                     <li>{listItem.i18nKey}</li>
//                     {listItem.child && listItem.child.length > 0 ? <ListItemCollape listItem={listItem.child}/> :
//                         <ListItem key={i} listItem={listItem.apps}/>}
//
//                 </div>
//             ))}
//         </ul>
//     );
// }

export default SideBarListItem;
