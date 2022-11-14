import {combineReducers} from "redux";

import phone from "../feature/Phone/PhoneSlice";
import appAgGridSlice from "../component/common/AgGrid/AppAgGridSlice";
import productSlice from "../feature/Product/ProductSlice";
import productTypeSlice from "../feature/ProductType/ProductTypeSlice"

const rootReducer = combineReducers({
    phone,
    appAgGridSlice,
    productSlice,
    productTypeSlice,
});

export default rootReducer;
