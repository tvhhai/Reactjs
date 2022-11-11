import {combineReducers} from "redux";

import phone from "../feature/Phone/PhoneSlice";
import appAgGridSlice from "../component/common/AgGrid/AppAgGridSlice";

const rootReducer = combineReducers({
    phone,
    appAgGridSlice,
});

export const getLoading = (state: any) => state.globalSlice.isLoading;

export default rootReducer;
