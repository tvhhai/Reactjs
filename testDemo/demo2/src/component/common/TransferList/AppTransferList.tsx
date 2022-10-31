import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import {ListItem, ButtonGroup, ListItemButton, ListItemIcon, ListItemText, Checkbox} from '@mui/material';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import {getStateAg} from "../AppAgGrid/AppAgGridSlice";
import AppIconBtn from "../Button/AppIconBtn";
import './style.scss'
import {useSelector} from "react-redux";

function not(a: any[], b: any[]) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: number[], b: any) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

interface TransferListProps {
    setShowCol: (val: object[]) => void,
    setHideCol: (val: object[]) => void,
}

export default function TransferList(props: TransferListProps) {
    const {setShowCol, setHideCol} = props;
    const {tableConfig, cancel} = useSelector(getStateAg);
    const {columns, hideColumns} = tableConfig;

    const [checked, setChecked] = React.useState<number[]>([]);
    const [left, setLeft] = React.useState<object[]>(hideColumns);
    const [right, setRight] = React.useState<object[]>(columns);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: any) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        // @ts-ignore
        setLeft(left.concat(right));
        setRight([]);
    };

    React.useEffect(() => {
        setShowCol(right)
        setHideCol(left);
    }, [right, left]);

    React.useEffect(() => {
        setLeft(hideColumns)
        setRight(columns);
    }, [cancel, hideColumns, columns]);

    const customList = (items: readonly any[], sideRight: boolean) => (
        <List component="nav" dense role="list" className="transfer-list">
            {items.map((value: any, i) => {
                const labelId = `transfer-list-item-${value}-label`;
                return (
                    <div key={i}>
                        <ListItem
                            disableGutters
                            divider
                            onClick={items.length === 1 && sideRight ? () => {
                            } : handleToggle(value)}
                        >
                            <ListItemButton disableGutters
                                            className={sideRight && items.length === 1 ? 'cursor-no-drop' : ''}>
                                <ListItemIcon sx={{minWidth: 42}}>
                                    <Checkbox

                                        disabled={items.length === 1}
                                        checked={checked.indexOf(value) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{
                                            'aria-labelledby': labelId,
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={value.headerName}/>
                            </ListItemButton>
                        </ListItem>
                    </div>
                );
            })}
            <ListItem/>
        </List>
    );

    return (
        <Grid container spacing={0} justifyContent="center" className="transfer-list-wrapper">
            <Grid xs={12} md={6} item>
                <div className='left-list'>
                    <div className='left-action-btn action-btn'>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <AppIconBtn
                                variant="contained"
                                onClick={handleAllRight}
                                disabled={left.length === 0}
                                aria-label="move all right"
                            >
                                <KeyboardDoubleArrowRightIcon/>
                            </AppIconBtn>
                            <AppIconBtn
                                variant="contained"
                                onClick={handleCheckedRight}
                                disabled={leftChecked.length === 0}
                                aria-label="move selected right"
                            >
                                <KeyboardArrowRightIcon/>
                            </AppIconBtn>
                        </ButtonGroup>
                    </div>
                    {customList(left, false)}
                </div>
            </Grid>

            <Grid xs={12} md={6} item>
                <div className='right-list'>
                    <div className="right-action-btn action-btn">
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <AppIconBtn
                                variant="contained"
                                onClick={handleCheckedLeft}
                                disabled={rightChecked.length === 0}
                                aria-label="move selected left"
                            >
                                <KeyboardArrowLeftIcon/>
                            </AppIconBtn>
                            <AppIconBtn
                                variant="contained"
                                onClick={handleAllLeft}
                                disabled={right.length === 0 || right.length === 1}
                                aria-label="move all left"
                            >
                                <KeyboardDoubleArrowLeftIcon/>
                            </AppIconBtn>
                        </ButtonGroup>
                    </div>
                    {customList(right, true)}
                </div>
            </Grid>
        </Grid>
    );
}