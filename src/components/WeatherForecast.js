import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import getWeather from '../api-call/weather-api-call';

// find better API that can handle high/low, precipitation %, and other weather info

function WeatherForecast() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentWeather, setCurrentWeather] = useState([]);
  const [city, setCity] = useState("");
  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    async function getWeatherApiData() {
      setError(null);
      const result = await getWeather(city);
      if (result instanceof Error) {
        setError(result.message);
        setIsLoaded(false);
        return;
      }

      setCurrentWeather(result);
      setIsLoaded(true);
    }

    if (city) {
      getWeatherApiData(city);
    }

  }, [city]);

  const handleFormSubmission = (formInput) => {
    const { city } = formInput;
    const todaysDate = new Date();
    setCity(city);
    setCurrentDate(todaysDate);
  }

  return (
    <div>
      <br/>
      <SearchForm onFormSubmission={handleFormSubmission}/>
      {error && <h2>Error: {error}</h2>}
      {isLoaded && (
        <React.Fragment>
          <h4>{city}</h4>
          <br/>
          <div className='current-weather'>
            <h3>{currentDate.toLocaleString()}</h3>
            <br/>
            <h3>{currentWeather.main.temp.toFixed(1)}{'\u00b0'}F</h3>
            <h4>{currentWeather.weather[0].main}</h4>
            <br/>
            <div className='current-weather-details'>
              <div className='details'>
                <h5>Feels Like</h5>
                <p>{currentWeather.main.feels_like}{'\u00b0'}F</p>
              </div>
              <div className='details'>
                <h5>Humidity</h5>
                <p>{currentWeather.main.humidity}%</p>
              </div>
              <div className='details'>
                <h5>Wind</h5>
                <p>{currentWeather.wind.speed}mph</p>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default WeatherForecast;