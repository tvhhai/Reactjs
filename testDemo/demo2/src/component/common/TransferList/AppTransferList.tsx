import React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import {ListItem, ButtonGroup, ListItemButton, ListItemIcon, ListItemText, Checkbox} from '@mui/material';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import {getStateAg} from "../AgGrid/AppAgGridSlice";
import AppIconBtn from "../Button/AppIconBtn";
import './style.scss';
import {useSelector} from "react-redux";
import {arrNotEmpty} from "../../../helper/commonHelper";

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
    // const [selectedListIndex, setSelectedListIndex] = React.useState<number[]>([]);

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
        // setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        // setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const getSelectedIndex = () => {
        let listIndex: number[] = [];
        right.map((v: any, i: number) => {
            checked.map((k: any) => {
                if (v.field === k.field) {
                    listIndex.push(i)
                }
            })
        });
        return listIndex;
    };

    // TODO: ?
    let selectedListIndex: number[] = getSelectedIndex();

    const handleMoveTop = () => {
        if (arrNotEmpty(selectedListIndex)) {
            selectedListIndex.sort(function (a, b) {
                return a - b;
            });
            let moveToIndex = selectedListIndex[0] - 1;
            moveToIndex = (moveToIndex < 0 ? right.length : moveToIndex);
            moveItemsTo(moveToIndex);
        }

    }

    const handleMoveBottom = () => {
        if (arrNotEmpty(selectedListIndex)) {
            selectedListIndex.sort((a, b) => {
                return a - b;
            });
            let moveToIndex = selectedListIndex[selectedListIndex.length - 1] + 2;
            moveToIndex = (moveToIndex > right.length ? 0 : moveToIndex);
            moveItemsTo(moveToIndex);
        }
    }

    const moveItemsTo = (index: number) => {
        if (arrNotEmpty(selectedListIndex)) {
            let front: object[] = [],
                behind: object[] = [],
                extractedRows: object[] = [],
                selectedRows: number[] = [];

            selectedListIndex.sort(function (a, b) {
                return a - b;
            });

            front = right.slice(0, index);
            behind = right.slice(index, right.length);

            selectedListIndex.forEach((v, i) => {
                extractedRows.push(right[selectedListIndex[i]]);
            })

            selectedListIndex.reverse();

            selectedListIndex.forEach((v, i) => {
                let row = selectedListIndex[i];
                if (row < index) {
                    front.splice(row, 1);
                } else {
                    behind.splice(row - index, 1);
                }
            })

            setRight(front.concat(extractedRows.concat(behind)))

            selectedListIndex.forEach((v, i) => {
                selectedRows.push(front.length + i);
            })
            selectedListIndex = selectedRows;
            // setSelectedListIndex(selectedRows);
        }
    }

    React.useEffect(() => {
        setShowCol(right);
        setHideCol(left);
    }, [right, left]);

    React.useEffect(() => {
        setLeft(hideColumns)
        setRight(columns);
        setChecked([])
    }, [cancel, hideColumns, columns]);

    const listTransfer = (items: readonly any[], rightSide: boolean) => (
        <List component="nav" dense role="list" className="transfer-list">
            {items.map((value: any, i) => {
                const labelId = `transfer-list-item-${value}-label`;
                return (
                    <div key={i}>
                        <ListItem
                            disableGutters
                            divider
                            onClick={items.length === 1 && rightSide ? () => {
                            } : handleToggle(value)}
                        >
                            <ListItemButton disableGutters
                                            className={rightSide && items.length === 1 ? 'cursor-no-drop' : ''}>
                                <ListItemIcon sx={{minWidth: 42}}>
                                    <Checkbox
                                        disabled={rightSide && items.length === 1}
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
                    {listTransfer(left, false)}
                </div>
            </Grid>

            <Grid xs={12} md={6} item>
                <div className='right-list'>
                    <div className="right-action-btn action-btn">
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <AppIconBtn
                                variant="contained"
                                onClick={handleMoveTop}
                                disabled={rightChecked.length === 0 || rightChecked.length === right.length}
                                aria-label="move selected left"
                            >
                                <KeyboardArrowUpIcon/>
                            </AppIconBtn>
                            <AppIconBtn
                                variant="contained"
                                onClick={handleMoveBottom}
                                disabled={rightChecked.length === 0 || rightChecked.length === right.length}
                                aria-label="move all left"
                            >
                                <KeyboardArrowDownIcon/>
                            </AppIconBtn>
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
                    {listTransfer(right, true)}
                </div>
            </Grid>
        </Grid>
    );
}