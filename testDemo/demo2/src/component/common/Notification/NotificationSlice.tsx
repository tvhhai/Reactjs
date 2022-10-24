
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {VariantType} from "notistack";

export interface NotificationState {
    open?: boolean;
    type?: VariantType;
    message?: string;
    timeout?: number | null;
}

export const notificationInitialState: NotificationState = {
    open: false,
    type: "info",
    message: "",
    timeout: 5000
};


export const NotificationSlice = createSlice({
    name: "notification",
    initialState: notificationInitialState,
    reducers: {
        showNotification: (_state, action: PayloadAction<NotificationState>) => {
            console.log(_state, action)
            return{
            ...notificationInitialState,
            ...action.payload,
            open: true
        }},
    },
});

export const getAlert = (state: any) => state.notification
export const {showNotification} = NotificationSlice.actions;

export const notification = NotificationSlice.reducer;