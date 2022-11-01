import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {
    fetchCurrentListPhone,
    addPhonesService,
    deletePhoneService,
    getPhoneByIdService, editPhoneService
} from "../../service/phoneService";
import {IPhone, PhoneState} from "../../model/IPhone";


const initialState: PhoneState = {
    isLoading: true,
    phoneId: null,
    listPhone: [],
    actionState: {},
    getPhoneDetail: {},
    error: '',
}

const phone = createSlice({
    name: 'phone',
    initialState,
    reducers: {
        setActionState: (state, action) => {
            state.actionState = action.payload
        },
        setPhoneId: (state, action) => {
            state.phoneId = action.payload
        },
        resetState: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(getListPhone.pending, (state) => {
            state.isLoading = true;
            state.listPhone = [];
        }).addCase(getListPhone.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listPhone = action.payload;
        }).addCase(getListPhone.rejected, (state, action) => {
            state.isLoading = false;
            console.log('rejected', action.payload)
            // state.error = action.error.message;
        }).addCase(addPhone.pending, (state, action) => {
            state.isLoading = true;
            state.listPhone = [];
        }).addCase(addPhone.fulfilled, (state, action) => {
            state.isLoading = false;
            // @ts-ignore
            state.listPhone = [...state.listPhone, action.payload];
        }).addCase(addPhone.rejected, (state, action) => {
            state.isLoading = false;
            console.log('rejected', action.payload)
            // state.error = action.error.message;
        }).addCase(deletePhone.pending, (state, action) => {
            state.isLoading = true;
            state.listPhone = [];
        }).addCase(deletePhone.fulfilled, (state, action) => {
            state.isLoading = false;
        }).addCase(deletePhone.rejected, (state, action) => {
            state.isLoading = false;
            // state.error = action.error.message;
            console.log('rejected', action.payload)
        }).addCase(getPhoneById.pending, (state, action) => {
            state.isLoading = true;
            state.listPhone = [];
        }).addCase(getPhoneById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.getPhoneDetail = action.payload;
        }).addCase(getPhoneById.rejected, (state, action) => {
            state.isLoading = false;
            // state.error = action.error.message;
            console.log('rejected', action.payload)
        }).addCase(editPhone.pending, (state, action) => {
            state.isLoading = true;
            state.listPhone = [];
        }).addCase(editPhone.fulfilled, (state, action) => {
            state.isLoading = false;
        }).addCase(editPhone.rejected, (state, action) => {
            state.isLoading = false;
            console.log('rejected', action.payload)
            // state.error = action.error.message;
        })
        //     .addDefaultCase((state, action) => {
        //     console.log(state, action, action.payload)
        // })

    }
});


export const getListPhone = createAsyncThunk(
    "phone/getListPhone",
    async () => {
        try {
            const response = await fetchCurrentListPhone();
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);
export const addPhone = createAsyncThunk(
    "phone/addPhone",
    async (data: IPhone) => {
        try {
            const response = await addPhonesService(data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);

export const deletePhone = createAsyncThunk(
    "phone/deletePhone",
    async (id: number) => {
        try {
            const response = await deletePhoneService(id);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);

export const getPhoneById = createAsyncThunk(
    "phone/getPhoneById",
    async (id: number) => {
        try {
            const response = await getPhoneByIdService(id);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);

export const editPhone = createAsyncThunk(
    "phone/editPhone",
    async ({id, value}: { id: any, value: IPhone }) => {
        try {
            const response = await editPhoneService(id, value);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);


export const getPhone = (state: any) => state.phone
export const {setActionState, resetState, setPhoneId} = phone.actions
export default phone.reducer