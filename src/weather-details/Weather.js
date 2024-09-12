import React, { useState, useEffect } from 'react';
import SearchForm from '../main-components/SearchForm';
import { getWeather } from '../api-call/weather-api-call';
import { format } from 'date-fns';
import CurrentConditionsDetails from './CurrentConditionsDetails';
import CurrentWeather from './CurrentWeather';

function WeatherForecast() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentWeather, setCurrentWeather] = useState([]);
  const [city, setCity] = useState("");
  const [localTime, setLocalTime] = useState(null);

  useEffect(() => {
    async function getWeatherApiData() {
      setError(null);
      try {
        const response = await getWeather(city);
        console.log(response);
        const weatherWithFormattedDate = convertDateFormat(response.location.localtime);
        setCurrentWeather(response);
        setLocalTime(weatherWithFormattedDate);
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

  const convertDateFormat = (date) => {
    return format(new Date(date), 'M/d/yyyy h:mm a');
  }

  return (
    <div>
      <br/>
      <SearchForm onFormSubmission={handleFormSubmission}/>
      {error && <h2>Error: {error}</h2>}
      {isLoaded && (
        <React.Fragment>
          <CurrentWeather currentWeatherConditions={currentWeather} locationTime={localTime}/>
          <CurrentConditionsDetails conditionsDetails={currentWeather}/>
        </React.Fragment>
      )}
    </div>
  )
}

export default WeatherForecast;