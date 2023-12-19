import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = '6a339fc42c59d15624f1a364c4b797ac';

export enum STATUSES {
    LOADING = "loading",
    IDLE = 'idle',
    ERROR = "error"
}

interface WeatherState {
    status1: STATUSES;
    weatherData: any[] | null;
    status2: STATUSES;
    weatherLocationData: any[] | null;
}

const initialState: WeatherState = {
    status1: STATUSES.IDLE,
    weatherData: [],
    status2: STATUSES.IDLE,
    weatherLocationData: [],
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
export const fetchlocationWeatherData = createAsyncThunk("localWeather/fetch", async (params: { latitude: string, longitude: string }) => {
    try {
        const { latitude, longitude } = params;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
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
                state.status1 = STATUSES.LOADING;
            })
            .addCase(fetchWeatherData.fulfilled, (state, action) => {
                state.weatherData = action.payload;
                state.status1 = STATUSES.IDLE;
            })
            .addCase(fetchWeatherData.rejected, (state) => {
                state.status1 = STATUSES.ERROR;
            });
        builder
            .addCase(fetchlocationWeatherData.pending, (state) => {
                state.status2 = STATUSES.LOADING;
            })
            .addCase(fetchlocationWeatherData.fulfilled, (state, action) => {
                state.weatherLocationData = action.payload;
                state.status2 = STATUSES.IDLE;
            })
            .addCase(fetchlocationWeatherData.rejected, (state) => {
                state.status2 = STATUSES.ERROR;
            });
    },
});

export default weatherSlice.reducer;






