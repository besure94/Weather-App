import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function ConditionsOverview(props) {
  const { weatherApiObject, selectedForecastDay } = props;
  const [displayedWeatherByDay, setDisplayedWeatherByDay] = useState({});
  console.log("API response: ", weatherApiObject);
  console.log("3 day forecast: ", weatherApiObject.forecast.forecastday);

  // include wind and humidity for all days - on same line
  // only include rain/snow if chance is higher than 20 - on its own line
  useEffect(() => {
    const forecast = weatherApiObject.forecast.forecastday[selectedForecastDay];
    if (selectedForecastDay === 0) {
      const todaysCurrentWeather = {
        ...{},
        icon: weatherApiObject.current.condition.icon,
        temperature: weatherApiObject.current.temp_f,
        condition: weatherApiObject.current.condition.text,
        feelsLike: weatherApiObject.current.feelslike_f,
        wind: weatherApiObject.current.wind_mph
      }
      console.log("Todays weather: ", todaysCurrentWeather);

      // determining logic for displaying chance of rain/snow
      if (forecast.day.daily_chance_of_rain >= 20) {

      }
      setDisplayedWeatherByDay(todaysCurrentWeather);
    } else {
      const futureDaysWeather = {
        ...{},
        icon: forecast.day.condition.icon,
        high: forecast.day.maxtemp_f,
        low: forecast.day.mintemp_f,
        condition: forecast.day.condition.text,
        wind: forecast.day.maxwind_mph
      }
      console.log("Future weather: ", futureDaysWeather);

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
            {/* <h5>Chance of rain: </h5> */}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  )
}

ConditionsOverview.propTypes = {
  weatherApiObject: PropTypes.object,
  selectedForecastDay: PropTypes.number
}

export default ConditionsOverview;