import React from "react";
import PropTypes from "prop-types";

function CurrentWeather(props) {
  const { weatherApiObject } = props;

  return (
    <React.Fragment>
      {/* <div className='current-weather'> */}
        <div className='temp-and-conditions'>
          <h2>{weatherApiObject.location.name}, {weatherApiObject.location.region}, {weatherApiObject.location.country}</h2>
          <div className="icon-and-temp">
            <img className="current-weather-icon" src={weatherApiObject.current.condition.icon} alt="An icon showing current weather conditions."/>
            <h2>{weatherApiObject.current.temp_f}{'\u00b0'}F</h2>
          </div>
          <h3>{weatherApiObject.current.condition.text}</h3>
          <h5>Feels like {weatherApiObject.current.feelslike_f}{'\u00b0'}F</h5>
          {/* <div className='high-and-low'>
            <h6>High: {weatherApiObject.forecast.forecastday[0].day.maxtemp_f}{'\u00b0'}</h6>
            <h6>Low: {weatherApiObject.forecast.forecastday[0].day.mintemp_f}{'\u00b0'}</h6>
          </div> */}
        </div>
        {/* <div className="current-weather-details">
          <div className='details'>
            <h5>Air Quality</h5>
            <p>{weatherApiObject.current.air_quality["us-epa-index"]}</p>
          </div>
          <div className='details'>
            <h5>UV Index</h5>
            <p>{weatherApiObject.current.uv}</p>
          </div>
          <div className='details'>
            <h5>Humidity</h5>
            <p>{weatherApiObject.current.humidity}%</p>
          </div>
          <div className='details'>
            <h5>Wind</h5>
            <p>{weatherApiObject.current.wind_mph}mph</p>
          </div>
        </div> */}
      {/* </div> */}
    </React.Fragment>
  )
}

CurrentWeather.propTypes = {
  weatherApiObject: PropTypes.object
}

export default CurrentWeather;