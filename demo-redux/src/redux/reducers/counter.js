import { ACTION_TYPE } from "../types";
const initialState = {
  count: 0,
};

const counterReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case ACTION_TYPE.INCREMENT: {
      state.count += payload;
      return { ...state };
    }

    case ACTION_TYPE.DECREMENT: {
      state.count -= payload;
      return { ...state };
    }

    default:
      return state;
  }
};

export default counterReducer;
