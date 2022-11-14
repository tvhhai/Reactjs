import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ProductState} from "../../model/IProduct";
import NotificationUtils from "../../component/common/Notification/Notification";
import {getListProductService} from "../../service/productService";
import {
    addProductService,
    deleteProductService,
    editProductService,
    getProductByIdService
} from "../../service/productService";
import {IProduct} from "../../model/IProduct";

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
    reducers: {
        setActionState: (state, action) => {
            state.actionState = action.payload
        },
        setProductId: (state, action) => {
            state.productId = action.payload
        },
        resetActionState: (state) => {
            state.actionState = {}
        }
    },
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
        // Add
        .addCase(addProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(addProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listProduct = [...state.listProduct, action.payload];
        }).addCase(addProduct.rejected, (state, action) => {
            state.isLoading = false;
            console.log('rejected', action.payload)
        })
    }
})

export const getListProduct = createAsyncThunk(
    "product/getProduct",
    async () => {
        try {
            return await getListProductService().then((res) => {
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

export const addProduct = createAsyncThunk(
    "product/addProduct",
    async (data: any) => {
        try {
            const response = await addProductService(data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (id: number) => {
        try {
            const response = await deleteProductService(id);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);

export const getProductById = createAsyncThunk(
    "product/getProductById",
    async (id: number) => {
        try {
            const response = await getProductByIdService(id);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);

export const editProduct = createAsyncThunk(
    "product/editProduct",
    async ({id, value}: { id: any, value: IProduct }) => {
        try {
            const response = await editProductService(id, value);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);

export const getProduct = (state: any) => state.productSlice
export const {setActionState, resetActionState, setProductId} = productSlice.actions
export default productSlice.reducer