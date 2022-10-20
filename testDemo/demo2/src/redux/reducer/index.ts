import {combineReducers} from "redux";

import counter from "./counter";
import weather from "./WeatherSlice";
import {createSlice} from "@reduxjs/toolkit";


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
    weather,
    globalSlice: globalSlice.reducer
});
export const getLoading = (state: any) => state.globalSlice.isLoading
export default rootReducer;
