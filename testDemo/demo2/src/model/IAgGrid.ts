/**
 * @name
 *
 * @description
 *
 * @param {string} title
 * @param {string} gridName
 * @param {object[]} rowData
 * @param {object[]} columnDefs
 * @param {object} defaultColDef
 * @param {boolean} loading Loading overlay
 * @param {func} onSelectionChanged
 * @param {func} onGridReady
 *
 *
 * @param {string} refresh(option)
 * @param {boolean} searchAll(option)
 * @param {object[]} toolbarLeftAction(option)
 * @param {string} classNameApp(option)
 * @param {boolean} enableFullScreen(option) Use this option when you want to enable fullscreen function
 * @param {boolean} enableTableConfig(option) Use this option when you want to get/set column object from/to backend.
 * @param {boolean} enableSaveColDrag(option) Use this option when you want to enable saving drag and drop columns to backend.
 * @param {number | undefined} paginationPageSize(option)
 * @param {boolean} selectMultiWithCheckbox(option)
 * @param {boolean} selectSingleWithoutCheckbox(option)
 */
import {GridReadyEvent, SelectionChangedEvent} from "ag-grid-community";

export interface IAgGrid {
    title: string;
    gridName: string;
    rowData: object[];
    initialColumnDefs: object[];
    defaultColDef: object;
    loading: boolean;
    onSelectionChanged: (event: SelectionChangedEvent<object>) => void;
    onGridReady: (event: GridReadyEvent<object>) => void;
    //optional
    refresh?: any;
    searchAll?: boolean;
    classNameApp?: string;
    toolbarLeftAction?: object[];
    enableFullScreen?: boolean;
    enableTableConfig?: boolean;
    enableSaveColDrag?: boolean;
    paginationPageSize?: number | undefined;
    selectMultiWithCheckbox?: boolean;
    selectSingleWithoutCheckbox?: boolean;

    // rowSelection?: "single" | "multiple" | undefined;
}