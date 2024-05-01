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
      <SearchForm onFormSubmission={handleFormSubmission}/>
      {error && <h2>Error: {error}</h2>}
      {isLoaded && (
        <React.Fragment>
          <h2>Five Day Forecast for {city}</h2>
          <p>Each day contains the forecast in 3 hour steps.</p>
          {weatherForecast.map((forecast, index) =>
            <div key={index}>
              <h3>Date: {forecast.dt_txt}</h3>
              <p>Temperature: {forecast.main.temp} degrees</p>
              <p>Description: {forecast.weather[0].description}</p>
              <hr/>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  )
}

export default WeatherForecast;