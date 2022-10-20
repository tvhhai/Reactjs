import { createAction } from "./";
import { ACTION_TYPE } from "../type";

export const increment = (number:number) => {
  return (dispatch:any) => {
    dispatch(createAction(ACTION_TYPE.INCREMENT, number));
  };
};

export const decrement = (number:number) => {
  return (dispatch:any) => {
    dispatch(createAction(ACTION_TYPE.DECREMENT, number));
  };
};