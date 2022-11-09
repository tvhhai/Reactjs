import React from 'react';
import {MenuItem} from "@mui/material";
import {useTranslation} from "react-i18next";
import DoneIcon from '@mui/icons-material/Done';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import {makeStyles} from "@mui/styles";
import './Togglei18n.scss'

const locales = [
    {value: 'vi', title: 'VI'},
    {value: 'en', title: 'EN'}
];

const useStyles = makeStyles({
    customWidth: {
        width: '112px',
    }
});
const Togglei18n = () => {
    const items = localStorage.getItem('local') || 'en';
    const [local, setLocal] = React.useState<any>(items);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const {i18n} = useTranslation();
    const classes = useStyles();

    React.useEffect(() => {
        setLocal(local);
    }, [local]);

    const open = Boolean(anchorEl);

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, option: string) => {
        setLocal(option);
        localStorage.setItem('local', option);
        i18n.changeLanguage(option);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <List component="nav" aria-label="Device settings" sx={{padding: 0}}>
                <ListItem
                    button
                    id="lock-button"
                    sx={{padding: '4px 8px', borderRadius: '4px'}}
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickListItem}
                >
                    <ListItemText className={'locale'} secondary={local}/>
                </ListItem>
            </List>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                }}
            >
                {locales.map((option, index) => (
                    <MenuItem
                        key={index}
                        selected={option.value === local}
                        className={`d-flex align-items-center justify-content-between ${classes.customWidth}`}
                        onClick={(event) => handleMenuItemClick(event, option.value)}
                    >
                        {option.title}
                        {option.value === local ? <DoneIcon color="secondary" fontSize="small"/> : <></>}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default Togglei18n;