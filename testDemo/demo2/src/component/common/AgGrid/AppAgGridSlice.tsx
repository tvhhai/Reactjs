import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

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
    }
});


export const getStateAg = (state: any) => state.appAgGridSlice
export const {saveColumns, saveHideColumns, setCancel} = appAgGridSlice.actions
export default appAgGridSlice.reducer