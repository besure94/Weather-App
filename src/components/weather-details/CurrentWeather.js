import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function CurrentWeather(props) {
  const { weatherApiObject, selectedForecastDay } = props;
  const [displayedWeatherByDay, setDisplayedWeatherByDay] = useState({});

  useEffect(() => {
    if (selectedForecastDay === 0) {
      const todaysCurrentWeather = {
        ...{},
        icon: weatherApiObject.current.condition.icon,
        temperature: weatherApiObject.current.temp_f,
        condition: weatherApiObject.current.condition.text,
        feelsLike: weatherApiObject.current.feelslike_f
      }
      setDisplayedWeatherByDay(todaysCurrentWeather);
    } else {
      const forecast = weatherApiObject.forecast.forecastday[selectedForecastDay];
      const futureDaysWeather = {
        ...{},
        icon: forecast.day.condition.icon,
        high: forecast.day.maxtemp_f,
        low: forecast.day.mintemp_f,
        condition: forecast.day.condition.text,
      }
      setDisplayedWeatherByDay(futureDaysWeather);
    }
  }, [weatherApiObject, selectedForecastDay]);

  return (
    <React.Fragment>
      <div className='temp-and-conditions'>
        <h3>{weatherApiObject.location.name}, {weatherApiObject.location.region}, {weatherApiObject.location.country}</h3>
        {selectedForecastDay === 0 && (
          <React.Fragment>
            <div className="icon-and-temp">
              <img className="current-weather-icon" src={displayedWeatherByDay.icon} alt="An icon showing current weather conditions."/>
              <h2>{displayedWeatherByDay.temperature}{'\u00b0'}F</h2>
            </div>
            <h3>{displayedWeatherByDay.condition}</h3>
            <h5>Feels like {displayedWeatherByDay.feelsLike}{'\u00b0'}F</h5>
          </React.Fragment>
        )}

        {selectedForecastDay !== 0 && (
          <React.Fragment>
            <div className="icon-and-temp">
              <img className="current-weather-icon" src={displayedWeatherByDay.icon} alt="An icon showing current weather conditions."/>
              <h2>{displayedWeatherByDay.high}{'\u00b0'}/{displayedWeatherByDay.low}{'\u00b0'}</h2>
            </div>
            <h3>{displayedWeatherByDay.condition}</h3>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  )
}

CurrentWeather.propTypes = {
  weatherApiObject: PropTypes.object,
  selectedForecastDay: PropTypes.number
}

export default CurrentWeather;