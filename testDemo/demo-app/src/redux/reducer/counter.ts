// import { ACTION_TYPE } from "../type";
// const initialState = {
//   count: 0,
// };
//
// const counterReducer = (state = initialState, action) => {
//   let { type, payload } = action;
//   switch (type) {
//     case ACTION_TYPE.INCREMENT: {
//       state.count += 1;
//       return { ...state };
//     }
//
//     case ACTION_TYPE.DECREMENT: {
//       state.count -= 1;
//       return { ...state };
//     }
//
//     default:
//       return state;
//   }
// };
//
// export default counterReducer;


import {createSlice} from '@reduxjs/toolkit'

const counterSlice = createSlice({
    name: 'counter',
    initialState: {count: 0},
    reducers: {
        increment(state, action) {
            state.count += 1
        },
        decrement(state, action) {
            state.count -= 1
        }
    }
})

export const {increment, decrement} = counterSlice.actions
export const selectCount = (state:any) => state.counter.count
export default counterSlice.reducer