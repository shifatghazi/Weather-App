import React from 'react';

export default function ForecastCard({ forecast }) {
  return (
    <div className="forecast-card">
      <h4>{forecast.date}</h4>
      <img
        src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
        alt={forecast.description}
      />
      <p>{forecast.temp}°C</p>
      <p>{forecast.description.charAt(0).toUpperCase() + forecast.description.slice(1)}</p>
    </div>
  );
}
