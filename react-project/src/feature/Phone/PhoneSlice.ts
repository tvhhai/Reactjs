import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    addPhonesService,
    deletePhoneService,
    editPhoneService,
    fetchCurrentListPhone,
    getPhoneByIdService
} from "../../service/phoneService";
import {IPhone, PhoneState} from "../../model/IPhone";
import NotificationUtils from "../../component/common/Notification/Notification";

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
        resetActionState: (state) => {
            state.actionState = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getListPhone.pending, (state) => {
            state.isLoading = true;
            // dispatch(setter(true))
            // console.log(dispatch)
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
        }).addCase(deletePhone.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listPhone = [...state.listPhone].filter((val: any) => val.id !== action.payload.id);
        }).addCase(deletePhone.rejected, (state, action) => {
            state.isLoading = false;
            // state.error = action.error.message;
            console.log('rejected', action.payload)
        }).addCase(getPhoneById.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getPhoneById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.getPhoneDetail = action.payload;
        }).addCase(getPhoneById.rejected, (state, action) => {
            state.isLoading = false;
            // state.error = action.error.message;
            console.log('rejected', action.payload)
        }).addCase(editPhone.pending, (state, action) => {
            state.isLoading = true;
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
            // const response = await fetchCurrentListPhone();
            // return response.data;

            return await fetchCurrentListPhone().then((res) => {
                NotificationUtils.success('Get phone successfully!');
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
export const {setActionState, resetActionState, setPhoneId} = phone.actions
export default phone.reducer