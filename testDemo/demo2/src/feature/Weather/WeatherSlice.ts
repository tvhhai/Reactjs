import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {fetchCurrentWeather} from "../../service/WeatherService";

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        isLoading: true,
        main: {},
        weather: [0],
        coord: {},
        wind: {},
        clouds: {},
        weatherData: {},
        error: ''
    },
    reducers: {
        get(state, action) {
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getWeather.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getWeather.fulfilled, (state, action) => {
            state.isLoading = false;
            state.weatherData = action.payload;
            console.log(state, action, action.payload)
        }).addCase(getWeather.rejected, (state, action) => {
            state.isLoading = false;
            // state.error = action.error.message;
            console.log(state, action, action.payload)
        })
        //     .addDefaultCase((state, action) => {
        //     console.log(state, action, action.payload)
        // })
    }
});


export const getWeather = createAsyncThunk(
    "weather/getWeather",
    async () => {
        try {
            const response = await fetchCurrentWeather();
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);


export const getState = (state: any) => state.weather
export const {get} = weatherSlice.actions
export default weatherSlice.reducer