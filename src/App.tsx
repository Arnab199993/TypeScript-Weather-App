

import React, { useState, useEffect } from 'react';
import WeatherForm from './Component/WeatherForm';
import Weather from './Component/Weather';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherData } from './Store/WeatherSlice';
import { fetchlocationWeatherData } from './Store/CurrentWeatherSlice';

interface SearchHistoryItem {
  city: string;
  timestamp: number;
}

interface WeatherDetails {
  name: string;

}

interface RootState {
  weather: {
    data: WeatherDetails | null;
  };

}

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [allCities, setAllCities] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { data: weatherDetails } = useSelector((state) => state.weather);
  const { data: currentWeatherDetails } = useSelector((state) => state.weatherByLocation)
  const [currweather, setCurrWeather] = useState("")


  const fetchWeatherDataLocal = async (city: string, unit: string): Promise<void> => {
    setAllCities(prevCities => [...prevCities, city]);
    try {
      setLoading(true);
      setError(null);
      await dispatch(fetchWeatherData({ city, unit }));
    } catch (err) {
      setError('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentLocation = async (
    latitude: number,
    longitude: number
  ): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await dispatch(fetchlocationWeatherData({ latitude, longitude }));
      setCurrWeather(currentWeatherDetails?.name)
    } catch (err) {
      setError('Error fetching weather data for current location');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherDataLocal('London', 'metric');
  }, [dispatch]);

  useEffect(() => {
    console.log("weatherDetails", weatherDetails);
    if (weatherDetails) {
      const { name: city } = weatherDetails;
      setSearchHistory((prevHistory) => [...prevHistory, { city, timestamp: Date.now() }]);
    }
  }, [weatherDetails]);

  return (
    <div className="container">
      <h1>Weather App</h1>
      <WeatherForm onSearch={fetchWeatherDataLocal} onCurrentLocation={handleCurrentLocation} />
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      <Weather className="Weather" weatherData={weatherDetails} />
      <h2>Search History</h2>
      <ul>
        {allCities.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

    </div>
  );
};

export default App;
