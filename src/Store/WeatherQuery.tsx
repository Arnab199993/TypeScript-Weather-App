


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "6a339fc42c59d15624f1a364c4b797ac";

export const WeatherQuery = createApi({
    reducerPath: "weatherQuery",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    endpoints: (builder) => ({
        getWeatherData: builder.query({
            query: ({ city, unit }: { city: string; unit: string }) =>
                `?q=${city}&appid=${API_KEY}&units=${unit}`,
        }),
        getCurrentLocationData: builder.query({
            query: ({ latitude, longitude }: { latitude: number; longitude: number }) =>
                `?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
        }),
    }),
});

export const { useGetWeatherDataQuery, useGetCurrentLocationDataQuery } = WeatherQuery;


