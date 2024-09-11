import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import { getWeather } from '../api-call/weather-api-call';
import { format } from 'date-fns';

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
    return format(new Date(date), 'M/dd/yyyy h:mm a');
  }

  return (
    <div>
      <br/>
      <SearchForm onFormSubmission={handleFormSubmission}/>
      {error && <h2>Error: {error}</h2>}
      {isLoaded && (
        <React.Fragment>
          <h4>{currentWeather.location.name}, {currentWeather.location.region}, {currentWeather.location.country}</h4>
          <br/>
          <div className='current-weather'>
            <h3>{localTime}</h3>
            <br/>
            <h3>{currentWeather.current.temp_f}{'\u00b0'}F</h3>
            <h4>{currentWeather.current.condition.text}</h4>
            <br/>
            <div className='current-weather-details'>
              <div className='details'>
                <h5>Feels Like</h5>
                <p>{currentWeather.current.feelslike_f}{'\u00b0'}F</p>
              </div>
              <div className='details'>
                <h5>Humidity</h5>
                <p>{currentWeather.current.humidity}%</p>
              </div>
              <div className='details'>
                <h5>Wind</h5>
                <p>{currentWeather.current.wind_mph}mph</p>
              </div>
            </div>
            <div className='current-weather-details'>
              <div className='details'>
                  <h5>Rain</h5>
                  <p>{currentWeather.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
              </div>
              <div className='details'>
                  <h5>Snow</h5>
                  <p>{currentWeather.forecast.forecastday[0].day.daily_chance_of_snow}%</p>
              </div>
              <div className='details'>
                  <h5>Air Quality</h5>
                  <p>{currentWeather.current.air_quality["us-epa-index"]}</p>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default WeatherForecast;