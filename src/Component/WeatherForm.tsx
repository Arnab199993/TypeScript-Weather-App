
import React, { useState } from 'react';
interface WeatherFormProps {
    onSearch: (city: string, unit: string) => void;
    onCurrentLocation: (latitude: number, longitude: number) => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({ onSearch, onCurrentLocation }) => {
    const [city, setCity] = useState('');
    const [unit, setUnit] = useState('metric');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(city, unit);

    };

    const handleCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                onCurrentLocation(latitude, longitude);
            });
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Enter City:
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </label>
            <label>
                Unit:
                <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                    <option value="metric">Metric</option>
                    <option value="imperial">Imperial</option>
                </select>
            </label>
            <button type="submit">Get Weather</button>
            <button style={{ marginTop: "10px" }} type="button" onClick={handleCurrentLocation}>
                Get Current Location
            </button>
        </form>
    );
};

export default WeatherForm;



