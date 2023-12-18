
import React from 'react';

interface WeatherProps {
    weatherData: any;
    className?: string;
}

const Weather: React.FC<WeatherProps> = ({ weatherData, className }) => {
    if (!weatherData) {
        return null;
    }

    return (
        <div className={className}>
            <h2>Weather Information</h2>
            <p>Location: {weatherData.name}</p>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Min Temperature: {weatherData.main.temp_min}°C</p>
            <p>Max Temperature: {weatherData.main.temp_max}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
    );
};

export default Weather;