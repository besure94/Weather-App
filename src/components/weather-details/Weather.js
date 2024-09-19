import React, { useState, useEffect } from 'react';
import SearchForm from '../main/SearchForm';
import { getWeather } from '../api-call/weather-api-call';
import { convertDateFormat } from '../utility-fns/convert-date-format';
import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyForecast';
import ThreeDayForecast from './ThreeDayForecast';

function WeatherForecast() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [weatherApiObject, setCurrentWeather] = useState([]);
  const [city, setCity] = useState("");
  const [locationLocalTime, setLocationLocalTime] = useState(null);

  useEffect(() => {
    async function getWeatherApiData() {
      setError(null);
      try {
        const response = await getWeather(city);
        const formattedDate = convertDateFormat(response.location.localtime);
        setCurrentWeather(response);
        setLocationLocalTime(formattedDate);
        setIsLoaded(true);
      } catch (error) {
        setError(error.message);
        setIsLoaded(false);
      }
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
      <br/>
      <SearchForm onFormSubmission={handleFormSubmission}/>
      {error && <h2>Error: {error}</h2>}
      {isLoaded && (
        <React.Fragment>
          <CurrentWeather
            weatherApiObject={weatherApiObject} locationLocalTime={locationLocalTime}/>
          <HourlyForecast
            weatherApiObject={weatherApiObject}
            locationLocalTime={locationLocalTime}/>
          <ThreeDayForecast
            weatherApiObject={weatherApiObject}/>
        </React.Fragment>
      )}
    </div>
  )
}

export default WeatherForecast;