import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import getWeather from '../api-call/weather-api-call';
import { format } from 'date-fns';

function WeatherForecast() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [city, setCity] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    async function getWeatherApiData() {
      setError(null);
      const result = await getWeather(city);
      if (result instanceof Error) {
        setError(result.message);
        setIsLoaded(false);
        return;
      }

      const formattedForecast = result.list.map((forecast) => ({
        ...forecast,
        formattedDate: convertDateFormat(forecast.dt_txt),
        date: new Date(forecast.dt_txt).toLocaleDateString()
      }));

      const groupForecastByDay = formattedForecast.reduce((acc, forecast) => {
        (acc[forecast.date] = acc[forecast.date] || []).push(forecast);
        return acc;
      }, {});

      setWeatherForecast(groupForecastByDay);
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

  const handleCardClick = (day) => {
    setSelectedDay(selectedDay === day ? null : day);
  };

  const convertDateFormat = (date) => {
    return format(new Date(date), 'MMMM d, yyyy h:mm a');
  }

  return (
    <div>
      <br/>
      <SearchForm onFormSubmission={handleFormSubmission}/>
      {error && <h2>Error: {error}</h2>}
      {isLoaded && (
        <React.Fragment>
          <br/>
          <h2>{city}</h2>
          <p>Each day contains the forecast in 3 hour steps.</p>
          <br/>

          <div className='forecast-container'>
            {Object.keys(weatherForecast).map(date => (
              <div key={date} className='card'>
                <h3 onClick={() => handleCardClick(date)}> {date} <span>{selectedDay === date ? '-' : '+'}</span>
                </h3>
                {selectedDay === date && (
                  <div className='card-details'>
                    {weatherForecast[date].map((forecast, index) => (
                      <div key={index}>
                        <p>{forecast.formattedDate}</p>
                        <p>{forecast.weather[0].description.charAt(0).toUpperCase() + forecast.weather[0].description.slice(1)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* {weatherForecast.map((forecast, index) =>
            <div key={index}>
              <h3 onClick={() => handleForecastClick(index)}>{forecast.formattedDate}</h3>
              <p>{forecast.weather[0].description.charAt(0).toUpperCase() + forecast.weather[0].description.slice(1)}</p>
              {selectedForecastDetails === index && (
                <div className='table-container'>
                <div className='row justify-content-center'>
                  <div className='col-6'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th colSpan="4">Forecast Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className='forecast-details'>
                          <th>Current Temp (Celsius)</th>
                          <td>{((forecast.main.temp - 32) / 1.8).toFixed(1)}{'\u00b0'}
                          <br/>
                          Feels like {((forecast.main.feels_like - 32) / 1.8).toFixed(1)}{'\u00b0'}
                          </td>
                        </tr>
                        <tr className='forecast-details'>
                          <th>Current Temp (Fahrenheit)</th>
                          <td>{forecast.main.temp.toFixed(1)}{'\u00b0'}
                          <br/>
                          Feels like {forecast.main.feels_like.toFixed(1)}{'\u00b0'}
                          </td>
                        </tr>
                        <tr className='forecast-details'>
                          <th>High/Low (Celsius)</th>
                          <td>{((forecast.main.temp_max - 32) / 1.8).toFixed(1)}{'\u00b0'}/{((forecast.main.temp_min - 32) / 1.8).toFixed(1)}{'\u00b0'}</td>
                        </tr>
                        <tr className='forecast-details'>
                          <th>High/Low (Fahrenheit)</th>
                          <td>{forecast.main.temp_max.toFixed(1)}{'\u00b0'}/{forecast.main.temp_min.toFixed(1)}{'\u00b0'}</td>
                        </tr>
                        <tr className='forecast-details'>
                          <th>Humidity</th>
                          <td>{forecast.main.humidity}%</td>
                        </tr>
                        <tr className='forecast-details'>
                          <th>Wind speed (kmph)</th>
                          <td>{(forecast.wind.speed * 1.609).toFixed(1)}</td>
                        </tr>
                        <tr className='forecast-details'>
                          <th>Wind speed (mph)</th>
                          <td>{forecast.wind.speed.toFixed(1)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              )}
              <hr/>
            </div>
          )} */}
        </React.Fragment>
      )}
    </div>
  )
}

export default WeatherForecast;