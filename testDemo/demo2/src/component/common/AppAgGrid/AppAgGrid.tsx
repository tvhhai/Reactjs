import React from "react";
import {AgGridReact} from "ag-grid-react";

import "ag-grid-community";
import "./style.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import RefreshIcon from "@mui/icons-material/Refresh";
import AppIconBtn from "../Button/AppIconBtn";
import {InputBase, Paper} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import CardLayout from "../CardLayout/CardLayout";
import AppDialogTransfer from "../Dialog/AppDialogTransfer";
import {AG_GRID_CHECKBOX_SELECTION} from "../../../constant/commonConstant";
import {getStateAg, saveColumns, saveHideColumns} from "./AppAgGridSlice";
import {arrNotEmpty} from "../../../helper/commonHelper";

interface AgGridProps {
    gridRef: any;
    rowData: object[];
    columnDefs: object[];
    defaultColDef: object;
    paginationPageSize: number;
    rowSelection?: "single" | "multiple" | undefined;
    onSelectionChanged: any;
    onGridReady: any;
    refresh?: any;
    searchAll?: boolean;
    title: string;
    toolbarLeftAction?: object[];
    classNameApp?: string;
    selectMultiWithCheckbox?: boolean;
    loading: boolean;
}

const AppAgGrid = ({
                       gridRef,
                       rowData,
                       columnDefs,
                       defaultColDef,
                       paginationPageSize,
                       rowSelection,
                       onSelectionChanged,
                       onGridReady,
                       refresh,
                       searchAll,
                       title,
                       toolbarLeftAction,
                       classNameApp,
                       selectMultiWithCheckbox,
                       loading,
                   }: AgGridProps) => {

    const dispatch = useDispatch<any>();
    const [fullScreen, setFulScreen] = React.useState(false);
    const [columnDefsWithCheckbox, setColumnDefs] = React.useState(columnDefs);
    const [openDiaLog, setOpen] = React.useState(false);

    // TODO: Handle search all ag grid.
    const handleSearch = _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        gridRef.current.api.setQuickFilter(e.target.value);
        // const rowDataSearch = gridRef.current.api.getRenderedNodes()
        // if (rowDataSearch.length === 0) {
        //     gridRef.current.api.showNoRowsOverlay();
        // } else {
        //     gridRef.current.api.setQuickFilter(e.target.value)
        //
        // }
    }, 500);

    const onPageSizeChanged = React.useCallback(() => {
        let value = (document.getElementById("page-size") as HTMLInputElement)
            .value;
        gridRef.current.api.paginationSetPageSize(Number(value));
    }, []);


    const tableFullScreen = () => {
        setFulScreen(!fullScreen);
    };

    const openDialogSetting = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const onBtnApply = (val: any) => {
        const {columns, hideColumns} = val;
        dispatch(saveColumns(columns));
        dispatch(saveHideColumns(hideColumns));
        const columnDefs = [AG_GRID_CHECKBOX_SELECTION, ...columns];
        arrNotEmpty(columns) && gridRef.current.api.setColumnDefs(columnDefs);
    }

    React.useEffect(() => {
        if (selectMultiWithCheckbox) {
            setColumnDefs([AG_GRID_CHECKBOX_SELECTION, ...columnDefs])
        } else {
            setColumnDefs(columnDefs)
        }
        dispatch(saveColumns(columnDefs))
    }, [columnDefs])

    return (
        <div
            className={`app-ag-grid  ${loading ? "app-loading" : ""} ${fullScreen ? "full-screen-backdrop full-screen " : ""}`}
        >
            <CardLayout titleHeader={title}>
                <>
                    <div className="app-ag-grid-toolbar d-flex justify-content-between align-items-center">
                        <div className={"toolbar-left"}>
                            {toolbarLeftAction?.map((val: any, i: number) => (
                                <AppIconBtn
                                    key={i}
                                    tooltip={val.i18nKey}
                                    variant="outlined"
                                    className="me-2"
                                    disabled={val.disable}
                                    color={val.colorIcon}
                                    onClick={val.onClick}
                                >
                                    {val.icon}
                                </AppIconBtn>
                            ))}
                        </div>

                        <div className="toolbar-right d-flex align-items-center">
                            {searchAll ? (
                                <Paper
                                    component="form"
                                    sx={{display: "flex", alignItems: "center", width: 400}}
                                >
                                    <InputBase
                                        sx={{ml: 1, flex: 1}}
                                        type={"search"}
                                        placeholder="Search all"
                                        inputProps={{"aria-label": "Search all"}}
                                        onChange={handleSearch}
                                    />
                                    <AppIconBtn>
                                        <SearchIcon/>
                                    </AppIconBtn>
                                </Paper>
                            ) : (
                                <></>
                            )}

                            <AppIconBtn
                                variant="contained"
                                className="ms-2"
                                tooltip={"common.fullScreen"}
                                onClick={tableFullScreen}
                            >
                                {fullScreen ? <CloseFullscreenIcon/> : <OpenInFullIcon/>}
                            </AppIconBtn>

                            <AppIconBtn
                                variant="contained"
                                className="ms-2"
                                tooltip={"common.setting"}
                                onClick={openDialogSetting}
                            >
                                <SettingsIcon/>
                            </AppIconBtn>

                            {refresh ? (
                                <AppIconBtn
                                    variant="contained"
                                    className="ms-2"
                                    onClick={refresh}
                                    tooltip={"common.refresh"}
                                >
                                    <RefreshIcon/>
                                </AppIconBtn>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>

                    <div
                        className={`app-ag-grid-body ag-theme-alpine ${classNameApp}`}
                        style={{height: 550}}
                    >
                        <AgGridReact
                            ref={gridRef}
                            rowData={rowData}
                            columnDefs={selectMultiWithCheckbox ? columnDefsWithCheckbox : columnDefs}
                            rowSelection={selectMultiWithCheckbox ? 'multiple' : undefined}
                            defaultColDef={defaultColDef}
                            paginationPageSize={paginationPageSize}
                            onSelectionChanged={onSelectionChanged}
                            // suppressRowClickSelection={true}
                            // suppressCellFocus={true}
                            suppressCsvExport={true}
                            suppressExcelExport={true}
                            // rowGroupPanelShow={''}
                            // pivotMode={true}
                            suppressFocusAfterRefresh={true}
                            suppressMenuHide={true}
                            rowMultiSelectWithClick={true}
                            pagination={true}
                            animateRows={true}
                            onGridReady={onGridReady}
                            // localeText={localeText}
                            // TODO: research
                            // paginationAutoPageSize={true}
                            // suppressPaginationPanel={true}
                            // cacheQuickFilter={true}
                            // suppressLoadingOverlay={true}
                            // suppressNoRowsOverlay={true}
                            // overlayLoadingTemplate={'noRowsOverlayComponent'}
                            // overlayNoRowsTemplate={noRowsOverlayComponent}
                            // noRowsOverlayComponent={noRowsOverlayComponent}
                            // noRowsOverlayComponentParams={noRowsOverlayComponentParams}
                        ></AgGridReact>

                        <div className="example-header">
                            Page Size:
                            <select onChange={onPageSizeChanged} id="page-size">
                                <option defaultValue="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                    </div>
                </>
            </CardLayout>
            <AppDialogTransfer
                id="ringtone-menu"
                keepMounted
                open={openDiaLog}
                onClose={handleClose}
                apply={onBtnApply}
                columns={columnDefs}
            />
        </div>
    );
};

export default AppAgGrid;
