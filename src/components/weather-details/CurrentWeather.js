import React from "react";
import PropTypes from "prop-types";

// render different info for days 2 and 3

// would be best to map through the 3 day forecast array and display the selected day index rather than manually selecting their indexes to display data

function CurrentWeather(props) {
  const { weatherApiObject, selectedForecastDay } = props;
  console.log(weatherApiObject);

  return (
    <React.Fragment>
      <div className='temp-and-conditions'>
        <h3>{weatherApiObject.location.name}, {weatherApiObject.location.region}, {weatherApiObject.location.country}</h3>
        {selectedForecastDay === 0 && (
          <React.Fragment>
            <div className="icon-and-temp">
              <img className="current-weather-icon" src={weatherApiObject.current.condition.icon} alt="An icon showing current weather conditions."/>
              <h2>{weatherApiObject.current.temp_f}{'\u00b0'}F</h2>
            </div>
            <h3>{weatherApiObject.current.condition.text}</h3>
            <h5>Feels like {weatherApiObject.current.feelslike_f}{'\u00b0'}F</h5>
          </React.Fragment>
        )}

        {selectedForecastDay === 1 && (
          <React.Fragment>
            <div className="icon-and-temp">
              <img className="current-weather-icon" src={weatherApiObject.forecast.forecastday[1].day.condition.icon} alt="An icon showing current weather conditions."/>
              <h2>{weatherApiObject.forecast.forecastday[1].day.maxtemp_f}{'\u00b0'}/{weatherApiObject.forecast.forecastday[1].day.mintemp_f}{'\u00b0'}</h2>
            </div>
          </React.Fragment>
        )}

        {selectedForecastDay === 2 && (
          <React.Fragment>
            <div className="icon-and-temp">
              <img className="current-weather-icon" src={weatherApiObject.forecast.forecastday[2].day.condition.icon} alt="An icon showing current weather conditions."/>
              <h2>{weatherApiObject.forecast.forecastday[2].day.maxtemp_f}{'\u00b0'}/{weatherApiObject.forecast.forecastday[2].day.mintemp_f}{'\u00b0'}</h2>
            </div>
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