import {combineReducers} from "redux";

import counter from "./counter";

const rootReducer = combineReducers({
    counter,
    // add more reducers here
});

export default rootReducer;
