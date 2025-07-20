import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import './App.css';
import ForecastCard from './components/ForecastCard';
import ForecastChart from './components/ForecastChart';




const API_KEY = '72cd05420fd0d67fc87adfe53684f913';  // replace with your actual key

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);


  useEffect(() => {
    fetchWeather('Ottawa');
  }, []);



  const fetchWeather = async (city) => {
    setError('');
    city = city.trim();
  
    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
  
      if (!weatherResponse.ok) {
        throw new Error('City not found');
      }
  
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);
  
      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
  
      if (!forecastResponse.ok) {
        throw new Error('Forecast not found');
      }
  
      const forecastData = await forecastResponse.json();
  
      // Filter forecast data to once per day (e.g. 12:00)
      const dailyForecasts = forecastData.list.filter(item =>
        item.dt_txt.includes("12:00:00")
      ).map(item => ({
        date: item.dt_txt.split(' ')[0],
        temp: item.main.temp,
        description: item.weather[0].description,
        icon: item.weather[0].icon
      }));
  
      setForecast(dailyForecasts);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
    }
  };
  
  

  return (
<div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className="text-xl text-b dark: text-white">Weather Dashboard</div>
      <button onClick={() => setDarkMode(!darkMode)} className="toggle-button">
        Switch to {darkMode ? 'Light' : 'Dark'} Mode
      </button>

      <SearchBar onSearch={fetchWeather} />
      {error && <p className="error">{error}</p>}
      <WeatherCard weather={weather} />

      {forecast.length > 0 && (
        <div className="forecast-container">
          {forecast.map((item, index) => (
            <ForecastCard key={index} forecast={item} />
          ))}
        </div>
      )}



    </div>
  );
}

export default App;
