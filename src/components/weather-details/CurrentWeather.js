import React from "react";
import PropTypes from "prop-types";

function CurrentWeather(props) {
  const { currentWeatherConditions, locationTime } = props;

  return (
    <React.Fragment>
      <h4>{currentWeatherConditions.location.name}, {currentWeatherConditions.location.region}, {currentWeatherConditions.location.country}</h4>
      <h5>{locationTime}</h5>
      <br/>
      <div className='current-weather'>
        <div className='location-weather'>
          <div className='current-conditions'>
            <div className='temp-and-conditions'>
              <h1>{currentWeatherConditions.current.temp_f}{'\u00b0'}F</h1>
              <h4>Feels like {currentWeatherConditions.current.feelslike_f}{'\u00b0'}F</h4>
              <br/>
              <h5>{currentWeatherConditions.current.condition.text}</h5>
              <div className='high-and-low'>
                <h6>High: {currentWeatherConditions.forecast.forecastday[0].day.maxtemp_f}{'\u00b0'}</h6>
                <h6>Low: {currentWeatherConditions.forecast.forecastday[0].day.mintemp_f}{'\u00b0'}</h6>
              </div>
            </div>
            <div className='weather-icon'>
              <img className="current-weather-icon" src={currentWeatherConditions.current.condition.icon} alt="An icon showing current weather conditions."/>
            </div>
            <div className="current-weather-details">
              <div className='air-quality-and-uv'>
                <div className='details'>
                  <h5>Air Quality</h5>
                  <p>{currentWeatherConditions.current.air_quality["us-epa-index"]}</p>
                </div>
                <div className='details'>
                  <h5>UV Index</h5>
                  <p>{currentWeatherConditions.current.uv}</p>
                </div>
              </div>
              <div className="humidity-and-wind">
                <div className='details'>
                  <h5>Humidity</h5>
                  <p>{currentWeatherConditions.current.humidity}%</p>
                </div>
                <div className='details'>
                  <h5>Wind:</h5>
                  <p>{currentWeatherConditions.current.wind_mph}mph</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

CurrentWeather.propTypes = {
  currentWeather: PropTypes.object
}

export default CurrentWeather;