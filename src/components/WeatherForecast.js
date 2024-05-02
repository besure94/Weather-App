import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import getWeather from '../api-call/weather-api-call';

function WeatherForecast() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    async function getWeatherApiData() {
      setError(null);
      const result = await getWeather(city);
      if (result instanceof Error) {
        setError(result.message);
        setIsLoaded(false);
        return;
      }
      setWeatherForecast(result.list);
      setIsLoaded(true);
    }

    if (city) {
      getWeatherApiData(city);
    }
  }, [city]);

  const handleFormSubmission = (formInput) => {
    const { city } = formInput;
    setCity(city);
  }

  return (
    <div>
      <h1>Get Weather Forecasts From Anywhere!</h1>
      <br/>
      <SearchForm onFormSubmission={handleFormSubmission}/>
      {error && <h2>Error: {error}</h2>}
      {isLoaded && (
        <React.Fragment>
          <br/>
          <h2>Five Day Forecast for {city}</h2>
          <p>Each day contains the forecast in 3 hour steps.</p>
          <br/>
          <hr/>
          {weatherForecast.map((forecast, index) =>
            <div key={index}>
              <h3>Date: {forecast.dt_txt}</h3>
              <p>Temperature: {forecast.main.temp} degrees Fahrenheit / {((forecast.main.temp - 32) / 1.8).toFixed(2)} degrees Celsius</p>
              <p>Humidity: {forecast.main.humidity}%</p>
              <p>Feels like: {forecast.main.feels_like} degrees</p>
              <p>Description: {forecast.weather[0].description}</p>
              <p>Wind speed: {forecast.wind.speed} mph / {(forecast.wind.speed * 1.609).toFixed(2)} kph</p>
              <hr/>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  )
}

export default WeatherForecast;