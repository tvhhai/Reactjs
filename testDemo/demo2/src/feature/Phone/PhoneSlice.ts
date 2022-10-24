import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {fetchCurrentListPhone, addPhones} from "../../service/PhoneService";

const phone = createSlice({
    name: 'phone',
    initialState: {
        isLoading: true,
        listPhone: [],
    },
    reducers: {
        get(state, action) {
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getListPhone.pending, (state, action) => {
            state.isLoading = true;
            state.listPhone = [];
        }).addCase(getListPhone.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listPhone = action.payload;
        }).addCase(getListPhone.rejected, (state, action) => {
            state.isLoading = false;
            // state.error = action.error.message;
        }).addCase(addPhone.pending, (state, action) => {
            state.isLoading = true;
            state.listPhone = [];
        }).addCase(addPhone.fulfilled, (state, action) => {
            state.isLoading = false;
            // @ts-ignore
            state.listPhone = [...state.listPhone, action.payload];
            // const dispatch = useDispatch<any>();
            //
            // dispatch(addNotification({ message: "This is the default notification" }))
        }).addCase(addPhone.rejected, (state, action) => {
            state.isLoading = false;
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
    async (data:any) => {
        try {
            const response = await addPhones(data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);



export const getPhone = (state: any) => state.phone
export const {get} = phone.actions
export default phone.reducer