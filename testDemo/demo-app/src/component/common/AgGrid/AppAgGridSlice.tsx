import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getTableConfigService, saveTableConfigService, updateTableConfigService} from "../../../service/agGridService";
import _ from "lodash";

const appAgGridSlice = createSlice({
    name: 'appAgGrid',
    initialState: {
        isLoading: true,
        tableConfig: {
            showColumns: [],
            hiddenColumns: []
        },

    },

    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTableConfig.pending, (state) => {
            state.isLoading = true;
        }).addCase(getTableConfig.fulfilled, (state, action) => {
            state.tableConfig.showColumns = _.get(action, 'payload.tableConfig[0].showColumns', []);
            state.tableConfig.hiddenColumns = _.get(action, 'payload.tableConfig[0].hiddenColumns', []);
            state.isLoading = false;
        }).addCase(getTableConfig.rejected, (state, action) => {
            state.isLoading = false;
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
export const {} = appAgGridSlice.actions
export default appAgGridSlice.reducer