import React from "react";
import PropTypes from "prop-types";

function CurrentWeather(props) {
  const { weatherApiObject } = props;

  return (
    <React.Fragment>
      <div className='temp-and-conditions'>
        <h3>{weatherApiObject.location.name}, {weatherApiObject.location.region}, {weatherApiObject.location.country}</h3>
        <div className="icon-and-temp">
          <img className="current-weather-icon" src={weatherApiObject.current.condition.icon} alt="An icon showing current weather conditions."/>
          <h2>{weatherApiObject.current.temp_f}{'\u00b0'}F</h2>
        </div>
        <h3>{weatherApiObject.current.condition.text}</h3>
        <h5>Feels like {weatherApiObject.current.feelslike_f}{'\u00b0'}F</h5>
      </div>
    </React.Fragment>
  )
}

CurrentWeather.propTypes = {
  weatherApiObject: PropTypes.object
}

export default CurrentWeather;