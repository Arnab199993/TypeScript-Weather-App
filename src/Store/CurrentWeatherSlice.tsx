

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
    data: any[] | null;
}

const initialState: WeatherState = {
    status: STATUSES.IDLE,
    data: [],
};

export const fetchlocationWeatherData = createAsyncThunk("weather/fetch", async (params: { latitude: string, longitude: string }) => {
    try {
        const { latitude, longitude } = params;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
});

const locationDataSlice = createSlice({
    name: "weatherByLocation",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchlocationWeatherData.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchlocationWeatherData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchlocationWeatherData.rejected, (state) => {
                state.status = STATUSES.ERROR;
            });
    },
});

export default locationDataSlice.reducer;
