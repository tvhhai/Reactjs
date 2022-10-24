import React from "react";
import {AgGridReact} from "ag-grid-react";

import "ag-grid-community";
import "./style.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import RefreshIcon from "@mui/icons-material/Refresh";
import AppIconBtn from "../Button/AppIconBtn";
import {InputBase, Paper} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import _ from "lodash";
import {useTranslation} from "react-i18next";
import {showNotification} from "../Notification/NotificationSlice";
import {useDispatch} from "react-redux";

interface AgGridProps {
    gridRef: any;
    rowData: object[];
    columnDefs: object[];
    defaultColDef: object;
    paginationPageSize: number;
    rowSelection: "single" | "multiple" | undefined;
    onSelectionChanged: any;
    onGridReady: any;
    refresh?: any;
    searchAll?: boolean;
    title: string;
    toolbarLeftAction?: object[];
    classNameApp?: string;
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
                       loading,
                   }: AgGridProps) => {

    const {t} = useTranslation();
    const dispatch = useDispatch<any>();

    const handleSearch = _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        gridRef.current.api.setQuickFilter(e.target.value);
        //TODO: Handle search all ag grid.

        // const rowDataSearch = gridRef.current.api.getRenderedNodes()
        // if (rowDataSearch.length === 0) {
        //     gridRef.current.api.showNoRowsOverlay();
        // } else {
        //     gridRef.current.api.setQuickFilter(e.target.value)
        //
        // }
    }, 500);

    const onPageSizeChanged = React.useCallback(() => {
        let value = (document.getElementById("page-size") as HTMLInputElement).value;
        gridRef.current.api.paginationSetPageSize(Number(value));
    }, []);

    const settingColumn = () => {
        dispatch(showNotification({message: "Add phone successfully!", type: "success"}))
    }

    return (
        <div className={`${loading ? "app-loading" : ""} app-ag-grid`}>
            <div className="app-ag-grid-header mb-4">
                <h2 className={"title-header mb-3"}>{title}</h2>
                <hr className={"mb-4"}/>
                <div className="toolbar d-flex justify-content-between align-items-center">
                    <div className={"toolbar-left"}>
                        {toolbarLeftAction?.map((val: any, i: number) => (
                            <AppIconBtn
                                key={i}
                                tooltip={val.i18nKey}
                                variant="outlined"
                                className="me-2"
                                disabled={val.disable}
                                color={val.colorIcon}
                                onclick={val.onClick}
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
                        >
                            <OpenInFullIcon/>
                        </AppIconBtn>
                        <AppIconBtn
                            variant="contained"
                            className="ms-2"
                            tooltip={"common.setting"}
                            onclick={settingColumn}
                        >
                            <SettingsIcon/>
                        </AppIconBtn>
                        {refresh ? (
                            <AppIconBtn
                                variant="contained"
                                className="ms-2"
                                onclick={refresh}
                                tooltip={"common.refresh"}
                            >
                                <RefreshIcon/>
                            </AppIconBtn>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>

            <div
                className={`${classNameApp} app-ag-grid-body ag-theme-alpine`}
                style={{height: 600}}
            >
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    rowSelection={rowSelection}
                    defaultColDef={defaultColDef}
                    paginationPageSize={paginationPageSize}
                    onSelectionChanged={onSelectionChanged}
                    // suppressRowClickSelection={true}
                    rowMultiSelectWithClick={true}
                    // overlayLoadingTemplate={'noRowsOverlayComponent'}
                    // overlayNoRowsTemplate={noRowsOverlayComponent}
                    // noRowsOverlayComponent={noRowsOverlayComponent}
                    // noRowsOverlayComponentParams={noRowsOverlayComponentParams}
                    pagination={true}
                    animateRows={true}
                    cacheQuickFilter={true}
                    onGridReady={onGridReady}
                ></AgGridReact>

                <div className="example-header">
                    Page Size:
                    <select onChange={onPageSizeChanged} id="page-size">
                        <option defaultValue="2">2</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                        <option value="1000">1000</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default AppAgGrid;
