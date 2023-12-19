

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = '6a339fc42c59d15624f1a364c4b797ac';

enum STATUSES {
    LOADING = "loading",
    IDLE = 'idle',
    ERROR = "error"
}

interface WeatherState {
    status: STATUSES;
    data: any[] | null; // Update this to match the actual structure of your data
}

const initialState: WeatherState = {
    status: STATUSES.IDLE,
    data: [],
};

export const fetchWeatherData = createAsyncThunk("weather/fetch", async (params: { city: string, unit: string }) => {
    try {
        const { city, unit } = params;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
});

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherData.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchWeatherData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchWeatherData.rejected, (state) => {
                state.status = STATUSES.ERROR;
            });
    },
});

export default weatherSlice.reducer;




