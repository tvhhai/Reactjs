import {combineReducers} from "redux";

import counter from "./counter";
// import weather from "../../feature/Weather/WeatherSlice";
import phone from "../../feature/Phone/PhoneSlice";

import {createSlice} from "@reduxjs/toolkit";
import appAgGridSlice from "../../component/common/AgGrid/AppAgGridSlice";


const globalSlice = createSlice({
    name: 'globalSlice',
    initialState: {
        isLoading: true,
    },
    reducers: {
        getter(state) {
            return state;
        },
        setter(state, action: any) {
            return state.isLoading = action;
        }
    },
});

const rootReducer = combineReducers({
    counter,
    // weather,
    phone,
    appAgGridSlice,
    globalSlice: globalSlice.reducer
});
export const getLoading = (state: any) => state.globalSlice.isLoading
export default rootReducer;
