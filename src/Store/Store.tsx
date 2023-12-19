import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./WeatherSlice"
import locationDataReducer from "./CurrentWeatherSlice"
const store = configureStore({
    reducer: {
        weather: weatherReducer,
        weatherByLocation: locationDataReducer

    }
})
export default store