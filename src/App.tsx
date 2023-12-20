import React, { useState, useEffect } from 'react';
import WeatherForm from './Component/WeatherForm';
import Weather from './Component/Weather';
import './App.css';
import { useGetWeatherDataQuery } from './Store/WeatherQuery';
import { useGetCurrentLocationDataQuery } from './Store/WeatherQuery';
interface SearchHistoryItem {
  city: string;
  timestamp: number;
}


const App: React.FC = () => {

  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [allCities, setAllCities] = useState<string[]>([]);
  const [currweather, setCurrWeather] = useState("")
  const [city, setCity] = useState("London")
  const [unit, setUnit] = useState("metric")
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const { data: weatherData, isLoading, isError, error } = useGetWeatherDataQuery({ city, unit })
  const { data: currentLocationData } = useGetCurrentLocationDataQuery({ latitude, longitude })




  const fetchWeatherDataLocal = (city: string, unit: string) => {
    setAllCities(prevCities => [...prevCities, city]);
    setCity(city)
    setUnit(unit)

  };


  const handleCurrentLocation = (
    latitude: number,
    longitude: number
  ) => {
    setLatitude(latitude)
    setLongitude(longitude)


  };


  useEffect(() => {
    fetchWeatherDataLocal('London', 'metric');
  }, []);

  useEffect(() => {

    if (weatherData) {
      const { name: city } = weatherData
      setSearchHistory((prevHistory) => [...prevHistory, { city, timestamp: Date.now() }]);
    }
  }, ["weatherDetails"]);
  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }
  // if (isError) {
  //   return (
  //     <div>Something went wrong...</div>
  //   )
  // }
  return (
    <div className="container">
      {/* <h1>Weather App</h1>
      <WeatherForm onSearch={fetchWeatherDataLocal} onCurrentLocation={handleCurrentLocation} />
      {currentLocationData && (
        <div>
          <Weather className="Weather" weatherData={currentLocationData} />
          <p>{currentLocationData.name}</p>
        </div>
      )}
      <Weather className="Weather" weatherData={weatherData} />
      <h2>Search History</h2>
      <ul>
        {allCities.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul> */}
      {isError ? <div>Something went wrong...</div> : <div>
        <WeatherForm onSearch={fetchWeatherDataLocal} onCurrentLocation={handleCurrentLocation} />
        {currentLocationData && (
          <div>
            <Weather className="Weather" weatherData={currentLocationData} />
            <p>{currentLocationData.name}</p>
          </div>
        )}
        <Weather className="Weather" weatherData={weatherData} />
        <h2>Search History</h2>
        <ul>
          {allCities.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>}
    </div>
  );
};

export default App;





