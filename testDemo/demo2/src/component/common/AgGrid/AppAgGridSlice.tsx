import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import NotificationUtils from "../Notification/Notification";
import {getTableConfigService, saveTableConfigService, updateTableConfigService} from "../../../service/agGridService";
import _ from "lodash";

const appAgGridSlice = createSlice({
    name: 'appAgGrid',
    initialState: {
        tableConfig: {
            columns: [],
            hideColumns: []
        },
        cancel: false
    },

    reducers: {
        saveColumns(state, action) {
            state.tableConfig.columns = action.payload
        },
        saveHideColumns(state, action) {
            state.tableConfig.hideColumns = action.payload
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
            state.tableConfig.columns = _.get(action, 'payload[0].configJson[0].columns', []);
            state.tableConfig.hideColumns = _.get(action, 'payload[0].configJson[0].hideColumns', []);
            console.log(_.get(action, 'payload[0].configJson[0].columns', []), _.get(action, 'payload[0].configJson[0].hideColumns', []))
        }).addCase(getTableConfig.rejected, (state, action) => {

        }).addCase(saveTableConfig.pending, (state) => {

        }).addCase(saveTableConfig.fulfilled, (state, action) => {
            console.log(action.payload)
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