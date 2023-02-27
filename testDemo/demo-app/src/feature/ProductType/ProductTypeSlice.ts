import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IProductTypeState} from "../../model/IProductType";
import NotificationUtils from "../../component/common/Notification/Notification";
import {IProductType} from "../../model/IProductType";
import {
    addProductTypeService,
    deleteProductTypeService, editProductTypeService,
    getListProductTypeService, getProductTypeByIdService
} from "../../service/productTypeService";

const initialState: IProductTypeState = {
    isLoading: true,
    listProductType: [],
    productTypeId: "",
    actionState: {},
    getProductTypeDetail: {},
    error: '',
}

const productTypeSlice = createSlice({
    name: 'productTypeSlice',
    initialState,
    reducers: {
        setActionState: (state, action) => {
            state.actionState = action.payload
        },
        setProductTypeId: (state, action) => {
            state.productTypeId = action.payload
        },
        resetActionState: (state) => {
            state.actionState = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getListProductType.pending, (state) => {
            state.isLoading = true;
            state.listProductType = [];
        }).addCase(getListProductType.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listProductType = action.payload;
        }).addCase(getListProductType.rejected, (state, action) => {
            state.isLoading = false;
            console.log('rejected', action.payload)
        })
            // Add
        .addCase(addProductType.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(addProductType.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listProductType = [...state.listProductType, action.payload];
        }).addCase(addProductType.rejected, (state, action) => {
            state.isLoading = false;
            console.log('rejected', action.payload)
        })
    }
});

export const getListProductType = createAsyncThunk(
    "productType/getListProductType",
    async () => {
        try {
            return await getListProductTypeService().then((res) => {
                NotificationUtils.success('Get Product Type successfully!');
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

export const addProductType = createAsyncThunk(
    "productType/addProductType",
    async (data: IProductType) => {
        try {
            const response = await addProductTypeService(data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);

export const deleteProductType = createAsyncThunk(
    "productType/deleteProductType",
    async (id: number) => {
        try {
            const response = await deleteProductTypeService(id);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);

export const getProductTypeById = createAsyncThunk(
    "productType/getProductTypeById",
    async (id: number) => {
        try {
            const response = await getProductTypeByIdService(id);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);

export const editProductType = createAsyncThunk(
    "productType/editProductType",
    async ({id, value}: { id: any, value: IProductType }) => {
        try {
            const response = await editProductTypeService(id, value);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);

export const getProductType = (state: any) => state.productTypeSlice
export const {setActionState, setProductTypeId,resetActionState} = productTypeSlice.actions
export default productTypeSlice.reducer