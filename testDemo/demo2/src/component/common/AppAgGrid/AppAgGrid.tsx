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
import {showNotification} from "../Notification/NotificationSlice";
import {useDispatch} from "react-redux";
import CardLayout from "../CardLayout/CardLayout";

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

    const dispatch = useDispatch<any>();
    const [fullScreen, setFulScreen] = React.useState(false);
    // console.log(columnDefs)

    //TODO: Handle search all ag grid.
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

    // TODO: Handle settingColumn
    const settingColumn = () => {
        dispatch(showNotification({message: "PhoneAdd phone successfully!", type: "success"}));
    };

    // TODO: Handle tableFullScreen
    const tableFullScreen = () => {
        setFulScreen(!fullScreen);
    };
    // const localeText = React.useMemo(() => {
    //     return AG_GRID_LOCALE_ZZZ;
    // }, []);

    return (
        <div
            className={`app-ag-grid  ${loading ? "app-loading" : ""} ${fullScreen ? "full-screen-backdrop full-screen " : ""
            }`}
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
                                onclick={tableFullScreen}
                            >
                                {fullScreen ? <CloseFullscreenIcon/> : <OpenInFullIcon/>}
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
                    <div
                        className={`app-ag-grid-body ag-theme-alpine ${classNameApp}`}
                        style={{height: 550}}
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
        </div>
    );
};

export default AppAgGrid;
