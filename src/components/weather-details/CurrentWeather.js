import React from "react";
import PropTypes from "prop-types";

function CurrentWeather(props) {
  const { currentWeatherConditions, locationTime } = props;

  return (
    <React.Fragment>
      <h4>{currentWeatherConditions.location.name}, {currentWeatherConditions.location.region}, {currentWeatherConditions.location.country}</h4>
      <br/>
      <div className='current-weather'>
        <div className='location-weather'>
          <div className='current-conditions'>
            <div className='temp-and-conditions'>
              <h5 className='now-header'>Now</h5>
              <h3>{currentWeatherConditions.current.temp_f}{'\u00b0'}F</h3>
            </div>
            <div className='weather-icon'>
              {/* <img src={currentWeatherConditions.current.condition.icon}/> */}
              <img src={currentWeatherConditions.forecast.forecastday[0].day.condition.icon} alt="An icon showing the weather forecast."/>
            </div>
          </div>
          <div className='high-and-low'>
            <h5>High: {currentWeatherConditions.forecast.forecastday[0].day.maxtemp_f}{'\u00b0'}</h5>
            <h5>Low: {currentWeatherConditions.forecast.forecastday[0].day.mintemp_f}{'\u00b0'}</h5>
          </div>
          <h5>Local Time: {locationTime}</h5>
        </div>
        <div className="feels-like-and-description">
          <div className="description">
            <h5>{currentWeatherConditions.current.condition.text}</h5>
          </div>
          <div className="feels-like">
            <h6>Feels like {currentWeatherConditions.current.feelslike_f}{'\u00b0'}F</h6>
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