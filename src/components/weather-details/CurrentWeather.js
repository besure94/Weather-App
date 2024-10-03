import React from "react";
import PropTypes from "prop-types";

// render different info for days 2 and 3
function CurrentWeather(props) {
  const { weatherApiObject, selectedForecastDay } = props;

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

        {selectedForecastDay !== 0 && (
          <React.Fragment>
            {/* for testing purposes - fix later */}
            <h5>High/Low</h5>
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