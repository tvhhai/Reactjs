import { createAction } from "./";
import { ACTION_TYPE } from "../types";

export const increment = (number) => {
  return (dispatch) => {
    dispatch(createAction(ACTION_TYPE.INCREMENT, number));
  };
};

export const decrement = (number) => {
  return (dispatch) => {
    dispatch(createAction(ACTION_TYPE.DECREMENT, number));
  };
};
