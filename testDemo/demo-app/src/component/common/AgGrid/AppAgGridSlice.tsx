import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import NotificationUtils from "../Notification/Notification";
import {getTableConfigService, saveTableConfigService, updateTableConfigService} from "../../../service/agGridService";
import _ from "lodash";

const appAgGridSlice = createSlice({
    name: 'appAgGrid',
    initialState: {
        tableConfig: {
            showColumns: [],
            hiddenColumns: []
        },
        cancel: false
    },

    reducers: {
        saveColumns(state, action) {
            state.tableConfig.showColumns = action.payload
        },
        saveHideColumns(state, action) {
            state.tableConfig.hiddenColumns = action.payload
        },
        setCancel(state, action) {
            state.cancel = action.payload
        },
        resetCancel(state, action) {
            state.cancel = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTableConfig.pending, (state) => {

        }).addCase(getTableConfig.fulfilled, (state, action) => {
            state.tableConfig.showColumns = _.get(action, 'payload.tableConfig[0].showColumns', []);
            state.tableConfig.hiddenColumns = _.get(action, 'payload.tableConfig[0].hiddenColumns', []);
        }).addCase(getTableConfig.rejected, (state, action) => {

        }).addCase(saveTableConfig.pending, (state) => {

        }).addCase(saveTableConfig.fulfilled, (state, action) => {
            state.tableConfig.showColumns = _.get(action, 'payload.tableConfig[0].showColumns', []);
            state.tableConfig.hiddenColumns = _.get(action, 'payload.tableConfig[0].hiddenColumns', []);
        }).addCase(saveTableConfig.rejected, (state, action) => {

        }).addCase(updateTableConfig.pending, (state) => {

        }).addCase(updateTableConfig.fulfilled, (state, action) => {
            console.log(action.payload)
        }).addCase(updateTableConfig.rejected, (state, action) => {

        })
    }
});

export const getTableConfig = createAsyncThunk(
    "appAgGrid/getTableConfig",
    (tableId: string) => {
        return getTableConfigService(tableId)
            .then((res) => {
                return res.data
            }).catch((err) => {
                console.log(err)
            })
    }
);
export const saveTableConfig = createAsyncThunk(
    "appAgGrid/saveTableConfig",
    async (data: object) => {
        return await saveTableConfigService(data)
            .then((res) => {
                return res.data
            }).catch((err) => {
                console.log(err)
            })

    }
);

export const updateTableConfig = createAsyncThunk(
    "appAgGrid/updateTableConfig",
    async (tableData: any) => {
        console.log(tableData)
        const {gridName, tableConfig} = tableData
        return await updateTableConfigService(gridName, tableConfig)
            .then((res) => {
                return res.data
            }).catch((err) => {
                console.log(err)
            })

    }
);

export const getStateAg = (state: any) => state.appAgGridSlice
export const {saveColumns, saveHideColumns, setCancel} = appAgGridSlice.actions
export default appAgGridSlice.reducer