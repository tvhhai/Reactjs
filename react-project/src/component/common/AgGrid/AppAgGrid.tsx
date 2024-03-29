import React from "react";
import {AgGridReact} from "ag-grid-react";

import "ag-grid-community";
import "./style.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import RefreshIcon from "@mui/icons-material/Refresh";
import AppIconBtn from "../Button/AppIconBtn";
import {FormControl, Grid, InputAdornment, MenuItem, Pagination, Paper, Select, Stack, TextField,} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import CardLayout from "../CardLayout/CardLayout";
import AppDialogTransfer from "../Dialog/AppDialogTransfer";
import {
    AG_GRID_CHECKBOX_SELECTION,
    DEFAULT_COL_DEFS,
    PAGINATION_PAGE_SIZE_OPTIONS
} from "../../../constant/agGridConstant";
import {getStateAg, getTableConfig, saveTableConfig} from "./AppAgGridSlice";
import {arrNotEmpty, removeArrByObjKey, sortObjByObjMap} from "../../../helper/commonHelper";
import AppLoader from "../Loader/AppLoader";
import {Trans} from "react-i18next";
import i18n from "i18next";
import {IAgGrid} from "../../../model/IAgGrid";
import {ColDef, ColumnResizedEvent, DragStoppedEvent} from "ag-grid-community";
import {FirstDataRenderedEvent} from "ag-grid-community/dist/lib/events";

