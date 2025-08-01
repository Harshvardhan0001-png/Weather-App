import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from './assets/logo.png'; 
import { FaCloudSun, FaFrown, FaSearch } from 'react-icons/fa'; 

function WeatherApp() {
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const toDateFunction = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const WeekDays = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
    ];
    const currentDate = new Date();
    return `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
  };

  const search = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setInput('');
      setWeather({ ...weather, loading: true });

      const url = 'https://api.openweathermap.org/data/2.5/weather';
      const api_key = 'f00c38e0279b7bc85480c3fe775d518c';

      try {
        const res = await axios.get(url, {
          params: {
            q: input,
            units: 'metric',
            appid: api_key,
          },
        });
        setWeather({ data: res.data, loading: false, error: false });
      } catch (err) {
        setWeather({ data: {}, loading: false, error: true });
      }
    }
  };

  return (
    <div className="App">
      <div className="weather-box">
        <img src={logo} alt="App Logo" className="app-logo" />
        <h1 className="app-title">
          <FaCloudSun style={{ marginRight: '10px' }} />
          Weather App
        </h1>

        <div className="search-bar">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Enter City Name..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={search}
            />
          </div>
        </div>

        {weather.loading && <div className="loading">Loading...</div>}

        {weather.error && (
          <div className="error-message">
            <FaFrown color="red" size={20} style={{ marginRight: '8px' }} />
            City not found
          </div>
        )}

        {weather.data && weather.data.main && (
          <div className="weather-info">
            <h2>
              {weather.data.name}, {weather.data.sys.country}
            </h2>
            <div className="date">{toDateFunction()}</div>
            <div className="temp">
              <img
                src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                alt={weather.data.weather[0].description}
              />
              {Math.round(weather.data.main.temp)}°C
            </div>
            <div className="description">{weather.data.weather[0].description.toUpperCase()}</div>
            <div className="wind">Wind Speed: {weather.data.wind.speed} m/s</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;