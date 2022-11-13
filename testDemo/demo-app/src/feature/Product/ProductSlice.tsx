import React from 'react';
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ProductState} from "../../model/IProduct";
import NotificationUtils from "../../component/common/Notification/Notification";
import {fetchListProduct} from "../../service/productService";

const initialState: ProductState = {
    isLoading: true,
    productId: '',
    listProduct: [],
    actionState: {},
    getProductDetail: {},
    error: '',
}

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getListProduct.pending, (state) => {
            state.isLoading = true;
            state.listProduct = [];
        }).addCase(getListProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action.payload)
            state.listProduct = action.payload;
        }).addCase(getListProduct.rejected, (state, action) => {
            state.isLoading = false;
            console.log('rejected', action.payload)
        })
    }
})

export const getListProduct = createAsyncThunk(
    "product/getProduct",
    async () => {
        try {
            return await fetchListProduct().then((res) => {
                NotificationUtils.success('Get Product successfully!');
                return res.data
            }).catch((err) => {
                NotificationUtils.error(err);
                console.log(err)
            })
        } catch (error) {
            console.error(error);
        }
    }
);

export const getProduct = (state: any) => state.productSlice
export const {} = productSlice.actions
export default productSlice.reducer