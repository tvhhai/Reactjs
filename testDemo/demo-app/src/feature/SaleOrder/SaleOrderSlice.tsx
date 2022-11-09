import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {
    fetchCurrentListSaleOrder,
    addSaleOrderService,
    deleteSaleOrderService,
    getSaleOrderByIdService,
    editSaleOrderService,
} from "../../service/saleOrderService";

const saleOrder = createSlice({
    name: 'saleOrder',
    initialState: {
        isLoading: true,
        listSaleOrder: [],
        getById: {},
        error: '',
    },
    reducers: {
        get(state, action) {
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getListSaleOrder.pending, (state, action) => {
            state.isLoading = true;
            state.listSaleOrder = [];
        }).addCase(getListSaleOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listSaleOrder = action.payload;
        }).addCase(getListSaleOrder.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action.error.message)
            // state.error = action.error.message;
        }).addCase(addSaleOrder.pending, (state, action) => {
            state.isLoading = true;
            state.listSaleOrder = [];
        }).addCase(addSaleOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            // @ts-ignore
            state.listSaleOrder = [...state.listSaleOrder, action.payload];
        }).addCase(addSaleOrder.rejected, (state, action) => {
            state.isLoading = false;
            // state.error = action.error.message;
        }).addCase(deleteSaleOrder.pending, (state, action) => {
            state.isLoading = true;
            state.listSaleOrder = [];
        }).addCase(deleteSaleOrder.fulfilled, (state, action) => {
            state.isLoading = false;
        }).addCase(deleteSaleOrder.rejected, (state, action) => {
            state.isLoading = false;
            // state.error = action.error.message;
        }).addCase(getSaleOrderById.pending, (state, action) => {
            state.isLoading = true;
            state.listSaleOrder = [];
        }).addCase(getSaleOrderById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.getById = action.payload;
        }).addCase(getSaleOrderById.rejected, (state, action) => {
            state.isLoading = false;
            // state.error = action.error.message;
        }).addCase(editSaleOrder.pending, (state, action) => {
            state.isLoading = true;
            state.listSaleOrder = [];
        }).addCase(editSaleOrder.fulfilled, (state, action) => {
            state.isLoading = false;
        }).addCase(editSaleOrder.rejected, (state, action) => {
            state.isLoading = false;
            // state.error = action.error.message;
        })
        //     .addDefaultCase((state, action) => {
        //     console.log(state, action, action.payload)
        // })

    }
});


export const getListSaleOrder = createAsyncThunk(
    "saleOrder/getListSaleOrder",
    async () => {
        try {
            const response = await fetchCurrentListSaleOrder();
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);
export const addSaleOrder = createAsyncThunk(
    "saleOrder/addSaleOrder",
    async (data: object) => {
        try {
            const response = await addSaleOrderService(data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);

export const deleteSaleOrder = createAsyncThunk(
    "saleOrder/deleteSaleOrder",
    async (id: number) => {
        try {
            const response = await deleteSaleOrderService(id);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);

export const getSaleOrderById = createAsyncThunk(
    "saleOrder/getSaleOrderById",
    async (id: number) => {
        try {
            const response = await getSaleOrderByIdService(id);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);

export const editSaleOrder = createAsyncThunk(
    "saleOrder/editSaleOrder",
    async (id: number, data: object) => {
        try {
            const response = await editSaleOrderService(id, data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);


export const getSaleOrder = (state: any) => state.saleOrder
export const {get} = saleOrder.actions
export default saleOrder.reducer