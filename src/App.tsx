import React, { useState, useEffect } from 'react';
import WeatherForm from './Component/WeatherForm';
import Weather from './Component/Weather';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherData } from './Store/WeatherSlice';
import { fetchlocationWeatherData } from './Store/WeatherSlice';
import { STATUSES } from './Store/WeatherSlice';
interface SearchHistoryItem {
  city: string;
  timestamp: number;
}



const App: React.FC = () => {

  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [allCities, setAllCities] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { weatherData: weatherDetails, status1 } = useSelector((state) => state.weather);
  const { weatherLocationData: currentWeatherDetails, status2 } = useSelector((state) => state.weather)
  console.log("currentWeatherDetails", currentWeatherDetails)
  const [currweather, setCurrWeather] = useState("")


  const fetchWeatherDataLocal = async (city: string, unit: string): Promise<void> => {
    setAllCities(prevCities => [...prevCities, city]);
    try {

      await dispatch(fetchWeatherData({ city, unit }));
    } catch (err) {
      console.log(err)
    }
  };


  const handleCurrentLocation = async (
    latitude: number,
    longitude: number
  ): Promise<void> => {

    try {
      await dispatch(fetchlocationWeatherData({ latitude, longitude }));
      setCurrWeather(currentWeatherDetails?.name || "")
    } catch (err) {
      console.log(err)
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
  if (status1 === STATUSES.LOADING) {
    return (
      <div className="loading">Loading...</div>
    )
  }
  if (status1 === STATUSES.ERROR) {
    <div className="loading">Error...</div>
  }
  return (
    <div className="container">
      <h1>Weather App</h1>
      <WeatherForm onSearch={fetchWeatherDataLocal} onCurrentLocation={handleCurrentLocation} />
      {currentWeatherDetails && (
        <div>
          <Weather className="Weather" weatherData={currentWeatherDetails} />
          <p>{currentWeatherDetails.name}</p>
        </div>
      )}
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
