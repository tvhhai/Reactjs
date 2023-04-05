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
import i18n from "i18next";

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
            // Get Product by id
        .addCase(getProductById.pending, (state) => {
            state.isLoading = true;
        }).addCase(getProductById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.getProductDetail = action.payload;
        }).addCase(getProductById.rejected, (state, action) => {
            state.isLoading = false;
            console.log('rejected', action.payload)
        })
            // Edit Product by id
        .addCase(editProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(editProduct.fulfilled, (state, action) => {
            state.isLoading = false;
        }).addCase(editProduct.rejected, (state, action) => {
            state.isLoading = false;
            console.log('rejected', action.payload)
        })
            // Delete
        .addCase(deleteProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listProduct = [...state.listProduct].filter((value: any) => !action.payload.includes(value.id));
            NotificationUtils.success(i18n.t('common.msg.deleteSuccess'));
        }).addCase(deleteProduct.rejected, (state, action) => {
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
    async (id: string[]) => {
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