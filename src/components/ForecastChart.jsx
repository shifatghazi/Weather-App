import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

export default function ForecastChart({ data }) {
  // Only show if there's valid forecast data
  if (!Array.isArray(data) || data.length === 0) {
    return;
  }

  const cleanedData = data.filter(item => item.date && typeof item.temp === 'number');

  if (cleanedData.length === 0) {
    return;
  }

  return (
    <div className="forecast-chart">
      <h3>5-Day Temperature Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={cleanedData}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis unit="°C" />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#007BFF" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
