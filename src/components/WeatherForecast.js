import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';

function WeatherForecast() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    if (city) {
      getWeather(city);
    }
  }, [city]);

  const getWeather = (city) => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&id=524901&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        } else {
          return response.json();
        }
      })
      .then((jsonifiedResponse) => {
        setWeatherForecast(jsonifiedResponse.list);
        setIsLoaded(true);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoaded(true);
      });
  };

  const handleFormSubmission = (formInput) => {
    const { city } = formInput;
    setCity(city);
  }

  return (
    <div>
      <h1>Get Weather Forecasts From Anywhere</h1>
      <SearchForm onFormSubmission={handleFormSubmission}/>
      {error && <h2>Error: {error}</h2>}
      {isLoaded && (
        <React.Fragment>
          <h3>Weather Forecast for {city}</h3>
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