

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherForm from './Component/WeatherForm';
import Weather from './Component/Weather';
import './App.css';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };

}

interface SearchHistoryItem {
  city: string;
  timestamp: number;
}

const API_KEY = '6a339fc42c59d15624f1a364c4b797ac';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  const fetchWeatherData = async (city: string, unit: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
      );

      setWeatherData(response.data);
      updateSearchHistory(city);
    } catch (err) {
      setError('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  const updateSearchHistory = (city: string): void => {
    const updatedHistory: SearchHistoryItem[] = [
      ...searchHistory,
      { city, timestamp: Date.now() }
    ];
    setSearchHistory(updatedHistory);

  };

  const handleCurrentLocation = async (latitude: number, longitude: number): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      setWeatherData(response.data);

      updateSearchHistory(`Current Location (${latitude}, ${longitude})`);
    } catch (err) {
      setError('Error fetching weather data for current location');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData('London', 'metric');
  }, []);

  return (
    <div className="container">
      <h1>Weather App</h1>
      <WeatherForm onSearch={fetchWeatherData} onCurrentLocation={handleCurrentLocation} />
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      <Weather className="Weather" weatherData={weatherData} />
      <h2>Search History</h2>
      <ul>
        {searchHistory.map((item, index) => (
          <li key={index}>{item.city}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