const AppAgGrid = (props: IAgGrid) => {
    const {
        gridName,
        enableFullScreen,
        enableTableConfig = true,
        enableSaveColDrag,
        rowData,
        initialColumnDefs,
        defaultColDef,
        paginationPageSize,
        onSelectionChanged,
        onGridReady,
        refresh,
        searchAll,
        title,
        toolbarLeftAction,
        classNameApp,
        selectMultiWithCheckbox,
        selectSingleWithoutCheckbox,
        loading,
    } = props;

    const gridRef = React.useRef<any>();
    const dispatch = useDispatch<any>();
    const {tableConfig, isLoading} = useSelector(getStateAg);
    const {showColumns, hiddenColumns} = tableConfig;
    const [fullScreen, setFulScreen] = React.useState(false);
    const [columnDefs, setColumnDefs] = React.useState<ColDef[]>(initialColumnDefs);
    const [openDiaLog, setOpen] = React.useState(false);
    const [pageSize, setPageSize] = React.useState(
        paginationPageSize ? paginationPageSize : PAGINATION_PAGE_SIZE_OPTIONS[0]
    );
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [rowCount, setRowCount] = React.useState<number>(0);
    const [totalPage, setTotalPage] = React.useState<number>(0);
    const [fromIndex, setFromIndex] = React.useState<number>(currentPage);
    const [toIndex, setToIndex] = React.useState<number>(pageSize);

    const handleSearch = _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        gridRef.current.api.setQuickFilter(e.target.value);
        const rowDataSearch = gridRef.current.api.getRenderedNodes();
        arrNotEmpty(rowDataSearch)
            ? gridRef.current.api.hideOverlay()
            : gridRef.current.api.showNoRowsOverlay();
    }, 500);

    const tableFullScreen = () => {
        setFulScreen(!fullScreen);
        sizeColumnToFit();
    };

    const openDialogSetting = () => {
        setOpen(true);
    };

    const closeDialogSetting = () => {
        setOpen(false);
    };

    const onBtnApply = (val: any) => {
        const {left, right} = val;
        if (enableTableConfig || enableSaveColDrag) {
            dispatch(saveTableConfig(requestTableConfig(right, left)));
            setColumnDefs(right);
            sizeColumnToFit();
        }
    };

    const onColumnResized = (params: ColumnResizedEvent) => {
        // params.api.sizeColumnsToFit();
    }

    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setCurrentPage(value);
        gridRef.current.api.paginationGoToPage(value - 1); // as the first page is zero
    };

    const onDragStopped = (params: DragStoppedEvent) => {

        const getColumnStateOrder = params.columnApi.getColumnState();
        const columnRemoveCheckBox = removeCheckBox(getColumnStateOrder);

        const mergedColumnsByColId = _.merge(
            _.keyBy(getColumnStateOrder, "colId"),
            _.keyBy(columnRemoveCheckBox, "colId")
        );
        handleSaveTableConfig(_.values(mergedColumnsByColId));
    };

    const onFirstDataRendered = (params: FirstDataRenderedEvent) => {
        sizeColumnToFit();
    }

    const sizeColumnToFit = () => {
        window.setTimeout(() => {
            gridRef.current.api.sizeColumnsToFit()
        }, 500);
    }

    const removeCheckBox = (columnList: object[]): object[] => {
        // @ts-ignore
        _.remove(columnList, (column: { colId: string }) => {
            if (column.colId === 'app-ag-grid-check-box') {
                return column;
            }
        });
        return columnList;
    }

    // const afterSortChanged = (params: SortChangedEvent) => {
    // const getColumnState = params.columnApi.getColumnState();
    // getColumnState.forEach((v: any, i: number) => {
    //     columnDefs[i].sort = v.sort;
    //     columnDefs[i].sortIndex = v.sortIndex;
    // });
    // handleSaveTableConfig(columnDefs);
    // };

    const syncOrderColumns = (columnsOrder: object[], columnDefs: object[]) => {
        let columnDefsMap: Record<string, any> = {};

        columnDefs.forEach((v: any) => {
            columnDefsMap[v.colId] = v;
        });

        return columnsOrder.map((v: any) => {
            return columnDefsMap[v.colId];
        });
    };

    const getColumnsList = () => {
        const getColumnState = gridRef.current.columnApi.columnModel.getColumnState();
        const mergedColumnsByColId = _.merge(
            _.keyBy(getColumnState, "colId"),
            _.keyBy(initialColumnDefs, "colId")
        );

        return _.values(mergedColumnsByColId);
    }

    const handleTableConfig = () => {
        if (gridRef.current.columnApi) {
            if (arrNotEmpty(showColumns)) {

                if (selectMultiWithCheckbox) {
                    initialColumnDefs.unshift(AG_GRID_CHECKBOX_SELECTION);
                }
                const columnsState = getColumnsList();
                const lengthShowCol = selectMultiWithCheckbox ? showColumns.length + 1 : showColumns.length;
                const isAddNewOrDeleteColumns: boolean = lengthShowCol + hiddenColumns.length !== columnsState.length;

                // Remove hideColumn
                const columnList = removeArrByObjKey(columnsState, hiddenColumns, 'colId');
                const columnMapOrder = showColumns.map((v: any) => v.colId);
                // Sort order current column based on column retrieved from DB
                // If the current columns are not in the column list retrieved from the DB, those columns will be bossed at the end
                const columnOrder = sortObjByObjMap(_.cloneDeep(columnList), columnMapOrder, 'colId');

                if (isAddNewOrDeleteColumns) {
                    const columnRemoveCheckBox = removeCheckBox(columnOrder);
                    handleSaveTableConfig(columnRemoveCheckBox);
                }
                setColumnDefs(columnOrder);
            } else {
                if (gridRef.current.columnApi) {
                    const columnsState = getColumnsList();
                    setColumnDefs(columnsState);
                    handleSaveTableConfig(columnsState);
                }
            }
        }
    };

    const handleGetTableConfig = () => {
        if (enableTableConfig || enableSaveColDrag) {
            dispatch(getTableConfig(gridName));
        }
    };

    const handleSaveTableConfig = (data: any) => {
        if (enableTableConfig || enableSaveColDrag) {
            dispatch(saveTableConfig(requestTableConfig(data, hiddenColumns)));
        }
    };

    const requestTableConfig = (
        showColumns: object[],
        hiddenColumns: object[]
    ) => {
        return {
            tableId: gridName,
            tableConfig: [
                {
                    showColumns: showColumns,
                    hiddenColumns: hiddenColumns,
                    gridColumns: initialColumnDefs,
                },
            ],
        };
    };

    const onPageSizeChanged = React.useCallback((event: any) => {
        setPageSize(event.target.value);
        gridRef.current.api.paginationSetPageSize(Number(event.target.value));
    }, []);

    const onPaginationChanged = React.useCallback(() => {
        if (_.get(gridRef, "current.api")) {
            const rowData = gridRef.current.api.getRenderedNodes();

            setTotalPage(gridRef.current.api.paginationGetTotalPages());
            setRowCount(gridRef.current.api.paginationGetRowCount());
            arrNotEmpty(rowData)
                ? setCurrentPage(gridRef.current.api.paginationGetCurrentPage() + 1) // as the first page is zero
                : setCurrentPage(0);
        }
    }, []);

    React.useEffect(() => {
        handleGetTableConfig();
    }, []);

    React.useEffect(() => {
        handleTableConfig();
    }, [tableConfig]);

    React.useEffect(() => {
        let fromIndex = currentPage >= 1 ? (currentPage - 1) * pageSize + 1 : 0;
        let toIndex = Math.min(fromIndex + pageSize - 1, rowCount);
        setFromIndex(fromIndex);
        setToIndex(toIndex);
    }, [rowCount, pageSize, totalPage, fromIndex, toIndex, currentPage]);

    React.useEffect(() => {
        if (_.get(gridRef, "current.api.setDomLayout")) {
            if (pageSize >= 10) {
                gridRef.current.api.setDomLayout("normal");
                (document.querySelector(".app-ag-grid-body") as HTMLElement).style.height = "471px";
            } else {
                gridRef.current.api.setDomLayout("autoHeight");
                (document.querySelector(".app-ag-grid-body") as HTMLElement).style.height = "";
            }
        }
    }, [pageSize]);


    React.useEffect(() => {
        const debouncedHandleResize = _.debounce(function handleResize() {
            const allColumnIds = gridRef.current.columnApi.getColumns().map((column:ColDef) => column.colId);
            gridRef.current.columnApi.autoSizeColumns(allColumnIds);
        }, 1000);

        window.addEventListener('resize', debouncedHandleResize)

        return () => window.removeEventListener('resize', debouncedHandleResize)
    })

    return (
        <div
            className={`app-ag-grid ${fullScreen ? "full-screen-backdrop full-screen" : ""}`}
        >
            <AppLoader isLoading={loading || isLoading}/>
            <CardLayout titleHeader={title}>
                <>
                    <div className="app-ag-grid-toolbar">
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={4}>
                                <div className="toolbar-left">
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
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <div className="toolbar-right">
                                    {searchAll ? (
                                        <Paper sx={{display: "flex", alignItems: "center"}}>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                id="outlined-basic"
                                                type="search"
                                                variant="outlined"
                                                placeholder={i18n.t("common.searchAll")}
                                                onChange={handleSearch}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SearchIcon/>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Paper>
                                    ) : (
                                        <></>
                                    )}

                                    {enableFullScreen && (
                                        <AppIconBtn
                                            variant="contained"
                                            className="ms-2"
                                            tooltip={"common.fullScreen"}
                                            onClick={tableFullScreen}
                                        >
                                            {fullScreen ? (
                                                <CloseFullscreenIcon/>
                                            ) : (
                                                <OpenInFullIcon/>
                                            )}
                                        </AppIconBtn>
                                    )}

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
                            </Grid>
                        </Grid>
                    </div>

                    <div className={`app-ag-grid-body ag-theme-alpine ${classNameApp}`}>
                        <AgGridReact
                            // -------------default-----------------
                            ref={gridRef}
                            onDragStopped={onDragStopped}
                            // onSortChanged={afterSortChanged}
                            tooltipShowDelay={0}
                            // enableBrowserTooltips={true}
                            suppressCellFocus={true}
                            suppressPaginationPanel={true}
                            domLayout={"autoHeight"} // autoHeight/normal
                            onFirstDataRendered={onFirstDataRendered}
                            // suppressCsvExport={true}
                            // suppressExcelExport={true}
                            // suppressFocusAfterRefresh={true}
                            // suppressScrollOnNewData={true}
                            suppressMenuHide={true}
                            suppressDragLeaveHidesColumns={true}
                            rowMultiSelectWithClick={true}
                            animateRows={true}
                            pagination={true}
                            overlayNoRowsTemplate={i18n.t("common.agGridNoData")}
                            // -------------end default-----------------
                            paginationPageSize={paginationPageSize ? paginationPageSize : pageSize}
                            rowData={rowData}
                            columnDefs={columnDefs}
                            rowSelection={
                                selectMultiWithCheckbox
                                    ? "multiple"
                                    : selectSingleWithoutCheckbox
                                        ? "single"
                                        : undefined
                            }
                            defaultColDef={defaultColDef ? defaultColDef : DEFAULT_COL_DEFS}
                            onSelectionChanged={onSelectionChanged}
                            onPaginationChanged={onPaginationChanged}
                            onColumnResized={onColumnResized}
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
                            <Grid
                                container
                                spacing={2}
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Grid item xs={12} md={4}>
                                    <div className="pull-left">
                                        <FormControl size="small">
                                            <Select
                                                labelId="demo-select-small"
                                                id="demo-select-small"
                                                value={pageSize}
                                                onChange={onPageSizeChanged}
                                            >
                                                {PAGINATION_PAGE_SIZE_OPTIONS.map((v, i) => (
                                                    <MenuItem key={i} value={v}>
                                                        {v}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <span className="page-inform">
                                            <Trans i18nKey="common.pageInform1">
                                                Showing <strong>{{fromIndex}}</strong> -
                                                <strong>{{toIndex}}</strong> of
                                                <strong>{{rowCount}}</strong> records
                                            </Trans>
                                        </span>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <div className="app-ag-grid-pager-nav pull-right">
                                        <span className="page-inform">
                                            <Trans i18nKey="common.pageInform2">
                                                Page <strong>{{currentPage}}</strong> of
                                                <strong>{{totalPage}}</strong>
                                            </Trans>
                                        </span>

                                        <Stack spacing={2}>
                                            <Pagination
                                                count={totalPage}
                                                page={currentPage}
                                                siblingCount={0}
                                                boundaryCount={0}
                                                variant="outlined"
                                                color="primary"
                                                shape="rounded"
                                                showFirstButton
                                                showLastButton
                                                onChange={handleChangePage}
                                            />
                                        </Stack>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </>
            </CardLayout>
            <AppDialogTransfer
                id="ringtone-menu"
                keepMounted
                open={openDiaLog}
                onClose={closeDialogSetting}
                apply={onBtnApply}
                columns={columnDefs}
            />
        </div>
    );
};

export default AppAgGrid;
