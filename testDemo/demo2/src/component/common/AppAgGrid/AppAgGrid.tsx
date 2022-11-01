import React from "react";
import {AgGridReact} from "ag-grid-react";

import "ag-grid-community";
import "./style.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import RefreshIcon from "@mui/icons-material/Refresh";
import AppIconBtn from "../Button/AppIconBtn";
import {
    FormControl,
    InputBase,
    MenuItem,
    Pagination,
    Paper,
    Select,
    Stack
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import _ from "lodash";
import {useDispatch} from "react-redux";
import CardLayout from "../CardLayout/CardLayout";
import AppDialogTransfer from "../Dialog/AppDialogTransfer";
import {AG_GRID_CHECKBOX_SELECTION, PAGINATION_PAGE_SIZE_OPTIONS} from "../../../constant/commonConstant";
import {saveColumns, saveHideColumns} from "./AppAgGridSlice";
import {arrNotEmpty} from "../../../helper/commonHelper";
import AppLoader from "../AppLoader/AppLoader";
import {Trans} from "react-i18next";


interface AgGridProps {
    gridRef: any;
    rowData: object[];
    columnDefs: object[];
    defaultColDef: object;
    paginationPageSize?: number | undefined;
    // rowSelection?: "single" | "multiple" | undefined;
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
                       // rowSelection,
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
    const [pageSize, setPageSize] = React.useState(paginationPageSize ? paginationPageSize : PAGINATION_PAGE_SIZE_OPTIONS[0]);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [rowCount, setRowCount] = React.useState<number>(0);
    const [totalPage, setTotalPage] = React.useState<number>(0);
    const [fromIndex, setFromIndex] = React.useState<number>(currentPage);
    const [toIndex, setToIndex] = React.useState<number>(pageSize);
    const [domLayout, setDomLayout] = React.useState<"autoHeight" | "normal" | "print" | undefined>('autoHeight');


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

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        gridRef.current.api.paginationGoToPage(value - 1); // as the first page is zero
    };

    const onPageSizeChanged = React.useCallback((event: any) => {
        setPageSize(event.target.value);
        gridRef.current.api.paginationSetPageSize(Number(event.target.value));
    }, []);

    const onPaginationChanged = React.useCallback(() => {
        if (_.get(gridRef, 'current.api')) {
            setTotalPage(gridRef.current.api.paginationGetTotalPages());
            setRowCount(gridRef.current.api.paginationGetRowCount());
            setCurrentPage(gridRef.current.api.paginationGetCurrentPage() + 1); // as the first page is zero
        }
    }, []);

    React.useEffect(() => {
        let fromIndex = currentPage > 1 ? (currentPage - 1) * pageSize + 1 : 1;
        let toIndex = Math.min(fromIndex + pageSize - 1, rowCount);
        setFromIndex(fromIndex);
        setToIndex(toIndex);

        if (pageSize >= 10) {
            setDomLayout('normal');
            gridRef.current.api?.setDomLayout('normal');
        } else {
            setDomLayout('autoHeight');
            gridRef.current.api?.setDomLayout('autoHeight');
        }
    }, [rowCount, pageSize, totalPage, fromIndex, toIndex, currentPage]);


    React.useEffect(() => {
        if (_.get(gridRef, 'current.api.setDomLayout')) {
            if (pageSize >= 10) {
                gridRef.current.api.setDomLayout('normal');
                (document.querySelector(".app-ag-grid-body") as HTMLElement).style.height = '471px';
            } else {
                gridRef.current.api.setDomLayout('autoHeight');
                (document.querySelector(".app-ag-grid-body") as HTMLElement).style.height = '';
            }
        }
    }, [pageSize]);


    React.useEffect(() => {
        if (selectMultiWithCheckbox) {
            setColumnDefs([AG_GRID_CHECKBOX_SELECTION, ...columnDefs])
        } else {
            setColumnDefs(columnDefs)
        }
        dispatch(saveColumns(columnDefs))
    }, [columnDefs]);

    return (
        <div
            className={`app-ag-grid ${fullScreen ? "full-screen-backdrop full-screen" : ""}`}
        >
            {loading ? <AppLoader/> : <></>}
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

                    <div className={`app-ag-grid-body ag-theme-alpine ${classNameApp}`}
                    >
                        <AgGridReact
                            // -------------default-----------------
                            suppressCellFocus={true}
                            suppressPaginationPanel={true}
                            domLayout={'autoHeight'} // autoHeight/normal
                            // suppressCsvExport={true}
                            // suppressExcelExport={true}
                            // suppressFocusAfterRefresh={true}
                            suppressMenuHide={true}
                            rowMultiSelectWithClick={true}
                            animateRows={true}
                            pagination={true}
                            overlayNoRowsTemplate={`<span>hahaah</span>`}

                            // -------------end default-----------------
                            paginationPageSize={paginationPageSize ? paginationPageSize : pageSize}
                            ref={gridRef}
                            rowData={rowData}
                            columnDefs={selectMultiWithCheckbox ? columnDefsWithCheckbox : columnDefs}
                            rowSelection={selectMultiWithCheckbox ? 'multiple' : undefined}
                            defaultColDef={defaultColDef}
                            onSelectionChanged={onSelectionChanged}
                            onPaginationChanged={onPaginationChanged}

                            // suppressRowClickSelection={true}
                            // rowGroupPanelShow={''}
                            // pivotMode={true}
                            onGridReady={onGridReady}

                            // TODO: research
                            // localeText={localeText}
                            // paginationAutoPageSize={true}
                            // suppressPaginationPanel={true}
                            // cacheQuickFilter={true}
                            // suppressLoadingOverlay={true}
                            // suppressNoRowsOverlay={true}
                            // overlayLoadingTemplate={'noRowsOverlayComponent'}
                            // overlayNoRowsTemplate={noRowsOverlayComponent}
                            // noRowsOverlayComponent={noRowsOverlayComponent}
                            // noRowsOverlayComponentParams={noRowsOverlayComponentParams}
                        />

                        <div className="app-ag-grid-paging">
                            <div className="app-flex-center pull-left">
                                <FormControl size="small">
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={pageSize}
                                        onChange={onPageSizeChanged}
                                    >
                                        {
                                            PAGINATION_PAGE_SIZE_OPTIONS.map((v, i) => (
                                                <MenuItem key={i} value={v}>{v}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                <span className='page-inform'>
                                    {/*<>*/}
                                    {/*    {i18n.t('common.pageInform1', {*/}
                                    {/*        from: fromIndex,*/}
                                    {/*        to: toIndex,*/}
                                    {/*        total: rowCount*/}
                                    {/*    })}*/}
                                    {/*</>*/}

                                    <Trans
                                        i18nKey="common.pageInform1"
                                        // values={{currentPage, totalPage}}
                                        // components={{1: <strong/>, 3: <strong/>}}
                                    >
                                        Showing <strong>{{fromIndex}}</strong> - <strong>{{toIndex}}</strong> of <strong>{{rowCount}}</strong> records
                                    </Trans>
                                </span>
                            </div>

                            <div className='app-ag-grid-pager-nav pull-right'>
                                <span className='page-inform'>
                                    {/*<>*/}
                                    {/*    {i18n.t('common.pageInform2', {*/}
                                    {/*        page: currentPage,*/}
                                    {/*        totalPage: totalPage*/}
                                    {/*    })}*/}
                                    {/*</>*/}

                                    <Trans
                                        i18nKey="common.pageInform2"
                                        // values={{currentPage, totalPage}}
                                        // components={{1: <strong/>, 3: <strong/>}}
                                    >
                                        Page <strong>{{currentPage}}</strong> of <strong>{{totalPage}}</strong>
                                    </Trans>

                                </span>
                                <Stack spacing={2}>
                                    <Pagination count={totalPage}
                                                page={currentPage}
                                                siblingCount={0} boundaryCount={0}
                                                variant="outlined"
                                                color="primary"
                                                shape="rounded"
                                                showFirstButton showLastButton
                                                onChange={handleChange}/>
                                </Stack>
                            </div>
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
    )
        ;
};

export default AppAgGrid;
