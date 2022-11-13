import {combineReducers} from "redux";

import phone from "../feature/Phone/PhoneSlice";
import appAgGridSlice from "../component/common/AgGrid/AppAgGridSlice";
import productSlice from "../feature/Product/ProductSlice";

const rootReducer = combineReducers({
    phone,
    appAgGridSlice,
    productSlice
});

export default rootReducer;
